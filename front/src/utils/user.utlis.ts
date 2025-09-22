import { api } from "./axios.js"
import type { User } from "../constants/types.js"
export const getUsers=()=>{
    try {
        const result = api.get("/users")
        return result
    } catch (error) {
        console.log("error in getUsers function",error)
        
    }

}

export const getUser= (_id:string)=>{
    try {
        const result =  api.get(`/user/${_id}`)
        return result
    } catch (error) {
        console.log("error in getUser",error)
        
    }
}

export function deleteUser(_id:string){
    try {
        return api.delete(`/user/${_id}`);
    } catch (error) {
        console.log("error in deleting user",error)
        
    }
}

export async function updateUser(_id:string,form:User){
    try {
        return api.put(`/user/${_id}`, {
        name: form.name + " " + form.last_name,
        age: form.age,
      })
    } catch (error) {
        console.log("error in update function",error)
    }

}