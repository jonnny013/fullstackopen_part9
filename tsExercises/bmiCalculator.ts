import { checkArgsLength } from "./utils/inputLengthCheck"
import { numberCheck } from "./utils/numberCheck"

const calculateBmi = (height: number, weight: number): string => {

  if (numberCheck(height) || numberCheck(weight)) {
    throw new Error('Please input numbers only')
  }

  let heightInMetres = height / 100
  let result = weight/(heightInMetres * heightInMetres)
  if (result < 18.5) {
    return 'underweight'
  } else if (result >= 18.5 && result < 25) {
    return 'normal (healthy weight)'
  } else if (result >= 25 && result < 30) {
    return 'overweight'
  } else if (result > 30) {
    return 'obese'
  } else {
    throw new Error('Weight and height not given')
  }
}

let userHeight: number = Number(process.argv[2])
let userWeight: number = Number(process.argv[3])

try {
  checkArgsLength(process.argv, 4, 4)
  console.log(calculateBmi(userHeight, userWeight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}


// npm run calculateBmi 173 58