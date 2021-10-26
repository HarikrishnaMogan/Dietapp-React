
import {Formik,Form,Field,ErrorMessage} from "formik";
import "../Pages/Register.css";
import { useHistory } from "react-router-dom";
import authaxios from "../Axios";
import CalcCalories from "./CalculateCalories";
import {UserContext} from "../Context/UserContext";
import { useContext, useState } from "react";
import {PUTDATA} from "../Context/UserReducer";
import {SyncLoader} from "react-spinners";



export default function Userdetails({userinfo})
{
     const decimal = /^[1-9]\d*(\.\d+)?$/;
     const integer = /^[1-9]\d*$/;
      const history = useHistory();
       const {userState,dispatch} = useContext(UserContext);
       const [load,setload] = useState(false);
     


     //to create user info at first time
      let postuser = async(values)=>{
        try{
          setload(true);
           //calculating days
          const weightdiff = Math.abs(values.weight-values.targetWeight);
          const days = weightdiff*7*2;
          //calculating calories
           let caloriesNeed =  CalcCalories(values);

          const {data} = await authaxios.post("/userInfo/createInfo",{
              height:values.height,
              weight:values.weight,
              targetWeight:values.targetWeight,
              age:values.age,
              activityFactor:values.activityFactor,
              gender:values.gender,
              totalDays:days,
              caloriesNeed:caloriesNeed
          },{headers:{authtoken:localStorage.getItem("authtoken")}})
          setload(false);
          if(data.success)
          {
                history.push("/diethome");
          }
        }
        catch(err)
        {
          console.log(err);
        }

      }
      
      let changeplan = async(values)=>{
        try{
          setload(true);
          //calculating days
         const weightdiff = Math.abs(values.weight-values.targetWeight);
         const days = weightdiff*7*2;
         //calculating calories
          let caloriesNeed =  CalcCalories(values);

         const {data} = await authaxios.put(`/userInfo/${userState._id}`,{
             height:values.height,
             weight:values.weight,
             targetWeight:values.targetWeight,
             age:values.age,
             activityFactor:values.activityFactor,
             gender:values.gender,
             totalDays:days,
             caloriesNeed:caloriesNeed
         },{headers:{authtoken:localStorage.getItem("authtoken")}});
           setload(false);
         dispatch({type:PUTDATA,payload:data});
         history.push("/diethome");
        
       }
       catch(err)
       {
         console.log(err);
       }

      }





    return(
      <>
      <div className={userinfo ? "no" :"re"} >
      
        <Formik 
          initialValues={{
            height:userState.height ? userState.height:"",
            weight:userState.weight ? userState.weight:"",
            targetWeight:userState.targetWeight ? userState.targetWeight:"",
            age:userState.age ? userState.age:"",
            activityFactor:userState.activityFactor ? userState.activityFactor:"",
            gender:userState.gender ? userState.gender:""
          }
          }

          validate={(values)=>{
            const errors={}
            
            if(values.height.length===0)
            {
                errors.height="*Required"
            }
            else if(!decimal.test(values.height))
            {
                errors.height ="*Invalid height"
            }

            if(values.weight.length===0)
            {
                errors.weight="*Required"
            }
            else if(!decimal.test(values.weight))
            {
                errors.weight ="*Invalid height"
            }

            if(values.targetWeight.length===0)
            {
                errors.targetWeight="*Required"
            }
            else if(!decimal.test(values.targetWeight))
            {
                errors.targetWeight ="*Invalid height"
            }
            if(values.age.length===0)
            {
                errors.age="*Required"
            }
            else if(!integer.test(values.age))
            {
                errors.age ="*Invalid height"
            }
            
           
             
            return errors;
          }}
         
          onSubmit={(values)=>{
            //if user exists the change plan or create a plan
           userinfo ? changeplan(values): postuser(values);
          }}
        >
         {()=>{
           return(
             <div  className="form-parent">
               {load ? <SyncLoader/> :(
              <div className="form-div my-3" >
               <h2 className="Sign Up">Details</h2> 
            <Form>
              <div className="form-group">
                <label>Height</label>
             <Field type="number" name="height" className="form-control" placeholder="height in cm" />
             <ErrorMessage name="height"  className="text-dark" component="div"/>
             </div>
             
             <div className="form-group">
                <label>Weight</label>
             <Field type="number" name="weight" className="form-control" placeholder="Weight in Kg" />
             <ErrorMessage name="weight"  className="text-dark"  component="div"/>
             </div>
             <div className="form-group">
                <label>Target Weight</label>
             <Field type="number" name="targetWeight" className="form-control" placeholder="Weight in Kg" />
             <ErrorMessage name="targetWeight"  className="text-dark"  component="div"/>
             </div>
             <div className="form-group">
                <label>Age</label>
             <Field type="number" name="age" className="form-control" placeholder="Age" />
             <ErrorMessage name="age"  className="text-dark"  component="div"/>
             </div>
             <div className="form-group">
                <label>Activity Factor</label>
             <Field  name="activityFactor" className="form-control" as="select">
                   <option disabled></option>
                 <option value={1.2}>No Exercise</option>
                 <option value={1.4}>Light Exercise</option>
                 <option value={1.6}>Moderate Exercise</option>
                 <option value={1.8}>Hard Exercise</option>
              </Field>   
             </div>
             <div className="form-group">
                <label>Gender</label>
             <Field  name="gender" className="form-control"  as="select">
                 <option disabled></option>
                 <option value="male">Male</option>
                 <option value="female">Female</option>
              </Field>   
             </div> 
             <div className="text-center mt-3">
             <button className="btn btn-outline-light"  type="submit">Submit</button>
             </div>
           </Form>
           </div>)}
           </div>
           )
         }} 
        </Formik>
       
      </div>
     
      </>
    );
}