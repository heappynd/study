const UploadFactory = (() => {
  const createdFlyWeightObjs = {}
  return {
    create(uploadType) {
      if (!createdFlyWeightObjs[uploadType]) {
        createdFlyWeightObjs[uploadType] = new Upload(uploadType)
      }
      return createdFlyWeightObjs[uploadType]
    },
  }
})()

const uploadManager = (() => {
  const uploadDatabase = {}
  return {
    add(id, uploadType, fileName, fileSize) {
      const flyWeightObj = UploadFactory.create(uploadType)
      const dom = document.createElement('div')
      dom.innerHTML = `
        <span>文件名称: ${fileName}</span>
        <span>文件大小: ${fileSize}</span>
        <button class="delFile">删除</button>
      `
      dom.querySelector('.delFile').onclick = function () {
        flyWeightObj.delFile(id)
      }
      document.body.appendChild(dom)
      uploadDatabase[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom,
      }
      return flyWeightObj
    },
    setExternalState(id, flyWeightObj) {
      const uploadData = uploadDatabase[id]
      for (const i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    },
  }
})()

var Upload = function (uploadType) {
  this.uploadType = uploadType
}

Upload.prototype.delFile = function (id) {
  uploadManager.setExternalState(id, this) // (1)
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }
  if (window.confirm('确定要删除该文件吗? ' + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

var id = 0
window.startUpload = function (uploadType, files) {
  // uploadType 区分是控件还是 flash
  for (var i = 0, file; (file = files[i++]); ) {
    var uploadObj = uploadManager.add(
      ++id,
      uploadType,
      file.fileName,
      file.fileSize
    )
  }
}

startUpload('plugin', [
  {
    fileName: '1.txt',
    fileSize: 1000,
  },
  {
    fileName: '2.html',
    fileSize: 3000,
  },
  {
    fileName: '3.txt',
    fileSize: 5000,
  },
])
startUpload('flash', [
  {
    fileName: '4.txt',
    fileSize: 1000,
  },
  {
    fileName: '5.html',
    fileSize: 3000,
  },
  {
    fileName: '6.txt',
    fileSize: 5000,
  },
])
