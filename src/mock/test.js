import Mock from 'mockjs'

function testMock(...args) {
  console.log(args)
  return Mock.mock({
    code: 0,
    name: '@cname'
  })
}

Mock.mock(/\/test\/test\.do/, 'post', testMock)
