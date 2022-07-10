import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { PayloadContext } from '../context';
import Header from '../header/header';

const SentFriendRequest = () => {

    const [friendRequestData, setFriendRequestData] = useState();
    const [requestData, setRequestData] = useState(false)
    const { token, data, loading } = useContext(PayloadContext)

    // Friend Request sent to users

    const friendRequestsSent = () => {
        axios.get(`http://localhost:3002/notificationRequestSent?id=${data._id}`)
            .then(response => {
                setFriendRequestData(response.data.data)
                setRequestData(true)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        friendRequestsSent()
    }, [data])

    return (
        <div>
            <Header />
            <h1 className='notifications'>Notifications</h1>
            <div className='notificationsCard'>
                {
                    token && loading === true && requestData === true && friendRequestData !== "no notifications found" ?
                        friendRequestData.map((user, key) =>
                            <div key={key} className="status">
                                <h3>you have sent friend request to {user.firstName} {user.lastName} status : {user.status}</h3>
                            </div>
                        )
                        :
                        "You have no Notifications"
                }
            </div>
        </div>
    )
}

export default SentFriendRequest