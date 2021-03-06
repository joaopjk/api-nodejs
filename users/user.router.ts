import * as restify from "restify";
import {User} from "./users.model";
import {ModelRouter} from "../common/model-router";
import {authenticate} from "../security/auth.handler";
import {authorize} from "../security/authz.handler";

class UsersRouters extends ModelRouter<User> {
    constructor() {
        super(User);
        this.on('beforeRender', document => {
            document.password = undefined;
        })
    }

    findByEmail = (req, res, next) => {
        if (req.params.email) {
            User.findByEmail(req.params.email)
                .then(user => {
                    if (user)
                        return [user];
                    return [];
                })
                .then(this.renderAll(res, next))
                .catch(next);
        } else {
            next();
        }
    }

    applyRoutes(application: restify.Server) {
        application.get(this.basePath, [authorize('admin'),this.findAll])
        application.get(`${this.basePath}/email/:email`, this.findByEmail)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete]);
        application.post(`${this.basePath}/authenticate`, authenticate);
    }
}

export const usersRouter = new UsersRouters();