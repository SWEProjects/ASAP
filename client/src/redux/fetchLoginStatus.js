import { checkLoginFailure, checkLoginSuccess, checkLoginRequest } from "./loginActions";

const apiUrl = import.meta.env.VITE_APP_API_URL

export const fetchLoginStatus =  () =>{
    return async function(dispatch){
            dispatch(checkLoginRequest());

            try{
                const response = await fetch(`${apiUrl}/validateUser`, {
                    method: 'GET',
                    credentials: 'include',   
                });

                if(!response.ok){
                    throw new Error('Unable to validate your status.')
                }

               

                const data = await response.json();
                dispatch(checkLoginSuccess(data.isLoggedIn, data.email, data.isStudent));



            }
            catch(error){
                const errorMessage = error?.message;
                dispatch(checkLoginFailure(errorMessage));
            }
    }
}