import { userModelToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {


  const user = new User(userLike);

  if(!user.firstName || !user.lastName){
    throw 'First and Last name are required'; 
  }

  const userToSave = userModelToLocalhost(user);

  if(user.id){
    return await updateUser(userToSave);
    
  }
  return await createUser(userToSave);
} 

/**
 * @param {Liker<User>} user
 */
const createUser = async(user) => {
  const url = `
    ${import.meta.env.VITE_BASE_URL}/users
  `;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'aplication/json'
    }
  });
  const newUser = await res.json();
  console.log(newUser);

  return newUser;
}

/**
 * @param {Liker<User>} user
 */
const updateUser = async(user) => {
  const url = `
    ${import.meta.env.VITE_BASE_URL}/users/${user.id}
  `;
  const res = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'aplication/json'
    }
  });
  const updatedUser = await res.json();
  console.log(updatedUser);

  return updatedUser;
}