const actionPrefix = 'app/';

export const SAY_SOMETHING = `${actionPrefix}SAY_SOMETHING`;

export function saySomething() {
  return {
    type: SAY_SOMETHING,
  };
}
