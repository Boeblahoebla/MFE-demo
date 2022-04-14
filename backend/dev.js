const express = require('express')
const cors = require('cors')
const lambda = require('./lambda.js')

// This is a dev server. In case of AWS deployment,
// we can just deploy the lambda & set up the route using API Gateway

const port = process.env.PORT || 8080
const server = express()
server.use(cors())

;(async () => {
    server.get("*", async (req, res) => {
        const response = await lambda.handler({ path : req.path })

        res.status(response.statusCode)
            .set(response.headers)
            .send(response.body)
    })
})()

server.listen(port, () => console.log(`Server started listening on port ${port}.`))
