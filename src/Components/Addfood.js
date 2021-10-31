import {InputGroup,FormControl,Button} from "react-bootstrap";
import "./Addfood.css";
import axios from "axios";
import { useState,useContext, useEffect} from "react";
import authaxios from "../Axios";
import { UserContext } from "../Context/UserContext";
import {PUTDATA,GETDATA} from "../Context/UserReducer";
import {SyncLoader} from "react-spinners";
import {FaSearch} from "react-icons/fa"


function Addfood()
{
    const [search,Setsearch] = useState("");
    const[food,Setfood] = useState([]);
    const {userState,dispatch} = useContext(UserContext);
    const[load,Setload] = useState(false);
    const[load2,Setload2] = useState(false);

    //get food details
    let getfoodDetails= async(event)=>{
         try{
           event.preventDefault();
          Setload(true);
          const {data} = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${search}`,
          {
              headers:{"X-Api-Key":"hutTka3/tujs7zjfJcrhfA==Xs0PaPSvPPjY14WR"}
          })
          console.log(data);
          Setload(false);
          Setfood(data.items);
         
         }
         catch(err)
         {
           console.log(err);
           Setload(false);
         }
    }

    

    //to add food and calories in database
     let adddata= async(foodObject,index)=>{
       try{
            Setload(true);
            let tempfood = [...userState.food];
            let calories = userState.calories+foodObject.calories;
            tempfood.push(foodObject);
            let filterfood = food.filter((p,i)=> i!==index);
            Setfood(filterfood);
           
           const {data} = await authaxios.put(`userInfo/calories/${userState._id}`,{
             food:tempfood,
             calories:calories
           },{headers:{authtoken:localStorage.getItem("authtoken")}})

           console.log(data);
           dispatch({type:PUTDATA,payload:data});
           Setload(false);
          
          }
          catch(err)
          {
            console.log(err);
            Setload(false);
          
          }
     }
     
     let removedata = async(foodObject,index)=>{
           try{
                 Setload2(true);
                let tempfood = [...userState.food];
                tempfood = tempfood.filter((p,i)=>i !==index);
                let calories = userState.calories-foodObject.calories;
                const {data} = await authaxios.put(`userInfo/calories/${userState._id}`,{
                  food:tempfood,
                  calories:calories
                },{headers:{authtoken:localStorage.getItem("authtoken")}});
                console.log(data);
                Setload2(false);
                dispatch({type:PUTDATA,payload:data});
               

           }
           catch(err)
           {
             console.log(err);
             Setload2(false);
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


   return(
       <div className="container addfood-container">
         <form onSubmit={getfoodDetails}>
        <InputGroup className="searchcon" >
          <FormControl placeholder="1kg rice with 500g of brinjal" name="search"  value={search} onChange={(event)=>{Setsearch(event.target.value)}}></FormControl>
          <Button className="innerbtn" type="submit" ><FaSearch/></Button>
        </InputGroup>
         </form>
        <div className="mt-3 cardcontainer">
          {load ? <SyncLoader/>:(<>
          {food.length===0 ? <h1>No Results</h1>:(
           food.map((f,index)=>{
               return <div key={index} className="card">
                   <div className="card-body">
                       <div className="text-center">
                     <h2 className="Card-title">{f.name}</h2>
                     </div>
                     <p className="card-text"><span>Calories (kcal):</span> {f.calories}</p>
                     <p className="card-text"><span>Grams:</span> {f.serving_size_g} g</p>
                     <p className="card-text"><span>Fat: </span>{f.fat_total_g} g</p>
                     <p className="card-text"><span>Fiber:</span> {f.fiber_g} g</p>
                     <p className="card-text"><span>Protein:</span> {f.protein_g} g</p>
                     <div className="text-center">
                     <button className="btn btn-success cardbtn" onClick={()=>{adddata(f,index)}} >Add</button>
                     </div>
                     </div>
                    </div>
           })
          )}
          </>)}
         </div>
         <div>
           {userState.food? (<>
             {userState.food.length===0 ? <></>:(
               <>
               <h1>Added Food</h1>
               {load2 ? <SyncLoader/>: (
               <div className="container">
               {
               userState.food.map((f ,index)=>{
                  return  <div key={index} className="card-2">
                  <div className="card-body">
                      <div className="text-center">
                    <h2 className="Card-title">{f.name}</h2>
                    </div>
                    <div className="card-items">
                    <p className="card-text"><span>Calories (kcal):</span> {f.calories}</p>
                    <p className="card-text"><span>Grams:</span> {f.serving_size_g} g</p>
                    <div className="buttonleft">
                    <button className="btn btn-danger" onClick={()=>{removedata(f,index)}} >Delete</button>
                    </div>
                    </div>
                    </div>
                    
                   </div>
               })}
               </div>)}
               </>
             )}
             </>):<></>}
             
         </div>
       </div>
   );
}

export default Addfood;