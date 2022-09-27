let db: IDBDatabase
let version = 1
let request = indexedDB.open('admin', version)

request.onerror = (event) => {
  console.log('数据库打开报错')
}

request.onsuccess = (event) => {
  db = request.result
  console.log('数据库打开成功')

  // add()
  remove()
}

request.onupgradeneeded = (event) => {
  db = (event.target as IDBOpenDBRequest).result
  // 新建对象仓库（即新建表）
  let objectStore
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', {
      // keyPath: 'id',
      autoIncrement: true,
    })
    // 新建索引。 索引名称、索引所在的属性、配置对象
    objectStore.createIndex('name', 'name', { unique: false })
    objectStore.createIndex('email', 'email', { unique: true })
  }
}

// 新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。
function add(): void {
  const request = db
    .transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 1, name: '张三', email: 'zhangsan@example.com' })
  request.onsuccess = function () {
    request.onsuccess = function (event) {
      console.log('数据写入成功')
    }

    request.onerror = function (event) {
      console.log('数据写入失败')
    }
  }
}

function read() {
  const transaction = db.transaction('person')
  const objectStore = transaction.objectStore('person')
  // 用于读取数据，参数是主键的值。
  const request = objectStore.get(1)

  request.onerror = function (event) {
    console.log('事务失败')
  }

  request.onsuccess = function (event) {
    if (request.result) {
      console.log('Name: ' + request.result.name)
      console.log('Age: ' + request.result.age)
      console.log('Email: ' + request.result.email)
    } else {
      console.log('未获得数据记录')
    }
  }
}

function readAll() {
  var objectStore = db.transaction('person').objectStore('person')
  // 新建指针对象的openCursor()方法是一个异步操作
  objectStore.openCursor().onsuccess = function (event) {
    var cursor = event.target.result

    if (cursor) {
      console.log('Id: ' + cursor.key)
      console.log('Name: ' + cursor.value.name)
      console.log('Age: ' + cursor.value.age)
      console.log('Email: ' + cursor.value.email)
      cursor.continue()
    } else {
      console.log('没有更多数据了！')
    }
  }
}

function update() {
  var request = db
    .transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' })

  request.onsuccess = function (event) {
    console.log('数据更新成功')
  }

  request.onerror = function (event) {
    console.log('数据更新失败')
  }
}

function remove() {
  var request = db
    .transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(1)

  request.onsuccess = function (event) {
    console.log('数据删除成功')
  }
}
