import express from 'express'
import dotenv from 'dotenv';
import { databaseService } from './src/services/databaseServices.js'
import router from './src/routers/indexRouters.js'
dotenv.config();
databaseService.connectDb()
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())

app.use('/api', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
