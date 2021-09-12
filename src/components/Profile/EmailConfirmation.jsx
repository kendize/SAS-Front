import { notification } from 'antd';
import { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { apiClient } from '../../utils/API'
const EmailConfirmation = () => {
    const { userid, code } = useParams();

    const ConfirmEmail = async () => {
        apiClient.get(`/api/authentication/confirmemail?${userid}&${code}`)
            .then(
                () => {
                    notification.success(
                        {
                            message: "Success",
                            description: "Email Confirmed!"
                        }
                    )
                    //return (
                    //    <p>
                    //        {userid}//
                    //        {code}
                    //        <p>Email Confirmed?</p>
                    //    </p>
                    //)
                    return (
                        <Redirect exact to="/" />

                    )
                }
            ).catch(
                () => {
                    //return (
                    //    <p>error</p>
                    //)
                    notification.error(
                        {
                            message: "Error",
                            description: "Email Confirmation Error"
                        }
                    )

                }
            )
    }
    useEffect(ConfirmEmail, [])
    return (
        <p>Email Confirmation page
            {() => ConfirmEmail()}
            <Redirect to="/" />
        </p>

    )

}

export default EmailConfirmation