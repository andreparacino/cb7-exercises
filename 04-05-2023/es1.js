function reverseArray(arr) {
  return arr.reduce((reversed, element) => [element, ...reversed], []);
}

const testArray = [1, 2, 3, 4, 5];
const reversedArray = reverseArray(testArray);

console.log(reversedArray);
