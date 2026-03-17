import "dotenv/config";
import express from 'express';
import userRoutes from './src/modules/user/routes/user.routes.js';
import taskCardRoutes from './src/modules/taskCard/routes/taskCard.routes.js';
import { connectDB } from "./config/db.js"
import cors from 'cors'

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', userRoutes);
app.use('/api', taskCardRoutes);

await connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});