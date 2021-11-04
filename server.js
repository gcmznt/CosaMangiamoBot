const fastify = require("fastify")({ logger: true });
const { sendMesage } = require("./send");

fastify.get("/send", async (request, reply) => {
  if (request.query.code === process.env.PASS_KEY) sendMesage();
  return { hello: "world" };
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3003);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
