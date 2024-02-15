const users = [
    {username: 'mlewis'},
    {username: 'akagen'},
    {username: 'msmith'}
  ];

//accepts an array of objects, each with a key of username, 
//and a string. The function should return the first object 
//with the key of username that matches the string passed 
//to the function. If the object is not found, return undefined.
function findUserByUsername(arr, username){
  return arr.find(function(user){
    return user.username === username;
  });
}
  findUserByUsername(users, 'mlewis') // {username: 'mlewis'}
  findUserByUsername(users, 'taco') // undefined

//accepts an array of objects, each with a key of username, and a string. 
//The function should remove the object from the array and return this object. 
//If the object is not found, return undefined.
function removeUser(user, username){
    let userIndex = user.findIndex(function(use){
        return use.username === username;
    }) ;

    if (userIndex === -1) return;    
    return user.splice(userIndex, 1)[0];
}
 removeUser(users, 'akagen') // {username: 'akagen'}
 removeUser(users, 'akagen') // undefined
