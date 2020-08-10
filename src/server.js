const express = require('express')

const app = express()

app.use(express.static('dist'))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`)
})
