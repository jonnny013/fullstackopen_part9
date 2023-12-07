import {checkArgsLength} from './utils/inputLengthCheck';
import {numberCheck} from './utils/numberCheck';

const calculateBmi = (height: number, weight: number): string => {
  if (numberCheck(height) || numberCheck(weight)) {
    throw new Error('Please input numbers only');
  }

  const heightInMetres = height / 100;
  const result = weight / (heightInMetres * heightInMetres);
  if (result < 18.5) {
    return 'Underweight';
  } else if (result >= 18.5 && result < 25) {
    return 'Normal (healthy weight)';
  } else if (result >= 25 && result < 30) {
    return 'Overweight';
  } else if (result > 30) {
    return 'Obese';
  } else {
    throw new Error('Weight and height not given');
  }
};

const userHeight: number = Number(process.argv[2]);
const userWeight: number = Number(process.argv[3]);

try {
  checkArgsLength(process.argv, 4, 4);
  console.log(calculateBmi(userHeight, userWeight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
// npm run calculateBmi 173 58
