import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SentFriendRequest = ({ data }) => {

    const [friendRequestData, setFriendRequestData] = useState();
    const [requestData, setRequestData] = useState(false)

    // Friend Request sent to users

    const friendRequestsSent = () => {
        axios.get(`http://localhost:3002/notificationRequestSent?id=${data._id}`)
            .then(response => {
                // console.log(response)
                setFriendRequestData(response.data.data)
                setRequestData(true)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        friendRequestsSent()
    },[data])

    return (
        <div>
            <h1>Notifications</h1>
            {/* <button onClick={() => friendRequestsSent()}>See Notifications</button> */}
            {
                requestData === true && friendRequestData !== "no notifications found" ?
                    friendRequestData.map((user, key) =>
                        <div key={key}>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <h4>{user.status}</h4>
                        </div>
                    )
                    :
                    "You have no Notifications"
            }
        </div>
    )
}

export default SentFriendRequest