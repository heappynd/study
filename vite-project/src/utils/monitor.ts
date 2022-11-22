const limit = {
  cpu: 0,
  mem: 0,
  gpu: 0,
}

const res = {
  total: 0,
  curveResource: [
    { name: 'mem', curves: {
      1669104873000: 
    } }
  ]
}

if (type === 'cpu') {
  if (this.limit.cpu === 0) {
    this.limit.cpu = res.total || 0
  }
} else if (type === 'mem') {
  if (this.limit.mem === 0) {
    this.limit.mem = res.total / 1024 / 1024 / 1024 || 0
  }
} else if (type === 'gpu') {
  if (this.limit.gpu === 0) {
    this.limit.gpu = res.total || 0
  }
}
