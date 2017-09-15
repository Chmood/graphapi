import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

let dummyData = {
  "1": "leebyron",
  "2": "enaqx",
  "3": "schrockn",
  "4": "andimarek"
};

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      contributor: {
        type: GraphQLString,
        args: {
          id: { type: GraphQLString }
        },
        //Using Destructuring of ES2015 to assign value to id
        resolve: (root, { id }) => {
          return dummyData[id];
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
      updateContributor: {
        type: GraphQLString,
        args: {
          id: { type: GraphQLString },
          username: { type: GraphQLString }
        },
        resolve: (root, { id, username }) => {
          dummyData[id] = username;
          return dummyData[id];
        }
      }
    }
  })
});
