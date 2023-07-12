import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    title(title: String): [Recipe]
    ingredient(ingredient: String): [Recipe]
    recipes: [Recipe]
  }

  type Recipe {
    id: ID
    title: String
    ingredient: String
    content: String
    createdAt: String
    updatedAt: String
    like: Boolean
  }

  type Mutation {
    create(
      title: String
      ingredient: String
      content: String
      createdAt: String
    ): Recipe

    delete(id: ID): ID

    edit(
      id: ID
      title: String
      ingredient: String
      content: String
      updatedAt: String
    ): Recipe
  }
`;
