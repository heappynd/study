function traverse(arr: unknown[]) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

function traverse2(arr: unknown[], i: number) {
  if (i === arr.length) {
    return
  }
  console.log(arr[i])

  traverse2(arr, i + 1)

  console.log('s', arr[i])
}

traverse2([1, 2, 3, 4, 5], 0)
