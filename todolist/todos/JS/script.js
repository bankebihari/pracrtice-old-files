let fs = require("fs");
let path= require("path");
let uuid = require("uuid");
let filepath= path.join(__dirname,"..","data","todo.json")
class todo {
  static gettodo() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        filepath,
        {
          encoding: "utf-8",
        },
        (err, data) => {
          if (err) return reject(err.message);
          resolve(JSON.parse(data));
        }
      );
    });
  }

  static addtodo(value) {
    return new Promise((resolve, reject) => {
      fs.readFile(filepath, { encoding: "utf-8" }, (err, data) => {
        if (err) return reject(err.message);

        let tasks = JSON.parse(data);
        const taskId = uuid.v4();
        const newTask = { id: taskId, task: value };

        console.log("new: ", newTask);
        tasks.push(newTask);

        fs.writeFile(filepath, JSON.stringify(tasks), (err) => {
          if (err) return reject(err.message);
          resolve("Task added");
        });
      });
    });
  }
}

module.exports=todo;