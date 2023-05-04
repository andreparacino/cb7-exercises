function reverseArray(arr) {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    const temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
  return arr;
}

const testArray = [1, 2, 3, 4, 5];
const reversedArray = reverseArray(testArray);

console.log(reversedArray);
