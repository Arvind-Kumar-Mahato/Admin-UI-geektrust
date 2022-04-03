import axios from 'axios';
import { ProcessUsersResponse } from '../Utilities/Users_utilities';

const API_URL = 
"https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

 export const GetUsers = ( SetUsers)=>{
    axios.get(API_URL)
    .then((res)=>{
      SetUsers(ProcessUsersResponse(res.data));
    })
    .catch((err)=>GetLocalUsers(SetUsers));
};

const GetLocalUsers = (SetUsers)=>{
  axios.get("./members.json")
  .then((res) => {
    SetUsers(ProcessUsersResponse(res.data)); 
  })
  .catch((error) => console.log(error));

};
