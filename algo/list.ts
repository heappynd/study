const arr = [1, 2, 3, 45]

function loop(start: number, end: number, reverse = false) {
  if (!reverse) {
    for (let i = start; i <= end; i++) {
      console.log(arr[i])
    }
  } else {
    for (let i = end; i >= start; i--) {
      console.log(arr[i])
    }
  }
}

// i=0;i<arr.length;i++
// i=arr.length-1;i>=0;i--

// start-end
// i=start i<=end i++
// end-start
// i=end i>=start i--

loop(0, 4)
