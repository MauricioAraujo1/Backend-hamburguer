const express = require('express')
const uuid = require('uuid')

const port = 3003
const app = express()
app.use(express.json())

const orders = []

const users = []

const checkUser = (request, response, next) =>{
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: 'User not found'})
    }
    request.index = index
    request.UserId = id
    next()
}

const method = (request, response, next) =>{
    console.log(request.method)
    next()

}

app.get('/order', (request, response) => {
    return response.json(orders)
})

app.post('/order', (request, response) => {
    const { order, clientName, price } = request.body

    const user = { id:uuid.v4(), order, clientName, price}

    orders.push(user)
    
    return response.status(201).json(user)
})

app.put('/order/:id', (request, response) => {
    const { id } = request.params
    const { order, clientName, price } = request.body

    const updateUser = { id, order, clientName, price}

    const index = orders.findIndex( user => user.id === id)

    if(index < 0) {
        return response.status(404).json({ message: 'User not found'})
    }

    orders[index] = updateUser 
    
    return response.json(updateUser)
})

app.delete('/order/:id', (request, response) => {
    const { id } = request.params

    const index = orders.findIndex( user => user.id === id)

    if(index < 0) {
        return response.status(404).json({ message: 'User not found'})
    }

    orders.splice(index, 1)

    return response.status(204).json()
})

app.get('/order/:id', method, checkUser, (request, response) => {
    const id = request.UserId
    const index = request.index

    const exactorder= users[index]

    return response.json(exactorder) 
})

app.patch('/order/:id', (request, response) => {
    const {order, clientName, price, status} = request.body 
    const index = request.index
    const id = request.userId
   
    const updateOrderPatch = { id, order, clientName, price, status: "Pronto"}
    users[index] = updateOrderPatch

    console.log(updateOrderPatch)

    return response.json(updateOrderPatch)
})


app.listen(port, () => {
    console.log(` Server started on port ${port} `)
})