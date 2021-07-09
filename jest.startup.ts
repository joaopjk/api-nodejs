import * as jestCli from 'jest-cli';
import {environment} from "./common/environment";
import {Server} from "./server/server";
import {usersRouter} from "./users/user.router";
import {User} from "./users/users.model";
import {reviewRouter} from "./reviews/reviews.router";
import {restaurantRouter} from "./restaurants/restaurant.router";
import {Review} from "./reviews/reviews.model";

let server: Server;

const beforeAllTests = () => {
    environment.db.url = 'mongodb://localhost/meat-api-test-db';
    environment.server.port = 3001
    server = new Server();
    return server
        .bootstrap([
            usersRouter,
            reviewRouter,
            restaurantRouter])
        .then(() => {
            User
                .remove({})
                .exec()
        })
        .then(() => {
            Review
                .remove({})
                .exec()
        })
        .catch(console.error)
}

const afterAllTests = () => {
    return server.shutDown();
}

beforeAllTests()
    .then(()=>jestCli.run())
    .then(()=>afterAllTests())
    .catch(console.error)