import express from 'express'
import cors from 'cors'
import connectMongoose from './utils/mongooseConnect.js'
import route from './routes/routes.js'
import userRoute from './routes/user.js'
connectMongoose()

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(route)
app.use('user',userRoute)

app.listen(4000, ()=> console.log('server connected'))




