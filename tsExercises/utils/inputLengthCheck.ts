export const checkArgsLength = (args: string[], requiredLength: number, maxLength: number) => {
  if (args.length < requiredLength) throw new Error('Missing information')

  if (maxLength) {
    if (args.length > maxLength) throw new Error('Too many arguments')
  } else return true
}