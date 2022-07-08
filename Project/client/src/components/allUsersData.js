import axios from "axios"

const AllUsersData = ({ allUsersData, data }) => {

    const handleSendFriendRequest = (id) => {
        axios.put("http://localhost:3002/sendFriendRequest", { selfId: data._id, requestId: id })
            .then(res => {
                console.log(res.data)
            })
    }

    


    return (
        <div>
            {
                allUsersData.map((user, key) => {
                    return (
                        <div key={key}>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <button onClick={() => { handleSendFriendRequest(user._id) }}>Send Friend Request</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllUsersData