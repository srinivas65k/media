const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt")
const { createToken } = require("./jwt")
const jwt = require("jsonwebtoken")
const app = express();




const UsersModel = require("./models/users");
const FriendsModule = require("./models/friends");



app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Srinivas6264:Srinivas123@personalization.xhqvc.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
    });

// Authenticating Token
const authenticateToken = (request, response, next) => {
    const jwtToken = request.headers["x-token"];
    if (jwtToken === undefined) {
        response.status(400);
        response.send("Invalid Access Token");
    } else {
        jwt.verify(jwtToken, "jwtSecret", async (error, payload) => {
            if (error) {
                response.send("Invalid Access Token");
            } else {
                const { email } = payload
                request.email = email
                next();
            }
        });
    }
}


// posting the user data into DB


app.post("/signup", (request, response) => {
    const firstName = request.body.firstName
    const lastName = request.body.lastName
    const email = request.body.email
    const phoneNumber = request.body.phoneNumber
    const designation = request.body.designation
    const experience = request.body.experience
    const password = request.body.password

    const users = bcrypt.hash(password, 10).then((hash) => {
        UsersModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            phoneNumber: phoneNumber,
            designation: designation,
            experience: experience,
        })
    })
    try {
        response.send(users)
    } catch (err) {
        console.log(err)
    }
})

// Filter the user data 

app.get("/search", authenticateToken, async (request, response) => {
    let { email } = request
    const userName = await UsersModel.find({ email: { $ne: email }, firstName: { $regex: request.query.searchData, $options: "i" } })
    response.send(userName)

})


// Read the Data

app.get("/read", async (request, response) => {
    UsersModel.find({}, (err, result) => {
        if (err) {
            response.send(err)
        } else {
            response.send(result)
        }
    })
})

// validating the userdata and login

app.post("/login", async (request, response) => {
    const { email, password } = request.body


    const user = await UsersModel.findOne({ email: email })
    if (!user)
        return response.status(400).send("User does not exists")
    const dbpassword = user.password
    bcrypt.compare(password, dbpassword).then(
        (match) => {
            if (!match) {
                response.status(400).send("wrong combination")
            }
            const accessToken = createToken(user)
            response.send(accessToken)
        }
    )
})

// Get user data by Token


app.get("/getUserData", authenticateToken, async (request, response) => {
    let { email } = request;
    try {
        let user = await UsersModel.findOne({ email: email });
        if (user) {
            response.send(user)
        } else {
            response.send("Invalid Token")
        }
    } catch (error) {
        console.log(error)
        response.send("Invalid Token")
    }

});


// Send Friend Request and update the Usersmodel

app.put("/sendFriendRequest", async (request, response) => {
    const { selfId, requestId } = request.body

    try {
        const findReqId = await FriendsModule.findOne({ requestId: requestId })
        if (findReqId) {
            response.status(400).send({ status: true, data: "Friend Request Already Sent" })
        } else {
            const friends = await FriendsModule.create({
                selfId: selfId,
                requestId: requestId,
                status: "pending"
            })
            response.status(200).send({ status: true, data: friends })
        }

    } catch (error) {
        response.status(400).send({ status: false, error: error })
    }



    // let currentUser = await UsersModel.findOne({ email: myEmail })
    // await UsersModel.updateMany({ email: friendEmail }, {
    //     $push: {
    //         friendsRequestList: { firstName: currentUser.firstName, lastName: currentUser.lastName, email: currentUser.email }
    //     }
    // })
    // response.send()

})

// Add Friend

// app.put("/acceptFriendRequest", async (request, response) => {
//     const { id, email } = request.body

// console.log(id, email)

// db.users.find({awards: {$elemMatch: {award:'National Medal', year:1975}}})

// let user = await UsersModel.findOne({ email: email, friendsRequestList: { $elemMatch: { _id: id } } }, { "friendsRequestList.$": 1 })
// const user = await UsersModel.find({ friendsRequestList: { $elemMatch: { _id: id } } })


// console.log(user)

// await UsersModel.updateOne(
//     { email: email },
//     {
//         $push: {
//             friendsList: { ...user }
//         }
//     }
// )
// await UsersModel.updateOne(
//     { email: email },
//     {
//         $pull: {
//             friendsRequestList: { _id: id }
//         }
//     }
// )



// const userData = await UsersModel.updateOne(
//     { email: email },
//     {
//         $set:
//             { friendsList: { $push: user }, friendsRequestList: { $pull: user } }
//     }
// )
// console.log(user)

// const list = await UsersModel.updateOne({ email: email },
//     {
//         $push: {
//             friendsList: user
//         }
//     }
// )

// console.log("listtttttttttt", userData)

// })


// Notifications for friend Request sent

app.get("/notificationRequestSent", async (request, response) => {
    const { id } = request.query

    try {
        const findRootUser = await FriendsModule.find({ selfId: id })
        let requestedInfo = []
        if (findRootUser.length !== 0) {
            for (let rootUser of findRootUser) {
                let usersObj = {}
                var requestedDetails = await UsersModel.findOne
                    ({ _id: mongoose.Types.ObjectId(rootUser.requestId) })
                // ({ _id: rootUser.requestId })
                console.log(requestedDetails)
                usersObj["userId"] = requestedDetails._id
                usersObj["firstName"] = requestedDetails.firstName
                usersObj["lastName"] = requestedDetails.lastName
                usersObj["_id"] = rootUser._id
                usersObj["status"] = rootUser.status
                requestedInfo.push(usersObj)
            }
            return response.status(200).send({ status: true, data: requestedInfo })
        } else {
            return response.status(200).send({ status: true, data: "no notifications found" })
        }
    } catch (error) {
        return response.status(400).send({ status: false, error: error })
    }
})


// Notifications for Friend Request Received

app.get("/notificationRequestReceived", async (request, response) => {
    const { id } = request.query

    try {
        const findRootUser = await FriendsModule.find({ requestId: id })
        let requestedInfo = []
        if (findRootUser.length !== 0) {
            for (let rootUser of findRootUser) {
                let usersObj = {}
                var requestedDetails = await UsersModel.findOne({ _id: mongoose.Types.ObjectId(rootUser.selfId) })
                usersObj["userId"] = requestedDetails._id
                usersObj["firstName"] = requestedDetails.firstName
                usersObj["lastName"] = requestedDetails.lastName
                usersObj["_id"] = rootUser._id
                usersObj["status"] = rootUser.status
                requestedInfo.push(usersObj)
            }
            return response.status(200).send({ status: true, data: requestedInfo })
        } else {
            return response.status(200).send({ status: true, data: "no friends found" })
        }
    } catch (error) {
        return response.status(400).send({ status: false, error: error })
    }
})


// Accept Request

app.put("/acceptRequest", async (request, response) => {
    const { id } = request.query

    try {
        const acceptingUser = await FriendsModule.findByIdAndUpdate(id, { status: "accepted" })
        console.log(acceptingUser);

    } catch (error) {
        return response.status(400).send({ status: false, error: error })
    }
})



app.listen(3002, () => {
    console.log("server is running")
})