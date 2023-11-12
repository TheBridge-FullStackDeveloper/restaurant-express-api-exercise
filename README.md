Ejercicio de servidor express para restaurante
El gerente de un restaurante os ha pedido crear un servidor para gestionar los platos y las órdenes de su restaurante.

Instalar dependencias del proyecto
Primero ejecuta:

```sh
npm i
```

Ejecutar servidor:

```sh
npm run dev
```

## Goals ✅

1. Dentro de routes/plates.js necesitarás crear un CRUD para gestionar los platos en el menú.
⚠️ En app.js falta algo para que las rutas funcionen correctamente.

La primera ruta debería ser un GET para recuperar todos los platos de `./data/menu.json`

```
GET http://localhost:3000/plates
```

La segunda ruta debería ser un POST para insertar un plato en ./data/menu.json y devolver un JSON como este { message: "Plate Created", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }

```
POST http://localhost:3000/plates
```

```
{
    "name": "Pasta al Pomodoro",
    "description": "Tipical italian pasta",
    "price": "10.99",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Pasta_al_pomodoro.JPG/220px-Pasta_al_pomodoro.JPG"
}
```

La tercera ruta debería ser un PUT para cambiar una propiedad de un plato y devolver un JSON como este { message: "Plate Updated", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }

```
PUT http://localhost:3000/plates/6 HTTP/1.1
```

```
{
  "name": "Cesar Salad"
}
```

La cuarta ruta debería ser un DELETE para eliminar un plato del menú y devolver un JSON como este { message: "Plate Removed", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }

```
DELETE http://localhost:3000/plates/2
```

Dentro de `routes/orders.js` necesitarás crear un CR para gestionar las órdenes.
La primera ruta debería ser un GET para recuperar todas las órdenes de `./data/orders.json`

```
GET http://localhost:3000/orders
```

La segunda ruta debería ser un POST para insertar una orden en ./data/menu.json y devolver un JSON como este { message: "Order Created", data: AQUÍ DEBERÍAN IR LOS DATOS GUARDADOS }

```
POST http://localhost:3000/orders/create
```

```
{
  "table": "1",
  "orders": ["1", "5", "3"]
}
```

Bonus 🎁
Dentro de `/routes/orders.js` crea una ruta para obtener la cuenta de la mesa

```
GET http://localhost:3000/orders/bill/1
```

Ejemplo de salida:
```
Pizza 10 
Cake 15 
Paella 15.99
------------
Total 40.99
```
