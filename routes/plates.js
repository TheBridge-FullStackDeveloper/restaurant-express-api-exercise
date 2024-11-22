const express = require("express")
const fs = require("fs")
const router = express.Router()



router.get("/", (req, res)=>{
    try {
        fs.readFile("./data/menu.json", "utf8", (err, data)=>{
            if(err) throw new Error(err)
            res.send(JSON.parse(data))
        })
    } catch (error) {
        console.error(error)
    }
})

router.post("/", (req, res)=>{
    try {
        fs.readFile("./data/menu.json", "utf8", (err, data)=>{
            if(err) throw new Error(err)
            let datos = JSON.parse(data)
            let respuesta = [...datos, req.body]
            res.send({"Message":"Plate Created", "Data:": req.body})
    
            fs.writeFile("./data/menu.json", JSON.stringify(respuesta, null, 2), (err)=>{
                if(err) throw new Error(err)
            })
        })   
        
    } catch (error) {
        console.error(error)
    }
})

router.put("/:id", (req, res)=>{
    try {
        fs.readFile("./data/menu.json", "utf8", (err, data)=>{
            if(err) throw new Error(err)
            let datos = JSON.parse(data)
            datos.forEach((el)=>{
                if(el.id === req.params.id){
                    el.name = req.body.name
                }
            })
            res.send({"Message":`Plate Updated del plato con la ID ${datos[req.params.id - 1].id}`, "Data:": req.body})

            fs.writeFile("./data/menu.json", JSON.stringify(datos, null, 2), (err)=>{
                if(err) throw new Error(err)
            })
        })
    } catch (error) {
        console.error(error)
    }
    
})


module.exports = router