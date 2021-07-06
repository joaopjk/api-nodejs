const users = [
    {name: 'João', email: "joao@gmail.com"},
    {name: 'Francini', email: "francini@gmail.com"}
];

export class User {
    static findAll(): Promise<any[]> {
        return Promise.resolve(users);
    }
}
