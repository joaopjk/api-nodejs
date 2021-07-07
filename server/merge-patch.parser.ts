import * as restify from 'restify';
import {BadRequestError} from "restify-errors";

const mpContentType = 'application/merge-patch+json';

export const mergePatchBodyParser = (req: restify.Request, res: restify.Response, next) => {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        try {
            req.body = JSON.parse(req.body);
        } catch (e) {
            return next(new BadRequestError(e.message));
        }
    }
    return next();
}
