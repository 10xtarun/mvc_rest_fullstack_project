const express = require("express")
const { gracefulShutdown, shutDownHandler } = require("./utils")

function app() {
    let server
    const app = express()

    console.log("initiating server start sequence")
    return Promise.resolve()
    .then(() => {
        // API routes
        app.get("/greetings", (req, res) => {
            return res.status(200).json({
                message: "Hello World!"
            })
        })
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