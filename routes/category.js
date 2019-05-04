let express = require('express');
let router = express.Router();
let CategorySchema = require('./../schemas/categorySchema');

router.get('/getCategories', (request, response) => {
    CategorySchema.find((error, categories) => {
        if (error == null) response.send(categories);
        else console.log(`ERROR ${error}`);
    })
})

router.post('/newCategory', (request, response) => {
    var category = new CategorySchema({ ...request.body });

    category.save((error) => {
        if (error == null) console.log('Categoria Guardado');
        else console.log(`ERROR ${error}`);
    });

    response.send(category);
});

router.delete('/deleteCategory/:id', (request, response, next) => {
    CategorySchema.findById(request.params.id, (error, category) => {
        if (error == null && category != null) {
            category.remove((error) => {
                if (error == null) {
                    console.log('Articulo Eliminado');
                    response.send({ "status": "OK", "data": null });
                }
                else {
                    console.log('Articulo NO Eliminado');
                    response.send({ "status": "UNEXPECTED_ERROR", "data": null });
                }
            });
        } else {
            console.log('Articulo ya esta Eliminado');
            response.send({ "status": "OK", "data": null });
        }

    })
})

module.exports = router