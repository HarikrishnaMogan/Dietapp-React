
import {Formik,Form,Field,ErrorMessage} from "formik";
import { MdEmail } from "react-icons/md";
import { useState,useEffect } from "react";
import "./Register.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {DotLoader} from "react-spinners";

export default function ForgotPassword(props)
{
      const [submit,Setsubmit] = useState(false);
      const [data,Setdata] = useState({});
      const[load,Setload] = useState(false);
      // eslint-disable-next-line no-useless-escape
      const validateEmail =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      
      useEffect(()=>{
        localStorage.getItem("authtoken") && localStorage.removeItem("authtoken");
        localStorage.getItem("userstate") && localStorage.removeItem("userstate");
    },[])
      let submitemail = async({email})=>{
        try{
          Setload(true);
          const {data} = await axios.put("https://dietapp437.herokuapp.com/users/forgotPassword",{
            email:email,
          })
          Setload(false);
           console.log(data);
           if(data.success)
           {
               Setsubmit(true);
           }
           else
           {
             Setsubmit(false);
           }
           Setdata(data);
        }
        catch(err)
        {
          console.log(err);
          Setload(false);
        }
        
       
      }

    return(
      <>
      <div className="re">
      
          {submit === true ? <p className="signup-info">{data.success} ,Verification Link Sent to email</p>:
          (data.error ? <p className="signup-info">{data.error}</p>:<></>) }
        <Formik 
          initialValues={{
            email:"",
          }
          }

          validate={(values)=>{
            const errors={}
          

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
             submitemail(values);
          }}
        >
         {()=>{
           return(
             <div  className="form-parent">
                {load ? <DotLoader  size={70} />:(
              <div className="form-div">
               <h2 className="Sign Up">Forgot Password</h2> 
            <Form>
             <div className="formflex">
                    <MdEmail className="icon"/>
             <Field type="email" name="email" className="form-control" placeholder="Email" />
             </div>
             <ErrorMessage name="email"  className="text-dark" component="div"/>
             <div className="text-center mt-3">
             <button className="btn btn-outline-light"  type="submit">Submit</button>
             </div>
           </Form>
           <Link to="/" className="link" >Login ?</Link>
           </div>)}
           </div>
           )
         }} 
        </Formik>
       
      </div>
     
      </>
    );
}