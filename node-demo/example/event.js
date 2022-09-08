import EventEmitter from 'events'

const event = new EventEmitter()

event.on('play', () => {
  console.log(12345)
})

// event.off('play')

event.emit('play')
