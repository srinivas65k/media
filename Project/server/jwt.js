const { sign } = require("jsonwebtoken");

const createToken = (user) => {
    const accessToken = sign({ email: user.email, _id: user._id }, "jwtSecret");
    return accessToken
}


module.exports = { createToken }