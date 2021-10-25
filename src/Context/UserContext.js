import {createContext,useReducer} from "react";
import UserReducer from "./UserReducer";



export const UserContext = createContext();

function UserContextFunc({children})
{   const initialState ={};
    const [userState,dispatch] = useReducer(UserReducer,initialState);
   


    return(
        <UserContext.Provider value={{userState,dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextFunc;
