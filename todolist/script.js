const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let todo = require("./todos/JS/script");
let TODOS_PATH = path.join(__dirname, "todos", "data", "todo.json");
app.use(express.static(path.join(__dirname, "static")));


app.get("/gettodo", async (req, res) => {
  try {
    let data = await todo.gettodo();

    if (!Array.isArray(data)) {
      console.log("Data is not an array:", data);
      return res.status(500).send("Data is not in the expected format");
    }

    const tasks = data.map((item) => item);
    res.send(tasks);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addtodo", async (req, res) => {
  let { taskitem } = req.body;
  console.log(taskitem);
  let mssg = await todo.addtodo(taskitem);
  res.redirect("/");
});
app.delete("/todos/:id", (req, res) => {
  const idToDelete = req.params.id;
  fs.readFile(
    TODOS_PATH,
    {
      encoding: "utf-8",
    },
    (err, data) => {
      if (err) {
        console.log("err");
      } else {
        try {
          const todos = JSON.parse(data);
          const filteredTodos = todos.filter((todo) => todo.id !== idToDelete);

          fs.writeFile(TODOS_PATH, JSON.stringify(filteredTodos), (err) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send("Todo deleted successfully");
            }
          });
        } catch (parseErr) {
          res.status(500).send(parseErr.message);
        }
      }
    }
  );
});

app.patch("/todos/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const updatedTodo = req.body.task;
  fs.readFile(
    TODOS_PATH,
    {
      encoding: "utf-8",
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const todos = JSON.parse(data).map((todo) => {
          if (todo.id === idToUpdate) {
            todo.task = updatedTodo;
          }
          return todo;
        });
        fs.writeFile(TODOS_PATH, JSON.stringify(todos), (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send("Todo updated successfully");
          }
        });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
