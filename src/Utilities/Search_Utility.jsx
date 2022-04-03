export const Search_Users = (search, users) => {
    let tempsearch =  search.toLowerCase();
    return users.map((user) => {
      if (
        user.name.toLowerCase().includes(tempsearch) ||
        user.email.toLowerCase().includes(tempsearch) ||
        user.role.toLowerCase().includes(tempsearch)
      ) {
         user.show = true;
         return user;
      }
      user.show = false;
      return user;
    });
  };
  