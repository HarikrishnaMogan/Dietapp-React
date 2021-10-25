
import {Formik,Form,Field,ErrorMessage} from "formik";
import {FaLock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { useState,useEffect } from "react";
import "./Register.css";
import axios from "axios";
import {Link,useHistory} from "react-router-dom";
import {DotLoader} from "react-spinners";


export default function LoginUser()
{
      const [showpassword,Setshowpassward] = useState(false);
      const history = useHistory();
      const [data,setdata] = useState({});
      const[load,Setload] = useState(false);
    
      // eslint-disable-next-line no-useless-escape
      const validateEmail =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
      
      let loginUser = async({email,password})=>{
        try{
          Setload(true);
          const {data} = await axios.post("https://dietapp437.herokuapp.com/users/loginUser",{
            email:email,
            password:password
          })
            Setload(false);
           setdata(data);
           if(data.authtoken)
           {
            localStorage.setItem("authtoken", data.authtoken);
            history.push("/diethome");
           }
         
        }
        catch(err)
        {
          console.log(err);
          Setload(false);
        }
      }

       useEffect(()=>{
           localStorage.getItem("authtoken") && localStorage.removeItem("authtoken");
       },[])

    return(
      <>
      <div className="re">
      {data.error ?  <p className="signup-info">{data.error}</p>:<></>}
        <Formik 
          initialValues={{
            email:"",
            password:""
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
            loginUser(values);
          }}
        >
         {()=>{
           return(
             <div  className="form-parent">
               {load ? <DotLoader size={70} />:
               (
              <div className="form-div">
               <h2 className="Sign Up">LogIn</h2> 
            <Form>
             <div className="formflex">
                    <MdEmail className="icon"/>
             <Field type="email" name="email" className="form-control" placeholder="Email" />
             </div>
             <ErrorMessage name="email"  className="text-dark" component="div"/>
             <div className="formflex">
                    <FaLock className="icon"/>
             <Field type={showpassword ? "password":"text"} name="password" className="form-control" placeholder="Password" />
                    <button type="button" className="passbtn" onClick={()=>{Setshowpassward(!showpassword)}}>
                      {showpassword ? <AiFillEyeInvisible/>:<AiFillEye/>} 
                    </button>
             </div>
             <ErrorMessage name="password" className="text-dark" component="div"/>
             <div className="text-center mt-3">
             <button className="btn btn-outline-light"  type="submit">logIn</button>
             </div>
           </Form>
            <p>
            <Link to="/register" className="link">Register ?</Link>
            </p>
           <p>
           <Link to="/forgotpassword"className="link">Forgot Password ?</Link>
           </p>
           </div>)}
           </div>
           )
         }} 
        </Formik>
       
      </div>
     
      </>
    );
}