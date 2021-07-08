import * as restify from "restify";

export const errorHandler = (req: restify.Request, res: restify.Response, err, done) => {
    console.log(err);

    err.toJSON = () => {
        return {
            message: err.message
        }
    };

    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400;
            }
            break;
        case 'ValidationError':
            err.statusCode = 400;
            let messages: any [] = [];
            for (let index in err.errors) {
                messages.push({message: err.errors[index].message});
            }
            err.toJSON = () => {
                return {
                    errors: messages
                }
            }
            break;
    }

    done()
}