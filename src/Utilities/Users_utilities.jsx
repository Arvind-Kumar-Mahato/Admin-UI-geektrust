

export const ProcessUsersResponse = (users)=>{
    return users.map(user =>{
        user.selected = false;
        user.edit = false;
        user.show = true;
        return user;
    })
}