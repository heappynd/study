const el = document.querySelector('textarea')!

el.addEventListener('compositionstart', (e) => {
  console.log('compositionstart', e)
})
el.addEventListener('compositionupdate', (e) => {
  console.log('compositionupdate', e)
})
el.addEventListener('compositionend', (e) => {
  console.log('compositionend', e)
})
