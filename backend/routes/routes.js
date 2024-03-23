import express from 'express'
import * as controller from '../controllers/controllers.js'
const route = express.Router()

route.get('/get-categories',controller.get_categories)
route.get('/get-category/:slug',controller.get_category)
route.post('/add-category',controller.add_category)
route.patch('/update-category/:slug',controller.update_category)
route.delete('/delete-category/:slug',controller.delete_category)

route.get('/get-howtos',controller.get_how_tos)
route.get('/get-howto/:slug',controller.get_how_to)
route.post('/add-howto/:slug',controller.add_how_to)
route.patch('/update-howto/:slug',controller.update_how_to)
route.delete('/delete-howto/:slug',controller.delete_how_to)

export default route