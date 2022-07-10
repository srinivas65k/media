import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { PayloadContext } from "./context"

const AllUsersData = () => {

    const [allUsersData, setAllUsersData] = useState([]);
    const { token, data, loading, setLoading } = useContext(PayloadContext)


    useEffect(() => {
        HandleChange("")
    },[token])


    // Search Using Debouncing

    const HandleChange = (value) => {
        axios.get(`http://localhost:3002/search?searchData=${value}`, {
            headers: {
                'x-token': [token]
            }
        })
            .then(res => {
                if (res.data !== "Invalid Access Token") {
                    setAllUsersData(res.data)

                } else {
                    setAllUsersData([])
                }
                setLoading(true)
            })
    }


    // Debounce method

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args)
            }, 500);
        }
    }

    // debounce Optimization

    const optimizedFun = useCallback(debounce(HandleChange), [allUsersData])


    const handleSendFriendRequest = (id) => {
        axios.put("http://localhost:3002/sendFriendRequest", { selfId: data._id, requestId: id })
            .then(res => {
                console.log(res.data)
            }).catch(
                err => alert(err.response.data.data)
            )
    }


    return (
        <div className="debounce">
            <h1>Search People</h1>
            <input placeholder='Search'
                onChange={
                    (event) => optimizedFun(event.target.value)
                }
            />
            {
                token && loading === true && allUsersData?.length > 0 ?
                    allUsersData?.map((user, key) => {
                        return (
                            <div key={key}>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <button onClick={() => { handleSendFriendRequest(user._id) }}>Send Friend Request</button>
                            </div>
                        )
                    })
                    : null
            }
        </div>
    )
}

export default AllUsersData