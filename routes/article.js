let express = require('express');
let router = express.Router();
let ArticleSchema = require('./../schemas/articleSchema');

router.get('/getArticles', (request, response) => {
    ArticleSchema.find((error, articles) => {
        if (error == null) response.send(articles);
        else console.log(`ERROR ${error}`);
    })
})

router.get('/getArticle/:id', (request, response) => {
    ArticleSchema.findById(request.params.id, (error, article) => {
        if (error == null) response.send(article);
        else {
            response.send({ "status": "OK", "data": null });
            console.log(`ERROR ${error}`);
        }
    })
})

router.post('/setArticle', (request, response) => {
    // ArticleSchema.deleteMany({ id: { $in: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] } }, (err) => {
    // var articles = { ...request.body };    
    // articles.array.forEach(article => {
    //     console.log(article.id);
    // });
    // ArticleSchema.save(articles);

    // response.body.articles.map((article) => {
    //     article.save((error) => {
    //         if (error == null) console.log('Articulo Guardado');
    //         else console.log(`ERROR ${error}`);
    //     });
    // })
    // response.send("todo dd");
    // });

    // var article = new ArticleSchema({ ...request.body });

    // article.save((error) => {
    // if (error == null) console.log('Articulo Guardado');
    // else console.log(`ERROR ${error}`);
    // });

});

router.post('/newArticle', (request, response) => {
    var article = new ArticleSchema({ ...request.body });

    article.save((error) => {
        if (error == null) console.log('Articulo Guardado');
        else console.log(`ERROR ${error}`);
    });

    response.send(article);
});

router.put('/updateArticle/:id', (request, response) => {
    ArticleSchema.findById(request.params.id, (error, article) => {
        if (error == null) {
            // article.title = request.body.title;
            article.description = request.body.description;
            // article.price = request.body.price;
            // article.category = request.body.category;
            article.save((error) => {
                if (error == null) {
                    console.log('Articulo Actualizado');
                    response.send(article);
                }
                else {
                    console.log('Articulo NO Actualizado');
                    response.send({ "status": "UNEXPECTED_ERROR", "data": null });
                }
            });
        }
        else {
            console.log('Articulo NO EXISTE');
            response.send({ "status": "NOT_EXIST", "data": null });
        }
    })
});

router.delete('/deleteArticle/:id', (request, response, next) => {
    ArticleSchema.findById(request.params.id, (error, article) => {
        if (error == null && article != null) {
            article.remove((error) => {
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