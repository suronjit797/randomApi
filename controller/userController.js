const fs = require('fs');
const date = new Date()


// get random user
module.exports.getRandomUser = (req, res) => {
    const users = JSON.parse(fs.readFileSync(__dirname + '/../user.json', "utf8"))
    const randomNumber = Math.floor(Math.random() * users.length)
    const data = users[randomNumber]
    if (data) {
        return res.status(200).send({
            success: true,
            message: 'Got a random user',
            data
        })
    } else {
        return res.status(404).send({
            success: false,
            message: 'No user found',
        })
    }
}


// get all user
module.exports.getAllUsers = (req, res) => {
    const { limit } = req.query
    const users = JSON.parse(fs.readFileSync(__dirname + '/../user.json', "utf8"))
    const data = users.slice(0, limit)
    if (data) {
        res.status(200).send({
            success: true,
            message: 'Got all users',
            length: data.length,
            data
        })
    } else {
        return res.status(404).send({
            success: false,
            message: 'No user found',
        })
    }
}


// add a user
module.exports.saveUser = (req, res) => {
    const { photoUrl, name, gender, contact, address } = req.body
    const id = date.getTime()
    const data = { id, photoUrl, name, gender, contact, address }
    if (!name) {
        return res.status(200).send({
            success: false,
            message: 'Please provide name',
        })
    } else if (!photoUrl) {
        return res.status(200).send({
            success: false,
            message: 'Please provide photoUrl',
        })
    } else if (!gender) {
        return res.status(200).send({
            success: false,
            message: 'Please provide gender',
        })
    } else if (!contact) {
        return res.status(200).send({
            success: false,
            message: 'Please provide contact',
        })
    } else if (!address) {
        return res.status(200).send({
            success: false,
            message: 'Please provide address',
        })
    } else {
        const users = JSON.parse(fs.readFileSync(__dirname + '/../user.json', "utf8"))
        fs.writeFileSync(__dirname + '/../user.json', JSON.stringify([...users, data]))
        res.send({
            success: true,
            message: 'User created successfully',
        })
    }
}


// update a user
module.exports.updateUsers = (req, res) => {
    const { id } = req.params
    const update = req.body
    if (!id) {
        return res.status(404).send({
            success: false,
            message: 'User id not found',
        })
    }
    const users = JSON.parse(fs.readFileSync(__dirname + '/../user.json', "utf8"))
    const findData = users.find(user => user.id == id)
    if (!findData) {
        return res.status(404).send({
            success: false,
            message: 'User not found',
        })
    }
    const updatedData = { ...findData, ...update }
    const otherUsers = users.filter(user => user.id != id)
    const data = [...otherUsers, updatedData]
    fs.writeFileSync(__dirname + '/../user.json', JSON.stringify(data))
    res.status(200).send({
        success: true,
        message: 'User update successfully',
    })

}