import "reflect-metadata";
import { AppServer } from "./main/server/express.server";

AppServer.run();
// import Redis from "ioredis";
// import { redisEnv } from "./app/envs/reds.env";

// const redis = new Redis({
//   host: redisEnv.host,
//   username: redisEnv.username,
//   port: Number(redisEnv.port),
//   password: redisEnv.password,
// });
// async function runTest() {
//   //   let result = await redis.get("user:1");
//   //   console.log(result);
//   //   if (result == null) {
//   //     console.log("O usuario não existe");
//   //   }

//   let result = await redis.get("user:10");
//   console.log(result);
//   if (result != null) {
//     console.log("O usuario existe em cache");
//     return result;
//   }
//   const user10 = {
//     nome: "teste",
//     idade: 30,
//   };
//   await redis.set("user:10", JSON.stringify(user10));
//   console.log("O usuario 10 foi puxado do db relacional e setado em cache");
// }
// runTest();
