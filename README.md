# Restaurant express exercise

![image](https://user-images.githubusercontent.com/33903092/160862160-f1300ebf-e1cd-467f-a64b-1c3f17e7c2e5.png)


El jefe de un local os ha pedido de crear un servidor para gestionar los platos y las comandas de su restaurante.

## Install project dependencies

First run:

```sh
npm i
```

run server:

```sh
npm run dev
```

## Goals ✅

1. Inside the `routes/plates.js` you'll need to create a CRUD to manage the plates in the menu.

⚠️ In `app.js` something is missing for let the routes works correctly.

- First route should be a GET to retrieve all the plates from `./data/menu.json`

```
GET http://localhost:3000/plates
```

- Second route should be a POST to insert a plate in `./data/menu.json` and retrieve a JSON like this `{ message: "Plate Created", data: HERE SHOULD GO THE DATA SAVED }`

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

- Third route should be a PUT to change a property of a plate and retrieve a JSON like this `{ message: "Plate Updated", data: HERE SHOULD GO THE DATA SAVED }`

```
PUT http://localhost:3000/plates/6 HTTP/1.1
```

```
{
  "name": "Cesar Salad"
}
```

- Fourth Route should be a DELETE to remove a plate from the menu and retrieve a JSON like this `{ message: "Plate Removed", data: HERE SHOULD GO THE DATA SAVED }`

```
DELETE http://localhost:3000/plates/2
```

2. Inside the `routes/orders.js` you'll need to create a CR to manage the orders.

- First route should be a GET to retrieve all the orders from `./data/orders.json`

```
GET http://localhost:3000/orders
```

- Second route should be a POST to insert a order in `./data/menu.json` and retrieve a JSON like this `{ message: "Order Created", data: HERE SHOULD GO THE DATA SAVED }`

```
POST http://localhost:3000/orders/create
```

```
{
  "table": "1",
  "orders": ["1", "5", "3"]
}
```

## Bonus 🎁

Inside `/routes/orders.js` create a route to GET the table's bill

```
GET http://localhost:3000/orders/bill/1
```

Example Output:
```
Pizza 10 
Cake 15 
Paella 15.99
------------
Total 40.99
```
