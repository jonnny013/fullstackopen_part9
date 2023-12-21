import express from 'express';
const app = express();
import morgan from 'morgan';
import diagnosesRouter from './routes/diagnosis';
import patientRouter from './routes/patients';
app.use(express.json());

import cors from 'cors';

app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use(morgan(':method :status '));
app.use('/api/diagnosis', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
