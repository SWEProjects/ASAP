import { CHECK_LOGIN_FAILURE, CHECK_LOGIN_REQUEST, CHECK_LOGIN_SUCCESS } from "./loginTypes";

const InitialState = {
    isLoading: false,
    isLoggedIn: false,
    error: "", // Initialize as empty string if it will store error messages
    isStudent: false,
    email: ""
};

const loginReducer = (state = InitialState, action) => {
    switch (action.type) {
        case CHECK_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: "", // Clear any previous errors when a new request is made
            };

        case CHECK_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: action.payload.isLoggedIn,
                error: "", // Clear any previous errors
                email: action.payload.email,
                isStudent: action.payload.isStudent
            };

        case CHECK_LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error // Store the error message
            };

        default:
            return state; // Return the current state if action type does not match
    }
};

export default loginReducer;
