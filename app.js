const express = require("express")
const path = require("path")
const { gracefulShutdown, shutDownHandler } = require("./utils")
const authRouter = require("./routes/authentication")

function app() {
    let server
    const app = express()

    console.log("initiating server start sequence")
    return Promise.resolve()
    .then(() => {
        // attach middlewares
    })
    .then(() => {
        // View routes
        app.get("/",(req, res) => {
            return res.sendFile(path.join(__dirname, "views", "index.html"))
        })

        app.get("/todos", (req, res) => {
            return res.sendFile(path.join(__dirname, "views", "todos.html"))
        })

        app.get("/profile", (req, res) => {
            return res.sendFile(path.join(__dirname, "views", "profile.html"))
        })
    })
    .then(() => {
        // API routes
        app.get("/greetings", (req, res) => {
            return res.status(200).json({
                message: "Hello World!"
            })
        })

        app.use("/api/auth", authRouter)
    })
    .then(() => {
        server = app.listen(8000, (error) => {
            if (error) throw error
            console.info("server is running on port 8000")
        })
    })
    .then(() => {
        // declare globals here
        global.app = app

        gracefulShutdown(server)
    })
    .catch(error => {
        console.error(error)
        shutDownHandler(server)
    })
}

app()