import { GET_PAGE_OF_COURSES, GET_PAGE_OF_USERS, LOGOUT } from "../actions";

const initialState = {
    userList: [],
    courseList: [],
    numberOfUsers: 0,
    numberOfCourses: 0,
    loading: true
};

export const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAGE_OF_USERS: {
            return {...state, userList: action.payload.users, numberOfUsers: action.payload.numberOfUsers};
        }
        case GET_PAGE_OF_COURSES: {
            return {...state, courseList: action.payload.courses, numberOfCourses: action.payload.numberOfCourses, loading: false};
        }
        case LOGOUT: {
            return {...initialState }
        }
    default: {
        return state
    }
    }
}