import { isLogin } from "../../utils";
import { LOGIN, LOGOUT, RELOGIN } from "../actions";

const initialState = {
    accessToken: "",
    refreshToken: "",
    id: "",
    firstName: "",
    lastName: "",
    role: "",
    authorized: isLogin()
};

export const AuthenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case RELOGIN:
        case LOGIN: {
            const { accessToken, refreshToken, id, firstName, lastName, role } = action.payload;
            const authorized = action.authorized;
            return { ...state, accessToken, refreshToken, id, firstName, lastName, role, authorized }
        }
        case LOGOUT: {
            const authorized = false;
            return { ...initialState, authorized };
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