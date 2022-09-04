const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/v1/user', userRouter)







app.get('/', (req,res)=>{
    res.send('server is online ')
})

app.listen(PORT, ()=>{
    console.log(`server is online on port ${PORT}`)
})


app.all('*', (req, res)=>res.send('No route found'))