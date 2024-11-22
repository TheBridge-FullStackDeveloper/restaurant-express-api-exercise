const express = require("express")
const fs = require("fs")
const router = express.Router()


router.post("/create", (req, res)=>{
    try {
        fs.readFile("./data/orders.json", "utf8", (err, data)=>{
            if(err) throw new Error(err)
            let datos = JSON.parse(data)
            let respuesta = [...datos, req.body]
            res.send({"Message":"Order Created", "Data:": req.body})
            fs.writeFile("./data/orders.json", JSON.stringify(respuesta, null, 2), (err)=>{
                if(err) throw new Error(err)
            })
        })
        
    } catch (error) {
        console.error(error)
    }
})

router.get("/bill/:table", (req, res)=>{
    try {
        fs.readFile("./data/orders.json", "utf8", (err, data)=>{
            if(err) throw new Error(err)
            let datos = JSON.parse(data)
            let billFind = datos.find((bill)=>bill.table === req.params.table)
            fs.readFile("./data/menu.json", "utf8", (err, data)=>{
                if(err) throw new Error(err)
                let datos = JSON.parse(data)
                let billMenu = datos.filter((plate)=>billFind.orders.includes(plate.id))
                let bill = []
                billMenu.map((el)=>{
                    const { name, price  } = el
                    bill.push(`${name} ${price}\n`)
                })
                bill.push("--------------")
                const total = billMenu.reduce((acu, el)=> acu + el.price, 0)
                bill.push(`\nTotal ${total}`)
                res.send(bill.join(""))
            })
        })
        
    } catch (error) {
        console.error(error)
    }
})

module.exports = router