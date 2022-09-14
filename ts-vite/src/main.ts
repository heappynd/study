import oneMp4 from './1.mp4'

console.log(2)

namespace App {
  NetWork.HTTP.get<string>('http://www.google.com').then(console.log)

  NetWork.TCP.getMsg()
}

import.meta.url
