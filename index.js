const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

let players = [
    {
        "playerName": {
            "firstName": "Antonio",
            "lastName": "Quan"
        },
        "imageUrl": "This is supposed to be the imageURL",
        "wins": 9,
        "losses": 5,
        "games": [],
        "id": 4
    },
    {
        "playerName": {
            "firstName": "Jimmy",
            "lastName": "Johns"
        },
        "imageUrl": "This is supposed to be the imageURL",
        "wins": 6,
        "losses": 5,
        "games": [],
        "id": 5
    },
    {
        "playerName": {
            "firstName": "Carlos",
            "lastName": "Fegurgur"
        },
        "imageUrl": "This is supposed to be the imageURL",
        "wins": 7,
        "losses": 5,
        "games": [],
        "id": 6
    },
    {
        "playerName": {
            "firstName": "Carlos",
            "lastName": "Fegurgur"
        },
        "imageUrl": "This is supposed to be the imageURL",
        "wins": 9,
        "losses": 6,
        "games": [],
        "id": 7
    }
]

// GENERATE ID 
const generateId = () => {
    const maxId = players.length > 0
        ? Math.max(...players.map(p => p.id))
        : 0
    return maxId + 1
}


// GET ALL PLAYERS
app.get('/api/players', (req,res) => {
    res.json(players)
})

// GET SINGLE PLAYER
app.get('/api/players/:id', (req,res) => {
    const id = Number(req.params.id)
    const player = players.find(player => player.id === id)

    if (player){
        res.json(player)
    }else{
        res.status(404).json({
            error: "Player not found"
        })
    }
})

// DELETE PLAYER
app.get('/api/players/:id', (req,res) => {
    const id = Number(req.params.id)
    players = players.filter(player => player.id !== id)

    res.status(204).end()
})

// ADD SINGLE PLAYER
app.post('/api/players', (req,res) => {
    const body = req.body

    if (!body.playerName){
        return res.status(404).json({
            error: "Missing player name"
        })
    }

    const player = {
        "playerName": {
            "firstName": body.playerName.firstName,
            "lastName": body.playerName.lastName
        },
        "imageUrl": body.imageUrl,
        "wins": Math.floor(Math.random() * 10),
        "losses": Math.floor(Math.random() * 10),
        "games": [],
        "id": generateId()
    }

    players = players.concat(player)
    res.json(players)
})









const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})