const { Router } = require("express")

const authRouter = Router()

authRouter.post("/login", (req, res) => {
    return res.status(200).json({
        message: "login successful"
    })
})

module.exports = authRouter