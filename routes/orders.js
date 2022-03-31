const { application } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs')
const plates = require("../data/menu.json")

const orders = require('../data/orders.json')

router.get('/', (req,res)=>{
    res.json(orders)
})

router.post('/create', (req,res)=>{
    const newOrder = req.body
    const newState = [...orders, newOrder]
    fs.writeFile('./data/orders.json', JSON.stringify(newState), ()=>{
        res.json({ message: "Order Created", data: newState })
    }) 
})

router.get('/bill/:id', (req,res)=>{
    const orderId = req.params.id
    
    const newState = orders.filter((order)=>order.table == orderId)
    const tableOrders = newState[0].orders
    let totalOrder = []
    let totalPrice = 0
    for(item of tableOrders){
        plates.filter((plate)=>{       
            if(plate.id == item){
                totalOrder.push(plate.name+" : "+ plate.price)
                totalPrice += plate.price     
            }        
        })  
    }
    totalOrder.push("-------------")
    totalOrder.push("Total: "+ totalPrice)
    console.log(totalOrder)
    res.json(totalOrder)
})

module.exports = router