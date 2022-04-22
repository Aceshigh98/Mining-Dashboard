
const express = require("express")
const path = require("path")
const PORT = process.env.PORT || 8080
const app = express()

app.use(express.static("public"));
app.use(express.static("public/pages"));
app.use(express.static("public/css"))
app.use(express.static("public/scripts"))
app.use(express.static("public/images"))

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`)
})

