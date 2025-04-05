import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/auth';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;