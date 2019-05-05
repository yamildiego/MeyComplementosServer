let express = require('express');
let router = express.Router();
let SaleSchema = require('./../schemas/saleSchema');

router.get('/getSales', (request, response) => {
    SaleSchema.find((error, sales) => {
        if (error == null) response.send(sales);
    })
})

router.post('/newSale', (request, response) => {
    var sale = new SaleSchema({ ...request.body, isPaid: false });

    sale.save((error) => {
        if (error == null) console.log('Sale Guardado');
        else console.log(`ERROR ${error}`);
    });

    response.send(sale);
});

router.delete('/deleteSale/:id', (request, response, next) => {
    SaleSchema.findById(request.params.id, (error, sale) => {
        if (error == null && sale != null) {
            sale.remove((error) => {
                if (error == null) {
                    console.log('Sale Eliminado');
                    response.send({ "status": "OK", "data": null });
                }
                else {
                    console.log('Sale NO Eliminado');
                    response.send({ "status": "UNEXPECTED_ERROR", "data": null });
                }
            });
        } else {
            console.log('Sale ya esta Eliminado');
            response.send({ "status": "OK", "data": null });
        }

    })
})

router.put('/updateSale/:id', (request, response) => {
    SaleSchema.findById(request.params.id, (error, sale) => {
        if (error == null) {
            sale.isPaid = request.body.ispaid;
            sale.save((error) => {
                if (error == null) {
                    console.log('Sale Actualizado');
                    response.send(sale);
                }
                else {
                    console.log('Sale NO Actualizado');
                    response.send({ "status": "UNEXPECTED_ERROR", "data": null });
                }
            });
        }
        else {
            console.log('Sale NO EXISTE');
            response.send({ "status": "NOT_EXIST", "data": null });
        }
    })
});

module.exports = router