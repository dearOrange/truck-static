const app = require('../server')
// require('dotenv').config()

const port = process.env.PORT || 8088

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
