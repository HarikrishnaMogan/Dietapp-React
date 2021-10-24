import {createContext,useReducer} from "react";
import UserReducer from "./UserReducer";
import {useHistory} from "react-router-dom";
import authaxios from "../Axios";
import {GETDATA} from "./UserReducer";


export const UserContext = createContext();

function UserContextFunc({children})
{   const initialState ={};
    const [userState,dispatch] = useReducer(UserReducer,initialState);
    const history = useHistory;

    let checkUserDetails=async()=>{
        let date = new Date().toDateString();
        const {data} = await authaxios.get("/userInfo");
        console.log(data);
        if(!data)
        {
           return history.push("/userdetails");
           
        }
        else if(date !== userState.date)
        {
            updateDay(data);
        }else
        {
            dispatch({type:GETDATA,payload:data});
        }
    
  }

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
        });
       dispatch({type:GETDATA,payload:updatedData});
  } 

    return(
        <UserContext.Provider value={{userState,dispatch,checkUserDetails}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextFunc;
