const VERSION = 1
const BASE = `/api/v${VERSION}`

module.exports = {
  auth: BASE + '/auth',
  user: BASE + '/user',
  post: BASE + '/post'
}
