




export const GETDATA = "GETDATA";
export const PUTDATA = "PUTWATER";
export const CHANGEUSER = "CHANGEUSER";




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
        case CHANGEUSER:{
            return {...state,email:action.payload.email,userName:action.payload.name}
        }
        default:{
            break;
        }
    }
}

export default UserReducer;