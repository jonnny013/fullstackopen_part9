import { numberCheck } from './utils/numberCheck'
import { checkArgsLength } from './utils/inputLengthCheck'

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const daysTrained = (daily: number[]): number => {
  let daysTrained = []
  for (let i = 0; i < daily.length; i++) {
    if (daily[i] !== 0) {
      daysTrained = daysTrained.concat(daily[i])
    }
  }
  return daysTrained.length
}

const average = (daily: number[]): number => {
  if (daily.length === 0) {
    return 0
  }
  const sum = daily.reduce((a, b) => a + b, 0)
  return sum / daily.length
}

const rating = (avg: number, goal: number): number => {
  if (avg < goal) {
    return 1
  } else if (avg >= goal && avg < goal * 1.3) {
    return 2
  } else if (avg >= goal * 1.3) {
    return 3
  } else {
    throw new Error('Incorrect format')
  }
}

const description = (rating: number): string => {
  if (rating === 1) {
    return 'You need to put in more effort'
  } else if (rating === 2) {
    return 'You accomplished your goal, now keep going!'
  } else if (rating === 3) {
    return 'Awesome work, keep it up!'
  } else {
    throw new Error('Wrong format')
  }
}

const calculateExercises = (daily: number[], goal: number) => {
  
  if (numberCheck(daily) || numberCheck(goal)) {
    throw new Error('Please input numbers only')
  }
  
  let dailyAverage = average(daily)
  let rate = rating(dailyAverage, goal)
  let desc = description(rate)

  let result: Result = {
    periodLength: daily.length,
    trainingDays: daysTrained(daily),
    target: goal,
    average: dailyAverage,
    success: dailyAverage > goal,
    rating: rate,
    ratingDescription: desc,
  }
  return result
}

const exerciseGoal: number = Number(process.argv[2])
const exerciseHours = process.argv.slice(3).map(Number)


try {
  checkArgsLength(process.argv, 5)
  console.log(calculateExercises(exerciseHours, exerciseGoal))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
//  npm run calculateExercises 2 5 3 4 0 1
