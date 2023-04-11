require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("hapi-auth-jwt2");
const UserController = require("./controllers/users");
const routes = require("./routes");

const server = new Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
});

const validate = async (decoded, request, h) => {
  console.log(decoded, request);
  const user = await UserController.findByUsername(decoded.username);
  console.log(user);

  if (!user || user.password !== decoded.password) {
    return { isValid: false };
  }

  return { isValid: true };
};

const init = async () => {
  await server.register(Jwt);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    validate,
  });

  server.auth.default("jwt");

  routes.forEach((route) => {
    server.route(route);
  });

  await server.start();
  return server;
};
init()
  .then((server) => {
    console.log("Server running at:", server.info.uri);
  })
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
