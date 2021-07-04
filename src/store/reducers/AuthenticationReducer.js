import { LOGIN, LOGOUT, RELOGIN } from "../actions";

const initialState = {
    accessToken: "",
    refreshToken: "",
    id: "",
    firstName: "",
    lastName: ""
};

export const AuthenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case RELOGIN:
        case LOGIN: {
            const   {accessToken, refreshToken, id, firstName, lastName} = action.payload;
            return {...state,   accessToken, refreshToken, id, firstName, lastName}
        }
        case LOGOUT: {
            return {...initialState};
        }
        //case RELOGIN: {
        //    const  {accessToken, refreshToken, id, firstName, lastName} = action.payload;
        //    return {...state,   accessToken, refreshToken, id, firstName, lastName}
        //}
        default: 
            {
                return state;
            }
    }
}