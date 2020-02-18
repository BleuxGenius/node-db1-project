const express = require('express');
const router = express.Router();

const db = require('../data/dbConfig.js');



router.use(express.json);


// route handlers =>
router.get("/",  (req, res) => {
    //  list of accounts 
    // Select from accounts using the database 
    db('accounts')
    //  all database operations returns a promise you
   // => need the following 
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'failed to get the list of accounts'});
    });

});

router.get('/:id', (req, res) => {
    // an account by id 
    // select * from account where id = :id
    const { id } = req.params
    db.get(id)
    .then(account => {
        res.status(200).json(account[0]);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: ' failed to retrieve accounts'})
    });
});

router.post('/', validateAcctPost, (req, res) => {
// add an account 
// insert into account () values ()
const newAccount = req.body;
db('accounts')
.insert(newAccount, 'id') // will generare a warning on console when using sqlite, ignore that 
.then(newAccountIds => {
    res.status(201).json(newAccountIds);
})
.catch(error => {
    console.log(error);
    res.status(500).json({ error: ' failed to add new account'})
});
});

router.put('/:id', (req, res) => {
// update the post 
const { id } = req.params.id
db('accounts') //working with this table => below are the functions i want to perform 
.where({ id }) // remember to filiter or all records will be deleted (BAD PANDA)
.update(req.body)
.then(count => {
    res.status(200).json(count);
})
.catch(error => {
console.log(error);
res.status(500).json({ error: ' failed to update the account'})
    });
});

router.delete('/:id', (req, res) => {
    // removes the post
    const id = req.params;
    db('accounts')
    .where({ id }) 
    .del()
    .then(deleted => {
        res.status(200).json(deleted);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: `error deleting the account`})
    })
})

// custom middleware :

function validateAcctPost(req, res, next) {
    const { name } = req.body;
    const { budget } = req.body;

    if(!req.body) {
        return res.status(400).json({ error: ` must provide a body to create a new account`});
    }

    if (!name) {
        return res.status(400).json({ error: ` must provide a NAME for new account`});
    }

    if (!budget) {
        return res.status(400).json({ error: ` must provide BUDGET  for new account`})
    }

    if (typeof name !== "string"){
        return res.status(400).json({ error: `must provide string for name`});
    }

    if(typeof budget !== "number"){
        return res.status(400).json({ error: ` must provide a numeric value for budget `})
    }

    req,body = {name, budget}
    next();
}

module.exports = router;