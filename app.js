const express = require('express');

// al parecer al importar una carpeta estas importando siempre by default el index.js
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', routes);


// al no espeficiar una ruta, si la request no entra en niguna 
// ruta, acabara entrando en esta. debe registrarse al final o pillara
// todas las requests. lo unico que  debe ir despues de esto es el
// middleware de los errores.
app.use(handleNotFound);

// al definir esto despues de la ruta / con todas las rutas define una`
// ruta next a la que mandaremos el error para procesarlo.
// lo que no entiendo de esto, el next del error no entraria dentro del
// handleNotFound? como sabe que tiene que entrar en esta ruta y no
// la siguiente definida? que en este caso es el handleNotFound
app.use(errorHandler);

// cuando hay una promise que falla por algun motivo y no hemos hecho
// un catch del error adecuado, ese error va a entrar aqui.
// por defecto express para el programa cuando encuentra un error de estos
// pero escuchandolo de esta forma podemos sobre escribir ese comportamiento
//
// he visto que es mala practica usar esto solo.
// pero simplificaria mucho todo el manejo de errores porque puedes soltar todo aqui. no?
process.on('unhandledRejection', logUnhandledRejection);

function handleNotFound(req, res) {
  res.status(404).json({ error: `Not found. ${req.url}` });
}
function logUnhandledRejection(reason, promise) {
  console.error('Unhandled Rejection:', reason);
}

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT} 🚀`)
});