const Hapi = require("@hapi/hapi");
const { configureDB } = require("./db/config");
const { configureRoutes } = require("./routes");

//Init Server

const server = Hapi.server({
  port: 3000,
  host: "localhost"
});

const main = async () => {
  await configureDB(server);
  await configureRoutes(server);
  await server.start();

  return server;
};
main()
  .then(server => {
    console.log("Server running at: ", server.info.uri);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
