import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { addUser, User } from "./userService.ts";

Deno.test("add the user", () => {
  // TODO: mock getUsers. awaiting answer from the chat
  const user: User = {
    username: "neil",
  };
  const result = addUser(user);
  assertEquals(result.length, 3);
});
