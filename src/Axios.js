import axios from "axios";

const authaxios = axios.create(
    {
        baseURL:"https://dietapp437.herokuapp.com",
        headers:{
            authtoken:localStorage.getItem("authtoken")
        }
    }
)

export default authaxios;