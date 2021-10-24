import {useState,useEffect} from "react";
import axios from "axios";
import {useParams,useHistory} from "react-router-dom";
import "./Verify.css";

function Verifyuser()
{
    const params = useParams();
    const history = useHistory();
    const [data,Setdata] = useState({});
    

    let verify= async()=>{
          try{
            const {data} = await axios.put(`https://dietapp437.herokuapp.com/users/verifyUser/${params.id}`);
            console.log(data);
            Setdata(data);
           if(data.success)
           {   
               setTimeout(()=>{
                   history.push("/");
               },3000);
               
           }
          }
          catch(err)
          {
              console.log(err);
          }
       
    }

    useEffect(()=>{
       verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
        
    return(
        <>
        {data.success ?(<div className="verifymes">
            <p>User verification success</p>
        </div>):<></>}
        </>
        
    )
}

export default Verifyuser;