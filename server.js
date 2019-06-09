const Hapi = require("@hapi/hapi");
const { configureDB } = require("./db/config");

//Init Server

const server = Hapi.server({
  port: 3000,
  host: "localhost"
});

const main = async () => {
  await configureDB(server);

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
