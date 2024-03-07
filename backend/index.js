const express = require("express");

const cors = require('cors')

const MainRouter = require('./Routes/index')
const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/v1', MainRouter)


app.listen(3000)