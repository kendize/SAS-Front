import { apiClient } from "../../utils/API";
import { GET_PAGE_OF_USERS, GET_PAGE_OF_COURSES} from "../actions";
import store from "../store";

export const get_page_of_users = (pageNumber, pageSize, orderColumnName, orderBy, searchString) => {
  return async (dispatch) => {
    await apiClient.get(`api/admin/`,
    { 
      headers: {
        "Accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
      },
      params:
      {
        pageNumber: pageNumber,
        pageSize: pageSize,
        orderColumnName: orderColumnName,
        orderBy: orderBy,
        searchString: searchString
      }

    })
      .then(
        ({ data }) => {
          dispatch({
            type: GET_PAGE_OF_USERS,
            payload: data
          }
          )
        }
      )
      .catch(
        error => console.log("action creator error: " + error)
      )
  };
}

export const get_page_of_courses = (pageNumber, pageSize, orderColumnName, orderBy, searchString) => {
  return async (dispatch) => {
    await apiClient.get(`api/course/`,
    { 
      headers: {
        "Accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
      },
      params:
      {
        pageNumber: pageNumber,
        pageSize: pageSize,
        orderColumnName: orderColumnName,
        orderBy: orderBy,
        searchString: searchString
      }

    })
      .then(
        ({ data }) => {
          dispatch({
            type: GET_PAGE_OF_COURSES,
            payload: data
          }
          )
        }
      )
      .catch(
        error => console.log("action creator error: " + error)
      )
  };
}
