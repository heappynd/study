// type Dialog = {
//   id?: string
// }

// function closeDialog(dialog: Dialog) {
//   if (!dialog.id) {
//     return
//   }
//   setTimeout(() => {
//     removeFromDOM(dialog, document.getElementById(dialog.id!)!)
//   }, 0)
// }

// function removeFromDOM(dialog: Dialog, element: Element) {
//   element.parentNode!.removeChild(element)

//   delete dialog.id
// }

type VisibleDialog = { id: string }
type DestoryedDialog = {}

type Dialog2 = VisibleDialog | DestoryedDialog

function closeDialog2(dialog: Dialog2) {
  if (!('id' in dialog)) {
    return
  }
  setTimeout(() => {
    removeFromDOM(dialog, document.getElementById(dialog.id)!)
  })
}

function removeFromDOM(dialog: VisibleDialog, element: Element) {
  element.parentNode!.removeChild(element)
  delete dialog.id
}
