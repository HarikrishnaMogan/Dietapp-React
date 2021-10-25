
import {Formik,Form,Field,ErrorMessage} from "formik";
import "../Pages/Register.css";
import { useHistory } from "react-router-dom";
import authaxios from "../Axios";
import CalcCalories from "./CalculateCalories";



export default function Userdetails()
{
     const decimal = /^[1-9]\d*(\.\d+)?$/;
     const integer = /^[1-9]\d*$/;
      const history = useHistory();
        console.log(history);
     

      let postuser = async(values)=>{
        try{
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

    return(
      <>
      <div className="re" >
      
        <Formik 
          initialValues={{
            height:"",
            weight:"",
            targetWeight:"",
            age:"",
            activityFactor:"",
            gender:""
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
            postuser(values);
          }}
        >
         {()=>{
           return(
             <div  className="form-parent">
              <div className="form-div my-3" >
               <h2 className="Sign Up">Details</h2> 
            <Form>
              <div className="form-group">
                <label>Height</label>
             <Field type="number" name="height" className="form-control" placeholder="height in cm" />
             <ErrorMessage name="height"  className="text-danger" component="div"/>
             </div>
             
             <div className="form-group">
                <label>Weight</label>
             <Field type="number" name="weight" className="form-control" placeholder="Weight in Kg" />
             <ErrorMessage name="weight"  className="text-danger" component="div"/>
             </div>
             <div className="form-group">
                <label>Target Weight</label>
             <Field type="number" name="targetWeight" className="form-control" placeholder="Weight in Kg" />
             <ErrorMessage name="targetWeight"  className="text-danger" component="div"/>
             </div>
             <div className="form-group">
                <label>Age</label>
             <Field type="number" name="age" className="form-control" placeholder="Age" />
             <ErrorMessage name="age"  className="text-danger" component="div"/>
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
             <button className="btn btn-outline-dark"  type="submit">Submit</button>
             </div>
           </Form>
           </div>
           </div>
           )
         }} 
        </Formik>
       
      </div>
     
      </>
    );
}