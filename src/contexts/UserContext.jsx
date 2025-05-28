import {
  useState,
  useEffect,
  useContext,
  createContext
} from "react";

import { getUserByUsername } from "../api/user-api";


const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children}) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(()=>{
    const foo = async() => {
      console.log("Getting user in user context");
      
      let savedUser = JSON.parse(localStorage.getItem("user"));
      
      if(!savedUser || savedUser.length === 2){
        console.log("no user");
        
        savedUser = await getUserByUsername();
        setUser(savedUser);
      }
    };
    
    foo();
  }, []);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const saveUser = (user) => {
    setUser(user);
  };

  const updateUser = async (username) => {
    const savedUser = await getUserByUsername(username);
    if(!savedUser) {
      return false;
    }
    setUser(savedUser);
    return true;
  };

  const value = {
    user,
    saveUser,
    updateUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
};