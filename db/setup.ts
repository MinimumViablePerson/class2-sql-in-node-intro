import Database from 'better-sqlite3'

const db = Database('./db/data.db', { verbose: console.log })

function createPeopleStuff () {
  const people = [
    {
      name: 'Nicolas',
      age: 34
    },
    {
      name: 'Ed',
      age: 28
    },
    {
      name: 'Donald',
      age: 23
    },
    {
      name: 'Elona',
      age: 15
    },
    {
      name: 'Edona',
      age: 20
    }
  ]

  const createPeopleTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS people (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    PRIMARY KEY (id)
  );`)

  createPeopleTable.run()

  const deleteAllPeople = db.prepare(`
DELETE FROM people;
`)
  deleteAllPeople.run()

  const createPerson = db.prepare(`
INSERT INTO people (name, age) VALUES (?, ?);
`)

  for (let person of people) {
    createPerson.run(person.name, person.age)
  }
}

function createPetsStuff () {
  const pets = [
    {
      name: 'Fluffy',
      type: 'Dog',
      age: 10,
      ownerId: 1
    },
    {
      name: 'Flaffy',
      type: 'Dog',
      age: 9,
      ownerId: 2
    },
    {
      name: 'Fleffy',
      type: 'Dog',
      age: 11,
      ownerId: 3
    },
    {
      name: 'Fliffy',
      type: 'Dog',
      age: 5,
      ownerId: 4
    },
    {
      name: 'Floffy',
      type: 'Dog',
      age: 6,
      ownerId: 5
    },
    {
      name: 'Momo',
      type: 'Monkey',
      age: 3,
      ownerId: 1
    },
    {
      name: 'Mimi',
      type: 'Monkey',
      age: 15,
      ownerId: 2
    }
  ]

  const createPetsTable = db.prepare(`
  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER,
    name TEXT,
    type TEXT,
    age INTEGER,
    ownerId INTEGER,
    PRIMARY KEY (id)
  );`)

  createPetsTable.run()

  const deleteAllPets = db.prepare(`
  DELETE FROM pets;
  `)
  deleteAllPets.run()

  const createPet = db.prepare(`
  INSERT INTO pets (name, type, age, ownerId) VALUES (?, ?, ?, ?);
  `)

  for (let pet of pets) {
    createPet.run(pet.name, pet.type, pet.age, pet.ownerId)
  }
}

createPeopleStuff()
createPetsStuff()
