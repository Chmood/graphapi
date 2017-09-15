const config = require("./config");
const pack = require("./package.json");

import restify from "restify";
import restifyPlugins from "restify-plugins";
import { graphql } from "graphql";
import schema from "./schema.js";

// function respond(req, res, next) {
//   res.send("hello " + req.params.name);
//   console.log("req.params", req.params);
//   next();
// }

function post(req, res, next) {
  graphql(schema, req.body).then(result => {
    res.send(result);
  });
}

function get(req, res, next) {
  const instruction = `POST GraphQL queries to ${server.url}. Sample query: {contributor (id: "1")}`;
  res.send(instruction);
}

const server = restify.createServer({
  name: pack.name,
  version: pack.version
});

// Middleware
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

// VERBS
// del, get, head, opts, post, put, and patch.
// server.get("/hello/:name", respond);
// server.head("/hello/:name", respond);

server.post("/", post);
server.get("/", get);

server.listen(config.port, () => {
  console.log("%s (version v%s) by %s", pack.name, pack.version, pack.author);
  console.log("Server ready and listening at %s", server.url);
});
