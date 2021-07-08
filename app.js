const express = require ('express');
const app = express();
const path = require ('path');
//requerimos method-override luego de instalarla
const methodOverride= require('method-override');
//requerimos method-override luego de instalarla
const indexRoutes = require('./src/routes/indexRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.listen(3000, () => {
    console.log('Servidor 3000 corriendo');
})

app.use(express.static(path.resolve(__dirname , './public')));

// lineas necesarias para poder capturar informacion de cualquier formulario, en forma de objeto literal, y si queremos, convertirla en formato JSON
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// lineas necesarias para poder capturar informacion de cualquier formulario, en forma de objeto literal, y si queremos, convertirla en formato JSON

/* con esta lina configuramos la aplicacion para que pueda sobrescribir los metodos nativos de los formulario (GET y POST),
y poder utilizar los metodos PUT y DELETE*/
app.use(methodOverride('_method'));
// *** puedo usar mas de una configuracion, para poder escribir de distintas maneras en el action del form 
app.use(methodOverride('DIGITAL'));
/* con esta linea configuramos la aplicacion para que pueda sobrescribir los metodos nativos de los formulario (GET y POST),
y poder utilizar los metodos PUT y DELETE*/


app.set('view engine' , 'ejs');

app.use('/' , indexRoutes);

app.use('/product' , productRoutes);

app.use('/users' , userRoutes);