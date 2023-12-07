import express from 'express';
import calculateBmi from './bmiCalculator';
import {numberCheck} from './utils/numberCheck';
import { checkArgsLength } from './utils/inputLengthCheck';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;
  if (numberCheck(height) || numberCheck(weight)) {
    res.status(400).json({error: 'malformatted parameters'});
    return;
  }
  const bmiInfo = {
    height,
    weight,
    bmi: calculateBmi(Number(height), Number(weight)),
  };

  res.json(bmiInfo);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
  const parsedDailyExercises: number[] = JSON.parse(daily_exercises);

  if (typeof parsedDailyExercises !== 'object' || parsedDailyExercises === undefined) {
    res.status(400).json({error: 'malformatted parameters'});
  }
  
  if (numberCheck(parsedDailyExercises) || numberCheck(target)) {
    res.status(400).json({error: 'malformatted parameters'});
    return;
  }
  if (!checkArgsLength(parsedDailyExercises, 3, null)) {
    res.status(400).json({error: 'parameters missing'});
    return;
  }
  const result = calculateExercises(parsedDailyExercises.map(Number), Number(target));
  res.json(result);

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
