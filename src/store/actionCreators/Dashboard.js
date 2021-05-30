import axios from "axios";
import { GET_PAGE_OF_USERS } from "../actions";

export const  get_page_of_users = () => {
    return async (dispatch) => {
        await axios.get(`https://localhost:44349/api/admin`, {
          headers: {"Accept": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("access_Token")}
        })
          .then(
              ({data}) => {
                  dispatch({
                      type: GET_PAGE_OF_USERS,
                      payload: data
                  })
              }
          )
          .catch(
            error => console.log(error)
              )
      };
}
//type: GET_PAGE_OF_USERS,
//payload: Value
