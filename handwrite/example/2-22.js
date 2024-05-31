const tel = 18877776666

function hideMidden(tel) {
  tel = tel.toString()
  return tel.slice(0, 3) + '****' + tel.slice(-4)
}

console.log('hideMidden(tel)', hideMidden(tel))
