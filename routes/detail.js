const express = require('express');
const request = require('request');
const router = express.Router()

const path = "https://api.mercadolibre.com"

router.get('/')

function getDetail(req, res) {
    const detail = encodeURIComponent(req.query.product_id)
    const endpoint = `/items/${detail}`
    const descriptionEndpoint = `/items/${detail}/description`
    const searchUrl = path + endpoint
    const description = getDescription(path + descriptionEndpoint)

    request.get(searchUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const item = JSON.parse(body);

            var response = {
                author: {
                    name: "Paula",
                    lastname: "Lupari"
                },                
                id: item.id,
                title: item.title,
                category_id: item.category_id,
                price: {
                    currency: item.currency_id,
                    amount: item.price,
                    decimals: item.price
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                sold_quantity: item.sold_quantity,
                description: description

            };        

            res.json(response)
        } else {            
            res.json(
                {
                    status: 500,
                    error: "Internal server error"
                }
            );
        }
    })

}

function getDescription(url) {
    request.get(url, function (error, res, body) {
        if (!error) {
            const item = JSON.parse(body);
            var response = {
                description: item.plain_text
            }
            return item.pla
        }
        else {
            res.json(
                {
                    status: 404,
                    error: "Not Found"
                }
            );
        }
    }
    )
}
module.exports = getDetail