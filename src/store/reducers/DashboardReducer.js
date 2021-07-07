import { GET_PAGE_OF_USERS, GET_PAGINATION_INFO, LOGOUT } from "../actions";

const initialState = {
    userList: [],
    numberOfUsers: 0,
    loading: true
};

export const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAGE_OF_USERS: {
            return {...state, userList: action.payload.userList, numberOfUsers: action.payload.numberOfUsers};
        }
        case GET_PAGINATION_INFO: {
            return {...state, paginationInfo: action.payload}
        }
        case LOGOUT: {
            return {...initialState }
        }
    default: {
        return state
    }
    }
}