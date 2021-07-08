import { addNewTask, updatedTask } from "./server";

(async function () {
  addNewTask({
    name: "mytask",
    id: "123456",
  });

  await updatedTask({
    name: "mytask|Update",
    id: "1234567",
  });
})();
