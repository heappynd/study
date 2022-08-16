import Mock from 'mockjs'

Mock.mock('/api/users', 'get', () => {
  return Mock.mock({
    status: 200,
    message: 'success',
    'data|3': [
      {
        // name: Mock.Random.cname(),
        name: '@cname',
        age: '@integer(20,50)',
      },
    ],
  })
})
