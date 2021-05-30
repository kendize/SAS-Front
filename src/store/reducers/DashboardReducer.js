import { GET_PAGE_OF_USERS } from "../actions";

const initialState = {
    userList: [],
    loading: true
};

export const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAGE_OF_USERS: {
            return {...state, userList: action.payload};
        }
    default: {
        return state
    }
    }
}