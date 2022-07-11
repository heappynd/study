import { Queue, Deque } from "../";

function hotPotato(elementsList: string[], num: number) {
  const queue = new Queue(); // {1}
  const elimitatedList = [];
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]); // {2}
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // {3}
    }
    elimitatedList.push(queue.dequeue()); // {4}
  }
  return {
    eliminated: elimitatedList,
    winner: queue.dequeue(), // {5}
  };
}

const names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
const result = hotPotato(names, 7);
result.eliminated.forEach((name) => {
  console.log(`${name}在击鼓传花游戏中被淘汰。`);
});
console.log(`胜利者： ${result.winner}`);

function palindromeChecker(aString: string) {
  if (
    aString === undefined ||
    aString === null ||
    (aString !== null && aString.length === 0)
  ) {
    // {1}
    return false;
  }
  const deque = new Deque<string>(); // {2}
  const lowerString = aString.toLocaleLowerCase().split(" ").join(""); // {3}
  let isEqual = true;
  let firstChar, lastChar;

  for (let i = 0; i < lowerString.length; i++) {
    // {4}
    deque.addBack(lowerString.charAt(i));
  }

  while (deque.size() > 1 && isEqual) {
    // {5}
    firstChar = deque.removeFront(); // {6}
    lastChar = deque.removeBack(); // {7}
    if (firstChar !== lastChar) {
      isEqual = false; // {8}
    }
  }

  return isEqual;
}
console.log("level", palindromeChecker("level"));
