
import {Formik,Form,Field,ErrorMessage} from "formik";
import {FaLock} from "react-icons/fa";
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { useState } from "react";
import "./Register.css";
import axios from "axios";
import {Link,useParams} from "react-router-dom";
import {DotLoader} from "react-spinners";


export default function PassReset(props)
{
      const [showpassword,Setshowpassward] = useState(false);
      const [resetPass,SetresetPass] = useState(false);
      const [data,Setdata] = useState({});
      const params = useParams();
      const[load,Setload] = useState(false);
     console.log(props);
     
      
      
      let reset = async({password})=>{
        try{
          Setload(true);
          const {data} = await axios.put(`https://dietapp437.herokuapp.com/users/resetPassword/${params.userId}/${params.token}`,{
            password:password
          })
          Setload(false);
           console.log(data);
           if(data.success)
           {
               SetresetPass(true);
           }
           else
           {
             SetresetPass(false);
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
      
          {resetPass === true ? <p className="signup-info">{data.success}</p>:
          (data.error ? <p className="signup-info">{data.error}</p>:<></>) }
        <Formik 
          initialValues={{
            password:""
          }
          }

          validate={(values)=>{
            const errors={}

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
            reset(values);
          }}
        >
         {()=>{
           return(
             <div  className="form-parent">
               {load ? <DotLoader size={70}/>:(
              <div className="form-div">
               <h2 className="Sign Up">New Password</h2> 
            <Form>
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