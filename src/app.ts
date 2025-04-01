import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;