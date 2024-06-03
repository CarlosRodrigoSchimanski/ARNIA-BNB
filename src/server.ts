import express from 'express'
import { consolLog } from './middlewares/log'
import router from './routes'


const app = express()
app.use(express.json())
app.use("/",consolLog)
app.use("/",router)


app.listen(3000, () => console.log("Server is running on port 3000"))