const { decoded } = require('../helpers/jwt')
const Article = require('../models/article')

class ArticleController {
    static list(req, res, next) {
        Article.find()
        .then(data => {
            res.status(200).json(data.sort(function(a,b){return b.createdAt - a.createdAt}))
        })
        .catch(next)
    }

    static create(req, res, next) {
        let tags = req.body.tags.split(',')
        let obj = {
            img: req.file.cloudStoragePublicUrl,
            title: req.body.title,
            body: req.body.body,
            tags: tags,
            userId: req.decoded.id
        }
        Article.create(obj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        Article.findOne({_id : req.params.id})
        .then(data => {
            res.status(200).json(data)
        }) 
        .catch(next)
    }

    static updateWithImage(req, res, next) {
        let tags = req.body.tags.split(',')
        let obj = {
            title: req.body.title,
            body: req.body.body,
            img: req.file.cloudStoragePublicUrl,
            tags: tags
        }
        Article.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                next({ code: 404, resource: 'Article' })
            } else {
                data.set(obj)
                return data.save()
            }
        }) 
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateWithoutImage(req, res, next) {
        // let tags = req.body.tags.split(',')
        let obj = {
            title: req.body.title,
            body: req.body.body,
            img: req.body.img,
            tags: req.body.tags
        }
        Article.findOne({_id : req.params.id})
        .then(data => {
            if (!data) {
                next({ code: 404, resource: 'Article' })
            } else {
                data.set(obj)
                return data.save()
            }
        }) 
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) next({ code: 404, resource: 'Article' })
                else res.status(200).json(req.params.id)
        }) 
        .catch(next)
    }
}
module.exports = ArticleController