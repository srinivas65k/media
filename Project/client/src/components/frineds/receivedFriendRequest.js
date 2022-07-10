import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AllUsersData from '../allUsersData';
import { PayloadContext } from '../context';
import Header from '../header/header';

const ReceivedFriendRequest = () => {

    const [friendRequestData, setFriendRequestData] = useState([]);
    const [requestData, setRequestData] = useState(false)

    const { token, data, loading, setLoading } = useContext(PayloadContext)


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
            <div>
            <Header />
                <h1>Friend Requests</h1>
                {
                    loading === true && requestData === true && friendRequestData !== "no friends found" ?

                        friendRequestData.map((user) =>
                            user.status !== "accepted" ?
                                <div key={user._id}>
                                    <h3>{user.firstName} {user.lastName}</h3>
                                    <button onClick={() => acceptFriendRequest(user._id)}>Accept</button>
                                </div>
                                :
                                "You Have No Friend Requests"
                        )
                        :
                        "You Have No Friend Requests"
                }
            </div>
            <div>
                <AllUsersData />
            </div>
        </div>
    )
}

export default ReceivedFriendRequest