import express from 'express';

const app = express()
const port = 3000;

app.use(express.json())


let userData = [];
let userId = 1;



// Add a user  to the userData array.
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    const newUser = {
        id: userId++,
        name,
        email
    }

    userData.push(newUser);
    res.status(201).send(newUser);
})


// Get all users from the userData array.
app.get('/users', (req, res) => {
    return res.status(200).send(userData);
})

// Get user by id
app.get('/users/:id', (req, res) => {
    let user = userData.find(user => user.id === parseInt(req.params.id))
    if (!user) {
        return res.status(404).jssendon({ message: 'User not found' });
    }

    return res.status(200).send(user);
});

// Update user by id
app.put('/users/:id', (req, res) => {
    let user = userData.find(user => user.id === parseInt(req.params.id))
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    res.status(200).send(user);
});

// remove user by id
app.delete('/users/:id', (req, res) => {
    let userIndex = userData.findIndex(user => user.id === parseInt(req.params.id))
    if (userIndex === -1) {
        return res.status(404).send({ message: 'User not found' });
    }
    userData.splice(userIndex, 1);
    res.status(200).send({ message: 'User deleted successfully' });
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}...`)
})