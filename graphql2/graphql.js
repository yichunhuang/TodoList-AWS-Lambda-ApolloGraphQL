// graphql.js
const { ApolloServer} = require('apollo-server-lambda');
// const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const TodoAPI = require('./todo.js');

const server = 
    new ApolloServer({ 
        typeDefs,
        resolvers,
        dataSources: () => ({
            todoAPI: new TodoAPI()
        })
    });
// server.listen().then(({ url }) => {
//     console.log(`Server ready at ${url}`);
// });
exports.graphqlHandler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
});