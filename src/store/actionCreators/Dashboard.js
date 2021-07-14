import { apiClient } from "../../utils/API";
import { GET_PAGE_OF_USERS, GET_PAGINATION_INFO } from "../actions";
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

export const get_pagination_info = () => {
  return async (dispatch) => {
    await apiClient.get(`/api/admin`, {
      headers: {
        "Accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
      }
    })
      .then(
        ({ data }) => {
          dispatch({
            type: GET_PAGINATION_INFO,
            payload: data
          }
          )
        }
      )
      .catch(
        error => console.log(error)
      )
  }
}
//type: GET_PAGE_OF_USERS,
//payload: Value
