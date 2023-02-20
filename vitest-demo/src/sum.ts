export default function sum(...numbers: number[]) {
  return numbers.reduce((total, number) => total + number, 0);
}
