import { notification } from "antd";
import { apiClient } from "../utils/API";

const accountService = {
    handleRegistration: async (registrationData) => {
        return apiClient.post("https://localhost:44349/api/admin", registrationData, {
            "Content-Type": "application/json"
        }); 
    }

    
}

export default accountService