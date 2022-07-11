import { Stack } from "../stack";

function decimalToBinary(decNumber: number) {
  const remStack = new Stack<number>();
  let number = decNumber;
  let rem;
  let binaryString = "";
  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop()!.toString();
  }
  return binaryString;
}

export function baseConverter(decNumber: number, base: number) {
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const remStack = new Stack<any>();
  let number = decNumber;
  let rem;
  let baseString = "";

  if (!(base >= 2 && base <= 36)) {
    return "";
  }
  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}
