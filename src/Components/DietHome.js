import {useEffect,useContext, useState} from "react";
import authaxios from "../Axios";
import {Link} from "react-router-dom";
import {UserContext} from "../Context/UserContext";
import {PUTDATA,GETDATA} from "../Context/UserReducer";
import "./Diethome.css";
import {FaUserCog} from "react-icons/fa";
import { AiFillPlusCircle,AiFillMinusCircle } from "react-icons/ai";
import {useHistory} from "react-router-dom";


function DietHome()
{
   
   const {userState,dispatch} = useContext(UserContext);
    const[circleAnim,SetCircAnim] = useState({anim1:false,anim2:false,anim3:false});
      const history = useHistory();
      let date = new Date().toDateString();
     
    
      //to get user data
    let checkUserDetails=async()=>{
      try{

      let date = new Date().toDateString();
      const {data} = await authaxios.get("/userInfo",{headers:{authtoken:localStorage.getItem("authtoken")}});
      console.log(data);
      if(!data)
      {
         history.push("/userdetails");
         
      }
      else if(date !== data.date)
      {
          updateDay(data);
      }
      else
      {
          dispatch({type:GETDATA,payload:data});
      }
  }
  catch(err)
  {
      console.log(err);
   
  }
  
   }

   //to update everday calories in database
  let updateDay =async(data)=>{
    
    let date = new Date().toDateString();
    let temptrack = [...data.track];
        let addprevday = {calories:data.calories,water:data.water,date:data.date,food:data.food};
         temptrack.push(addprevday);
      const {data:updatedData} = await authaxios.put(`userInfo/calories/${data._id}`,{
         track:temptrack,
         calories:0,
         date:date,
         food:[],
         water:0
      },{headers:{authtoken:localStorage.getItem("authtoken")}});
     dispatch({type:GETDATA,payload:updatedData});
} 
    
    useEffect(()=>{
       if(userState.userId===undefined || date !==userState.date )
       {
         checkUserDetails();
       }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    


    //to update water in database
    let updateWater= async(oper)=>{
       try{
         
         let water;
         if(oper==="minus")
         {
             water =userState.water-1;
         }
         else{
            water = userState.water+1;
         }
 
         const {data} = await authaxios.put(`userInfo/calories/${userState._id}`,{
            water:water
         },{headers:{authtoken:localStorage.getItem("authtoken")}});
         dispatch({type:PUTDATA,payload:data})
       }
       catch(err)
       {
          console.log(err);
       }
      
    }
  









    return(
        <>
        <div className="container-fluid">
       <div className="welcome">
          <div className="circle welcircle">
          <p>Welcome</p>
          <div className="circle-float"></div>
          </div>
          
       </div>
       <div className="userdiv"   onMouseEnter={()=>{SetCircAnim({...circleAnim,anim1:true})}} >
          <div id="userdetails">
           <h1>{userState.userName} <Link className=" btn btn-outline-light" to= "/UserInfo"> <FaUserCog /></Link></h1>
            <Link to="/track" className="btn btn-outline-light my-3">Track</Link>
           <p><span>{userState.totalDays}</span> days challenge!!</p>
          </div>
          <div className="circle bg-light">
             <p id="circle-content">{Math.round(userState.calories)}/{userState.caloriesNeed} kcal</p>
             <div className={circleAnim.anim1?"circle-float-blue":""} ></div>
          </div>
          <div className="dec"></div>
       </div>
       <div className="quote"><p>A balanced diet is having a cupcake in each hand!!</p></div>
       <div className="food" onMouseEnter={()=>{SetCircAnim({...circleAnim,anim2:true})}}>
          <div className="circle bg-success">
          <p>{Math.trunc((userState.calories/userState.caloriesNeed)*100)} %</p>
          <div className={circleAnim.anim2?"circle-float":""} ></div>
          </div>
          <div className="addfood">
              <p className="bold">Better food, Better Mood!!</p>
              <div className="progress">
                 <div className="progress-bar" style={{width:`${Math.trunc((userState.calories/userState.caloriesNeed)*100)}%`}}>{Math.trunc((userState.calories/userState.caloriesNeed)*100)}%</div>
               </div> 
               <div>
                  <Link to="/addfood" className="btn btn-danger">Add Food</Link>   
               </div>   
          </div>
       </div>
       <div className="quote quote2"><p>I'm on seafood diet, I see food and i eat it!!</p></div>
       <div className="food water"   onMouseEnter={()=>{SetCircAnim({...circleAnim,anim3:true})}}>
       <div className="addfood">
              <p className="bold"> I drink water,just to surprise my liver</p>
              <p className="bold">Drink 8 glasses of water</p>
              <div className="progress ">
                 <div className="progress-bar bg-danger" style={{width:`${Math.trunc((userState.water/8)*100)}%`}}>{userState.water} glasses</div>
               </div> 
               <div>
                  <button className="addandSubtract minus mx-4" disabled={userState.water <=0} onClick={()=>{updateWater("minus")}}><AiFillMinusCircle  /></button>
                 <button className="addandSubtract plus" onClick={()=>{updateWater("plus")}}> <AiFillPlusCircle  />   </button>
               </div>   
          </div>
          <div className="circle bg-danger">
          <p>{Math.trunc((userState.water/8)*100)} %</p>
          <div className={circleAnim.anim3?"circle-float":""} ></div>
          </div>
          
       </div>
       </div>
        </>
    )
}
export default DietHome;