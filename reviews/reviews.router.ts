import * as restify from "restify";
import {ModelRouter} from "../common/model-router";
import {Review} from "./reviews.model";
import * as mongoose from "mongoose";

class ReviewsRouter extends ModelRouter<Review> {
    constructor() {
        super(Review);
    }

    envelope(document: any): any {
        let resource = super.envelope(document);
        const restaurantId = document.restaurant._id ? document.restaurant._id : document.restaurant
        resource._links.restaurant = `restaurant/${restaurantId}/menu`;
        return resource;
    }

    protected prepareOne(query: mongoose.DocumentQuery<Review, Review>): mongoose.DocumentQuery<Review, Review> {
        return query
            .populate('user', 'name')
            .populate('restaurant', 'name');
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
    }
}

export const reviewRouter = new ReviewsRouter();