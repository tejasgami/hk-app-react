export const voidFunction = () => {
  return;
};

export function returntypeof<RT>(expression: (...params: any[]) => RT): RT {
  return {} as RT;
}