const { gql } = require('apollo-server');

const typeDefs = gql`
  # Your schema will go here
  type Mutation {
      newTodo(title: String!, description: String!): MutationResult
      updateTodo(id: ID!, title: String!, description: String!): MutationResult
      deleteTodo(id: ID!): MutationResult
  }
  type Query {
    todos: [Todo]!
    todo(id: ID!): Todo
  }
  type Todo {
    id: ID!
    title: String
    description: String
  }
  type MutationResult {
      statusCode: Int
      body: String
  }
`;

module.exports = typeDefs;