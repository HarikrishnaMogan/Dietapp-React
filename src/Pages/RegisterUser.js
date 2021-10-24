
import {Formik,Form,Field,ErrorMessage} from "formik";
import {FaUser,FaLock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { useState } from "react";
import "./Register.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {DotLoader} from "react-spinners";

export default function RegisterUser(props)
{
      const [showpassword,Setshowpassward] = useState(false);
      const [signUp,SetSignUp] = useState(false);
      const [data,Setdata] = useState({});
      const[load,Setload] = useState(false);
      // eslint-disable-next-line no-useless-escape
      const validateEmail =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
      
      let registerUser = async({name,email,password})=>{
        try{
          Setload(true);
          const {data} = await axios.post("https://dietapp437.herokuapp.com/users/register",{
            name:name,
            email:email,
            password:password
          })
          Setload(false);
           console.log(data);
           if(data.success)
           {
               SetSignUp(true);
           }
           else
           {
             SetSignUp(false);
           }
           Setdata(data);
        }
        catch(err)
        {
          Setload(false);
          console.log(err);
        
        }
        
       
      }

    return(
      <>
      <div className="re">
      
          {signUp === true ? <p className="signup-info">{data.success} ,Verification Link Sent to email</p>:
          (data.error ? <p className="signup-info">{data.error}</p>:<></>) }
        <Formik 
          initialValues={{
            name:"",
            email:"",
            password:""
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

            if(values.password.length<6)
            {
              errors.password = "*Password must be 6 characters";
            }
            else if(values.password.length>12)
            {
              errors.password ="*Password must be within 12 characters";
            }
            return errors;
          }}
         
          onSubmit={(values)=>{
            registerUser(values);
          }}
        >
         {()=>{
           return(
             <div className="form-parent">
               {load ? <DotLoader size={70}/>:(
              <div className="form-div">
               <h2 className="Sign Up">Sign Up</h2> 
            <Form>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                  <FaUser/>
                    </div>
                 </div>
             <Field type="text" name="name" className="form-control" placeholder="FullName" />
             </div>
             <ErrorMessage name="name"  className="text-danger" component="div"/>
             <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <MdEmail/>
                    </div>
                 </div>
             <Field type="email" name="email" className="form-control" placeholder="Email" />
             </div>
             <ErrorMessage name="email"  className="text-danger" component="div"/>
             <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FaLock/>
                    </div>
                 </div>
             <Field type={showpassword ? "password":"text"} name="password" className="form-control" placeholder="Password" />
              <div className="input-group-append" >
                    <Button className="input-group-btn btn-dark" onClick={()=>{Setshowpassward(!showpassword)}}>
                      {showpassword ? <AiFillEyeInvisible/>:<AiFillEye/>} 
                    </Button>
              </div>
             </div>
             <ErrorMessage name="password" className="text-danger" component="div"/>
             <div className="text-center mt-3">
             <button className="btn btn-outline-dark"  type="submit">Sign Up</button>
             </div>
           </Form>
           <Link to="/" >Login ?</Link>
           </div>)}
           </div>
           )
         }} 
        </Formik>
       
      </div>
     
      </>
    );
}