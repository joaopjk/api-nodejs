import {Server} from './server/server';
import {usersRouter} from "./users/user.router";

const server = new Server();
server.bootstrap([usersRouter]).then(s => {
    console.log('Server is listening on:', s.application.address());
}).catch(error=>{
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});





