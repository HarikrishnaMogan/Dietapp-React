import axios from "axios";

const authaxios = axios.create(
    {
        baseURL:"https://dietapp437.herokuapp.com"
    }
)

export default authaxios;