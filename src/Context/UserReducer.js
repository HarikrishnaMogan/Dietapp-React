




export const GETDATA = "GETDATA";
export const PUTDATA = "PUTWATER";




function UserReducer(state,action)
{
    switch(action.type)
    {
        case GETDATA:{
            return {...action.payload};
        }
        case PUTDATA:{
            return {...action.payload}
        }
      
        default:{
            break;
        }
    }
}

export default UserReducer;