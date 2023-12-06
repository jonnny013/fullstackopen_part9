export const numberCheck = (args: any): boolean => {
  if (args.length === 0) {
    return true
  }
  else if (typeof args !== 'object') {
    return isNaN(Number(args))
  }

  let bool = args.map((a: any) => isNaN(Number(a)))
  for (let i = 0; i < bool.length; i++) {
    if (bool[i] === true) {
      return true
    }
  }
  return false
}