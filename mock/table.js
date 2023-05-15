const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    username: '@cname',
    nickname: '@first',
    email: /\w+@\w+\.\w+/,
    phone: /^1[3456789]\d{9}$/,
    status: () => Mock.Random.integer(0, 1),
    created_at: () => Mock.Random.date('yyyy-MM-dd HH:MM:SS'),
    updated_at: () => Mock.Random.date('yyyy-MM-dd HH:MM:SS')
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
