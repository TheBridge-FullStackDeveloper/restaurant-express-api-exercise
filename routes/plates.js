const express = require("express")
const fs = require("fs")
const router = express.Router()



router.get("/", (req, res)=>{
    fs.readFile("./data/menu.json", "utf8", (err, data)=>{
        res.send(JSON.parse(data))
    })
})

router.post("/", (req, res)=>{
    fs.readFile("./data/menu.json", "utf8", (err, data)=>{
        let datos = JSON.parse(data)
        let respuesta = [...datos, req.body]
        res.send({"Message":"Plate Created", "Data:": req.body})

        fs.writeFile("./data/menu.json", JSON.stringify(respuesta, null, 2), (err)=>{
            if(err)console.log(err)
        })
    })   
})

router.put("/:id", (req, res)=>{
    
    fs.readFile("./data/menu.json", "utf8", (err, data)=>{
        let datos = JSON.parse(data)
        datos.forEach((el)=>{
            if(el.id === req.params.id){
                el.name = req.body.name
            }
        })
        res.send({"Message":`Plate Updated del plato con la ID ${datos[req.params.id - 1].id}`, "Data:": req.body})

        fs.writeFile("./data/menu.json", JSON.stringify(datos, null, 2), (err)=>{
            if(err)console.log(err)
        })
    })
})


module.exports = router