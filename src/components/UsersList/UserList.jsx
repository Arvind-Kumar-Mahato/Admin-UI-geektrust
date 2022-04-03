import propTypes from "prop-types";
import { useEffect } from "react";

import User from "../UserComponent/User_Component"
import config from "../../constants"
import styles from "./UserList.module.css"

const UsersList = (props) =>{
    const {users, deleteUser, editUser, saveUser,selectAll,
        selectOne, selectAllRef, setPage,page,} = props;

        useEffect(()=>{
            if(users.length === 0 && page > 1){
                setPage(page-1);
            }

        },[page,setPage,users.length]);
        let fillRows =[];
        for(
            let i = users.filter((user)=>user.show).length;
            i < config.Page_Size;
            i++
        ){
            fillRows.push(<tr key ={i}></tr>);
        }
        if(users.length === 0 && page === 1){
            return <div>NO USERS IN THE SYSTEM</div>
        }
        return (
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            <input
                            type = "checkbox"
                            ref ={selectAllRef}
                            onChange={(e)=>{
                                selectAll(e);
                            }}
                            name = "selectAll"
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>{
                        return user.show ? (
                            <User 
                            selectOne ={selectOne}
                            saveUser ={saveUser}
                            editUser = {editUser}
                            deleteUser = {deleteUser}
                            key = {user.id}
                            user = {user}
                            ></User>
                        ):(
                         ""   
                        );
                    })}
                    {fillRows}
                </tbody>
            </table>
        );

        
};

UsersList.propTypes ={
    users: propTypes.array,
    deleteUser: propTypes.func,
    editUser: propTypes.func,
    saveUser: propTypes.func,
    selectAll: propTypes.func,
    selectAllRef: propTypes.object,
    setPage: propTypes.func,
    page: propTypes.number,
};


export default UsersList;