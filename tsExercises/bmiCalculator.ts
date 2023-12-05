const calculateBmi = (height: number, weight: number): string => {
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


console.log(calculateBmi(180, 74))
