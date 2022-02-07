interface Person  {
    firstName: string
    lastName: string
  }
   
  function viewUser(person: Person ) {
      console.log(
        `FirstName: ${person.firstName}
        FirstName: ${person.firstName}`
      );
  }

  let user = { firstName: "Jane", lastName: "User" };
  
  viewUser(user);