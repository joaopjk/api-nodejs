import * as restify from "restify";
import {ModelRouter} from "../common/model-router";
import {Review} from "./reviews.model";
import * as mongoose from "mongoose";

class ReviewsRouter extends ModelRouter<Review> {
    constructor() {
        super(Review);
    }

    // findById = (req, res, next) => {
    //     this.model.findById(req.params.id)
    //         .populate('user', 'name')
    //         .populate('restaurant', 'name')
    //         .then(this.render(res, next))
    //         .catch(next);
    // }

    protected prepareOne(query: mongoose.DocumentQuery<Review, Review>): mongoose.DocumentQuery<Review, Review> {
        return query
            .populate('user', 'name')
            .populate('restaurant', 'name');
    }

    applyRoutes(application: restify.Server) {
        application.get('/reviews', this.findAll)
        application.get('/reviews/:id', [this.validateId, this.findById]);
        application.post('/reviews', this.save);
        application.put("/reviews/:id", [this.validateId, this.replace]);
        application.patch("/reviews/:id", [this.validateId, this.update]);
        application.del('reviews/:id', [this.validateId, this.delete]);
    }
}

export const reviewRouter = new ReviewsRouter();