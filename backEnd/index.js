import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import ConnectDB from './connection/connection.js';
import adminRouter from './Routes/adminroutes.js';
import blogRouter from './Routes/BlogRoutes.js';

const PORT = process.env.PORT || 3000;

// Middleware
const app = express();
await ConnectDB();

// app.use(cors());
app.use(cors({
    origin: [
        "https://blog-app-mu-self.vercel.app",
        "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => res.send("API is Working 🎉"));

app.use('/admin', adminRouter);
app.use('/blog', blogRouter)

// Start server (must pass PORT here)
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


export default app;

