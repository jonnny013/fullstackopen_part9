// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const numberCheck = (args: any): boolean => {
  if (typeof args !== 'object') {
    return isNaN(Number(args));
  }
   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
   else if (args.length === 0) {
    return true;
  } 

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  const bool: boolean[] = args.map((a: any) => isNaN(Number(a)));
  for (let i: number = 0; i < bool.length; i++) {
    if (bool[i] === true) {
      return true;
    }
  }
  return false;
};
