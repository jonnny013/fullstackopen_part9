import express from 'express';
const app = express();
import morgan from 'morgan';
import diagnosesRouter from './routes/diagnosis';
import patientRouter from './routes/patients';
import cors from 'cors';
import mongoose from 'mongoose';
import {MONGODB_URI} from './utils/config';

mongoose.set('strictQuery', false);

if (typeof MONGODB_URI === 'string') {
  console.log('connecting to ', MONGODB_URI);
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDb');
    })
    .catch(error => {
      console.log('error connecting to mongo', error.message as string);
    });
} else {
  console.log('mongodb url not found');
}

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(morgan(':method :status '));
app.use('/api/diagnosis', diagnosesRouter);
app.use('/api/patients', patientRouter);
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

module.exports = app;