const express = require('express');
const request = require('request');
const router = express.Router()

const path = "https://api.mercadolibre.com"

router.get('/')

function searchProduct(req, res) {
    const searchItem = encodeURIComponent(req.query.product_name)
    const endpoint = `/sites/MLA/search?q=${searchItem}`
    const searchUrl = path + endpoint

    request.get(searchUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const results = JSON.parse(body);
            const items = getItems(results)
            
            var response = {
                author: {
                    name: "Paula",
                    lastname: "Lupari"
                },
                items: items                
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

function getItems(results) {
    const items = results.results.slice(0, 4);
    const itemMapped = items.map(i => mapItem(i))

    return itemMapped
}

function mapItem(item) {
    return {
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
        free_shipping: item.shipping.free_shipping
    }
}

module.exports = searchProduct