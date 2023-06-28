import express from 'express';
import connection from './models/index.js'
import bookRoute from './routes/bookRoute.js'
import "dotenv/config.js"
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"))

app.get("/", (req, res) => [
    res.send("Backend is working")
])

app.use("/book", bookRoute);

app.listen(process.env.PORT, async () => {
    console.log(`Server is working at http://localhost:${process.env.PORT}`)

    try {
        await connection.authenticate();
        connection.sync();
        console.log("Successfully connected to database")
    } catch (err) {
        console.log("Error during connection to database", err)
    }
})