import express from 'express'
import { consoleLog } from './middlewares/log'
import router from './routes'


const app = express()
app.use(express.json())
app.use(express.static("uploads/"))
app.use("/",consoleLog)
app.use("/",router)


app.listen(3000, () => console.log("Server is running on port 3000"))