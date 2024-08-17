import { CHECK_LOGIN_FAILURE, CHECK_LOGIN_REQUEST, CHECK_LOGIN_SUCCESS } from "./loginTypes"

export const checkLoginRequest = () =>{
    return{
        type: CHECK_LOGIN_REQUEST,

    }
}


export const checkLoginSuccess = (isLoggedIn, email, isStudent) =>{
   // console.log("aaya ction me", isLoggedIn, email);
    return {
        type: CHECK_LOGIN_SUCCESS,
        payload: {
            isLoggedIn,
            email,
            isStudent
        }
    }
}

export const checkLoginFailure = (error) =>{
   // console.log("ye raha action error", error)
        return{
            type: CHECK_LOGIN_FAILURE,
            payload:{
                error
            }
        }
}


