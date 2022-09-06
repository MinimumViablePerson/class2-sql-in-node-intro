import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const db = Database('./db/data.db', { verbose: console.log })
const app = express()
app.use(cors())
app.use(express.json())

const port = 5678

const getPeople = db.prepare(`
SELECT * FROM people;
`)

const getPersonById = db.prepare(`
SELECT * FROM people WHERE id = ?;
`)

const createPerson = db.prepare(`
INSERT INTO people (name, age) VALUES (?, ?);
`)

const deletePerson = db.prepare(`
DELETE FROM people WHERE id = ?;
`)
// deletePerson.run(2)
// deletePerson.run(1)
// deletePerson.run(req.params.id)

const updatePerson = db.prepare(`
UPDATE people SET name = ?, age = ? WHERE id = ?;
`)
// updatePerson.run("Nicolas", 34, 1)
// updatePerson.run("Taulant", 24, 3)

const getPets = db.prepare(`
SELECT * FROM pets;
`)

// If running a command, do statemement.run()
// This returns an object with changes and lastInsertRowid

// If we want to get a single thing, we use statement.get()

// If we want to get multiple things, we use statement.all()

app.get('/people', (req, res) => {
  const people = getPeople.all()
  res.send(people)
})

app.get('/people/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = getPersonById.get(id)

  if (person) {
    res.send(person)
  } else {
    res.status(404).send({ error: 'Person not found. ' })
  }
})

app.post('/people', (req, res) => {
  const name = req.body.name
  const age = req.body.age

  let errors: string[] = []

  if (typeof name !== 'string') {
    errors.push('Name not given or not a string.')
  }

  if (typeof age !== 'number') {
    errors.push('Age not given or not a string.')
  }

  if (errors.length > 0) {
    res.status(400).send({ errors })
  } else {
    const info = createPerson.run(name, age)
    const person = getPersonById.get(info.lastInsertRowid)

    res.send(person)
  }
})

app.patch('/people/:id', (req, res) => {
  
})


app.get('/pets', (req, res) => {
  const pets = getPets.all()
  res.send(pets)
})

app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`)
})
