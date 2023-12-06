import express from 'express';
import calculateBmi from './bmiCalculator';
import {numberCheck} from './utils/numberCheck';
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
