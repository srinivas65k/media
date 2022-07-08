import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ReceivedFriendRequest = ({ data }) => {

    const [friendRequestData, setFriendRequestData] = useState();
    const [requestData, setRequestData] = useState(false)

    // Friend Request Recieved From users

    const friendRequestsReceived = () => {
        axios.get(`http://localhost:3002/notificationRequestReceived?id=${data._id}`)
            .then(response => {
                setFriendRequestData(response.data.data)
                setRequestData(true)

            }).catch(error => {
                console.log(error)
            })
    }

    console.log("datttaaaaaaaaaaaaaaaaaa",friendRequestData)

    // Accept Request

    const acceptFriendRequest = (id) => {
        console.log(id)
        axios.put(`http://localhost:3002/acceptRequest?id=${id}`)
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        friendRequestsReceived()
    }, [data])


    return (
        <div>
            <h1>Friend Requested Received</h1>
            {/* <button onClick={() => friendRequestsReceived()}>Click Here To See</button> */}
            {
                requestData === true && friendRequestData !== "no friends found" ?

                friendRequestData.map((user) =>
                    user.status !== "accepted" &&
                    <div key={user._id}>
                        <h3>{user.firstName} {user.lastName}</h3>
                        <button onClick={() => acceptFriendRequest(user._id)}>Accept</button>
                    </div>
                )
                :
                "You Have No Friend Requests"
            }
        </div>
    )
}

export default ReceivedFriendRequest