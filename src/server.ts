import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as log from "https://deno.land/std/log/mod.ts";

import {
  getUsers,
  getUser,
  addUser,
  User,
  updateUser,
  deleteUser,
} from "./services/userService.ts";

const app = new Application();
const router = new Router();

router
  .get("/healthcheck", async ({ response }) => {
    response.status = 200;
  })
  .get("/search", async ({ response }) => {
    response.body = getUsers();
  })
  .get("/search/:id", async ({ params, response }) => {
    if (!params?.id || typeof params.id !== "number") {
      log.error("Params missing");
      response.status = 400;
      return;
    }
    const user = getUser(parseInt(params.id));
    if (!user) {
      log.info("No user found");
      response.status = 404;
      return;
    }
    response.body = user;
  })
  .post("/add", async ({ request, response }) => {
    if (!request.hasBody) {
      log.error("No body provided in the request");
      response.status = 400;
      return;
    }
    const body = await request.body();
    const user: User = body.value;
    const result = addUser(user);
    Array.isArray(result) ? response.body = result : response.status = 400;
  })
  .put("/update", async ({ request, response }) => {
    if (!request.hasBody) {
      log.error("No body provided in the request");
      response.status = 400;
      return;
    }
    const body = await request.body();
    const user: User = body.value;
    const result = updateUser(user);
    Array.isArray(result) ? response.body = result : response.status = 400;
  })
  .post("/delete", async ({ request, response }) => {
    const body = await request.body();
    if (!(request.hasBody && body.value.id)) {
      log.error("No id provided in the request");
      response.status = 400;
      return;
    }
    const { id } = body.value;
    const result = deleteUser(id);
    Array.isArray(result) ? response.body = result : response.status = 400;
  });

app.use(router.routes());
log.info("Starting the server");
await app.listen({ port: 8000 });
