const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('./../controllers/productController');
const multer = require ('multer');
const { removeAllListeners } = require('cluster');
let multerDiskStorage = multer.diskStorage(
    {
        destination: (req, file, callback) =>
        {let folder = path.join(__dirname, '../../public/imagenes/productImages');
        callback (null, folder)
        },
        filename: (req, file, callback) => {
            let imageName= Date.now() + path.extname(
                file.originalname
            );
            callback(null, imageName)
        }

    }
)
let fileUpload = multer ({
    storage: multerDiskStorage
})

// muestra la lista de productos
router.get('/' , productController.list);

// muestra el formulario de creacion de un nuevo producto
router.get('/create' , productController.create);

// accion de creacion de un nuevo producto 
router.post('/create', fileUpload.single(
    "productImage"), productController.processForm);

//-------------------------------------------------------------------------------------
/*muestra el formulario que administra el faltante de stock de productos ya existentes
router.get('/nostock', productController.noStock);

router.put('/nostock', (req,res)=>{res.send(req.body.prueba)});*/
//-------------------------------------------------------------------------------------


// detalle de un producto
router.get('/:id' , productController.detail);

router.get('/:id/edit' , productController.edit);

// accion de editar un producto
router.put('/:id' , fileUpload.single(
    "productImage"),productController.update);

// accion de editar un producto
router.delete('/:id', productController.destroy); 

module.exports = router;