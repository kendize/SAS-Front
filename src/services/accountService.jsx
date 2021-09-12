import { notification } from "antd";
import { Redirect, useHistory } from "react-router";
import { apiClient } from "../utils/API";

const accountService = {
    handleRegistration: async (registrationData) => {
        return apiClient.post("https://localhost:44349/api/admin", registrationData, {
            "Content-Type": "application/json"
        })
            .then( (response) => {
                console.log(response);
                notification.success(
                    {
                        message: "Success",
                        description: "Successfully registrated!"
                    }
                );
            })
            .catch( (error) => {
                console.log(error);
                notification.error(
                    {
                        message: "Error",
                        description: "Account was not registered!"
                    }
                );
            });
    }
    
}

export default accountService