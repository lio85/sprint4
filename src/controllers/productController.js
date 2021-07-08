const { on } = require('events');
let fs = require ('fs');
let path = require ('path');
let productListPath = path.join(__dirname, '../dataBase/productList.json');
let datos = fs.readFileSync (productListPath, 'utf-8');
let productListOl ;
if (datos == "") {
    productListOl = [];
} 
else { 
    productListOl = JSON.parse(datos);
};

let productController = {
    list: function(req,res){
        let productsStockOn=productListOl.filter((element)=>{return element.inStock==true})
        res.render('products/productList', {productsStockOn});
    },

    /*noStock: function(req,res){
        let productsStockOff=productListOl.filter((element)=>{return element.inStock!=true})
        let productsNonStock= productsStockOff.sort((a,b)=>{
            let productA=a.name.toLowerCase();
            let productB=b.name.toLowerCase();
            if(productA<productB){
                return -1;
            }
            if(productA>productB){
                return 1;
            }
            return 0;
        });
        res.render('products/stock',{productsNonStock});
    },*/

    create: function(req,res){
        res.render('products/createProduct');
    },
    processForm: function(req,res){
        console.log(req.body)
        let newProduct= {
            id: productListOl.length+1,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            payWay: req.body.PayWay,
            cuotas: req.body.cuotas,
            interest: req.body.interest,
            description: req.body.description
        };      
        if(req.file){
            newProduct.productImage=req.file.filename;
        } else{
            newProduct.productImage='';
        }
        newProduct.inStock= true;
        //console.log(req.file)
        productListOl.push(newProduct);
        let productListOlupdated= JSON.stringify(productListOl, null, " ");
        fs.writeFileSync(productListPath, productListOlupdated)
        res.redirect('/product')    
    },
    detail: function(req,res){
        let idProduct= req.params.id;
        let productFound= productListOl.filter((product)=>{
            return product.id==idProduct;
        });
        let objectFound= productFound[0];
        let priceParseInt=parseInt(objectFound.price)
        let priceEnCuotas=priceParseInt/6;
        let priceToFixed=priceEnCuotas.toFixed(2);
        res.render('products/productDetail',{objectFound,cuotas:priceToFixed});
    },
    edit: function(req,res){
        let idProduct= req.params.id;
        let product= productListOl.find(element=>element.id==idProduct);
        //console.log(product);
        //let product= productListOl[idProduct-1]
        res.render('products/editProduct',{product});
    },
    update:(req,res)=>{
        idProduct= req.params.id;
        let productToMidyfy= productListOl.find(element=>element.id==idProduct);
        let modifiedProduct={
            id: idProduct,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            payWay: req.body.payWay,
            cuotas: req.body.cuotas,
            interest: req.body.interest,
            description: req.body.description
        }
        if(req.file){
            modifiedProduct.productImage=req.file.filename;
        } else if (req.body.deleteImage=='on'){
            modifiedProduct.productImage='';
        } else{
            modifiedProduct.productImage=productToMidyfy.productImage;
        }
        modifiedProduct.inStock= true;
        //splice sirve si no se borra nunca ningun producto del json
        //productListOl.splice((idProduct-1),1,modifiedProduct);
        //splice sirve si no se borra nunca ningun producto del json
        for(let i=0; i<productListOl.length;i++){
            if(productListOl[i].id==modifiedProduct.id){
                productListOl[i]=modifiedProduct;
                break;
            }
        }
        console.log(req.body.deleteImage);
        let productListOlupdated= JSON.stringify(productListOl, null, " ");
        fs.writeFileSync(productListPath, productListOlupdated)
        res.redirect('/product');
    },
    destroy: function(req,res){
        let id= req.params.id;
        for(let i=0; i<productListOl.length; i++){
            if(productListOl[i].id==id){
                productListOl[i].inStock= false;
                /*if(productListOl[i].productImage){
                    var imageToDelete= productListOl[i].productImage;
                }
                productListOl.splice(i,1);*/
                break;
            }
        };
        /*if(imageToDelete){
            fs.unlinkSync(path.join(__dirname, '../../public/imagenes/productImages/')+imageToDelete);
        }*/
        fs.writeFileSync(productListPath,  JSON.stringify(productListOl, null, " "));
        res.redirect('/product');   
    }
}

module.exports = productController;