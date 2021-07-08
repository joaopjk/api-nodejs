import * as restify from "restify";
import {ModelRouter} from "../common/model-router";
import {Restaurant} from "./restaurants.model";
import {NotFoundError} from "restify-errors";

class RestaurantRouter extends ModelRouter<Restaurant> {
    constructor() {
        super(Restaurant);
    }

    findByMenu = (req, res, next) => {
        Restaurant.findById(req.params.id, "+menu")
            .then(response => {
                if (!response) {
                    throw new NotFoundError('Restaurant not found')
                } else {
                    res.json(response.menu);
                    return next();
                }
            })
            .catch(next);
    }

    replaceMenu = (req, res, next) =>{
        Restaurant.findById(req.params.id)
            .then(response => {
                if (!response) {
                    throw new NotFoundError('Restaurant not found')
                } else {
                    response.menu = req.body;
                    return response.save();
                }
            })
            .then( response =>{
                res.json(response.menu);
                return next();
            })
            .catch(next);
    }

    applyRoutes(application: restify.Server) {
        application.get('/restaurants', this.findAll)
        application.get('/restaurants/:id', [this.validateId, this.findById]);
        application.post('/restaurants', this.save);
        application.put("/restaurants/:id", [this.validateId, this.replace]);
        application.patch("/restaurants/:id", [this.validateId, this.update]);
        application.del('restaurants/:id', [this.validateId, this.delete]);

        application.get('restaurants/:id/menu', [this.validateId, this.findByMenu]);
        application.put('restaurants/:id/menu', [this.validateId, this.replaceMenu]);
    }
}

export const restaurantRouter = new RestaurantRouter();