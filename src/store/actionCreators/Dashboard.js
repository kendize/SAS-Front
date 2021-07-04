import axios from "axios";
import { apiClient } from "../../utils/API";
import { GET_PAGE_OF_USERS } from "../actions";

export const get_page_of_users = () => {
  return async (dispatch) => {
    await apiClient.get(`https://localhost:44349/api/admin`, {
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
//type: GET_PAGE_OF_USERS,
//payload: Value
