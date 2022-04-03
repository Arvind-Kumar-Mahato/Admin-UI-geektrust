import React, {useState, useEffect, useRef} from "react";
import "./App.css";
import Pagination from "./components/Pagination/Pagination_Component";
import UsersList from "./components/UsersList/UserList";
import config from "./constants";
import { GetUsers } from "./data/UserData";
import { GetRecordIndex } from "./Utilities/Page_Utility";
import { Search_Users } from "./Utilities/Search_Utility"; 

function App() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [page, setPage ] = useState(1);
  const selectAllRef = useRef(null);

  useEffect(()=>{
    GetUsers(setUsers);
  },[]);

  const SearchUsers = (e)=>{
   setPage(1);
   setUsers(Search_Users(e.target.value, users));
  };

  const deleteUser = (id)=>{
    let tempUsers = users.filter((user) => user.id !== id);
    setUsers(tempUsers);
    setUpdate((prevstate) => !prevstate);
  };

  const editUser = (id) =>{
    let tempUsers = users;
    const index = tempUsers.findIndex((user)=>user.id === id);
    tempUsers[index].edit = true;
    setUsers(tempUsers);
    setUpdate((prevstate)=> !prevstate);
  };
  const saveUser = (id,nameRef, emailRef, roleRef)=>{
    let tempUsers = users;
    const index = tempUsers.findIndex((user)=>user.id === id);
    tempUsers[index].name = nameRef.current.value;
    tempUsers[index].email = emailRef.current.value;
    tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers);
    setUpdate((prevstate) => !prevstate);
  };
   const selectOne =(id) =>{
     let tempUsers =users;
     const index = tempUsers.findIndex((user) => user.id === id)
     tempUsers[index].selected = !tempUsers[index].selected;
     setUsers(tempUsers);
     setUpdate((prevstate)=> !prevstate);
   };

   const selectAll =(e)=>{
     const listedUserIds = users
     .filter((user)=> user.show)
     .slice(index,index + config.Page_Size)
     .map((user)=>user.id);

     let tempUsers = users.map((user)=>{
       if(listedUserIds.includes(user.id)){
         user.selected = e.target.checked;
         return user;
       }
       return user;
     });

     setUsers(tempUsers);
     setUpdate(!update);
    };
    const deleteSelected = ()=>{
      if(window.confirm("selected users will be deleted")){
        setUsers((prevstate)=>prevstate.filter((user)=> !user.selected));
        selectAllRef.current.checked = false;
      }
    };

    const index = GetRecordIndex(page);
    return(
      <div className="App">
        <input
        className="search"
        type = "text"
        placeholder="search by name, email or role"
        onChange={SearchUsers}
        ></input>
       <UsersList
       page ={page}
       setPage = {setPage}
       selectAll = {selectAll}
       selectAllRef = {selectAllRef}
       selectOne = {selectOne}
       saveUser ={saveUser}
       editUser = {editUser}
       deleteUser = {deleteUser}
       users = {users
       .filter((user)=> user.show)
       .slice(index, index + config.Page_Size)}
       ></UsersList>
       <Pagination
       usersLength = {users.filter((user)=>user.show).length}
       page = {page}
       setPage = {setPage}
       deleteSelected = {deleteSelected}
       ></Pagination>
      </div>
    );
       }

       export default App;



  