const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

let clients = []

app.get("/clients", (req, res) => {
  res.json(clients)
})

app.post("/clients", (req, res) => {
  const newClient = {
    id: clients.length + 1,
    name: req.body.name,
    phone: req.body.phone,
  }
  clients.push(newClient)
  res.status(201).json(newClient)
})

app.delete("/clients/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  clients = clients.filter((client) => client.id !== id)
  res.status(204).send()
})

app.delete("/clients", (req, res) => {
  clients = []
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
