import Userdetails from "./Userdetails";
import {Formik,Form,Field,ErrorMessage} from "formik";
import {FaUser} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../Pages/Register.css";
import {useHistory} from "react-router-dom";
import "./UserInfo.css";
import {useContext, useState,useEffect} from "react";
import {UserContext} from "../Context/UserContext"; 
import authaxios from "../Axios";
import {CHANGEUSER,GETDATA} from "../Context/UserReducer";
import {SyncLoader} from "react-spinners";


function UserInfo(){

     // eslint-disable-next-line no-useless-escape
     const validateEmail =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
     const history = useHistory();
     const {userState,dispatch} = useContext(UserContext);
     const [load ,setload] = useState(false);

     let updateNameAndEmail= async({email,name})=>{
       try{
            setload(true);
            const {data} = await authaxios.put("/userInfo/user/change",{
              name:name,
              email:email
            },{headers:{authtoken:localStorage.getItem("authtoken")}});
            setload(false);
            
            dispatch({type:CHANGEUSER,payload:data});
            history.push("/diethome");

       }
       catch(err)
       {
            console.log(err);
       }
     }
     
        //useeffect to persist food in localstorage
        useEffect(()=>{
          if(userState.userId!==undefined)
          {
            window.localStorage.setItem("userstate",JSON.stringify(userState));
          }
         
        },[userState]);
  
        //to get data from local storage when refreshed
        useEffect(()=>{
        
            let data = JSON.parse(localStorage.getItem("userstate"));
            dispatch({type:GETDATA,payload:data});
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);
     

   return (
       <>
       <div className="userinfocon">
       <div className="innercon container">
        <Formik 
          initialValues={{
            email:userState.email?userState.email:"",
            name:userState.userName?userState.userName:""
          }
          }

          validate={(values)=>{
            const errors={}
           

            if(values.name.length===0)
            {
              errors.name="*Required";
            }
            else if(values.name.length < 3)
            {
               errors.name="*Name should contain 3 Characters";
            }

            if(!validateEmail.test(values.email))
            {
                errors.email = "*Email is Invalid";
            }
            else if(values.email.length === 0)
            {
              errors.email = "*Required"
            }

          
            return errors;
          }}
         
          onSubmit={(values)=>{
           updateNameAndEmail(values);
          }}
          
          enableReinitialize
        >
         {()=>{
           return(
             <div  className="form-parent userform-parent">
              <div className="form-div">
               <h2 className="Sign Up">UserInfo</h2> 
            <Form>
            <div className="formflex">
                  <FaUser className="icon"/>
             <Field type="text" name="name" className="form-control" placeholder="FullName" />
             </div>
             <ErrorMessage name="name"  className="text-dark" component="div"/>
             <div className="formflex">
                    <MdEmail className="icon"/>
             <Field type="email" name="email" className="form-control" placeholder="Email" />
             </div>
             <ErrorMessage name="email"  className="text-dark" component="div"/>
             
             <div className="text-center mt-3">
             <button className="btn btn-outline-light"  type="submit">Submit</button>
             </div>
           </Form>
           </div>
           </div>
           )
         }} 
        </Formik>
        <div className="text-center text-light">
        {load ? <SyncLoader />:<></>}
        </div>
       
       <div>
         <h1 className="display-4 font-weight-bold text-dark my-3 text-center">Change Plan</h1>
       <Userdetails userinfo={true} />
       </div>
       </div>
     
     </div>
       </>
   );
}

export default UserInfo;