export const checkArgsLength = (args: string[], requiredLength: number) => {
  if (args.length < requiredLength) throw new Error('Missing information')
  else return true
}