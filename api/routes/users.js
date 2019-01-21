const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const personSchema = new mongoose.Schema({
  name: String
});
const Person = mongoose.model('Kitten', personSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  Person.find(function (err, people) {
    if (err) return console.error(err);
    console.log(people);

    const peopleCleaned = people.map(person => { 
      return {
        id: person._id,
        name: person.name,
      }
    });
    res.json(peopleCleaned);
  })
});

router.post('/', function(req, res, next) {
  const person = new Person({ name: req.body.name });
  person.save(function (err, person) {
    if (err) return console.error(err);
    console.log(person);

    const personCleaned = {
      id: person._id,
      name: person.name,
    }
    res.json(personCleaned);
  });
});

router.delete('/', function(req, res, next) {
  Person.findOneAndDelete({ _id: req.body.id }, function(err, person){
    if (err) return console.error(err);
     
    const personCleaned = {
      id: person._id,
      name: person.name,
    }
    res.json(personCleaned);
  });
});

module.exports = router;
