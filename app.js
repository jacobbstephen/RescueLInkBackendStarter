const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config();

const connectToDB = require('./config/db')
connectToDB();


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userRouter = require('./routes/user.routes')
app.use('/user', userRouter)

const incidentRouter = require('./routes/incident.routes')
app.use('/incident',incidentRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})