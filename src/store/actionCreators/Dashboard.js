import { apiClient } from "../../utils/API";
import { GET_PAGE_OF_USERS, GET_PAGINATION_INFO } from "../actions";
import store from "../store";

export const get_page_of_users = (page) => {
  return async (dispatch) => {
    //const page = store.getState().dashboard.paginationInfo.currentPage
    await apiClient.get(`https://localhost:44349/api/admin/${page}`, {
      headers: {
        "Accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
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
        error => console.log(error)
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
