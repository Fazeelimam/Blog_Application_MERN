import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import ConnectDB from './connection/connection.js';
import adminRouter from './Routes/adminroutes.js';
import blogRouter from './Routes/BlogRoutes.js';

// Middleware
const app = express();
await ConnectDB();
// app.use(cors());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter)

// Start server (must pass PORT here)
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


export default app;

