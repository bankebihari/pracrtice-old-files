let tasklist = document.querySelector(".tasklist");
let form = document.querySelector(".myform");
let input = document.querySelector("#taskitem");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let taskitem = input.value;

  axios
    .post(
      "/addtodo",
      {
        taskitem: taskitem,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((data) => {
      console.log(data);
    });
});

btn.addEventListener("click", () => {
  location.reload();
  // getdata("/gettodo");
});
async function updateTodo(id, updatedTodo) {
  try {
    const response = await axios.patch(`/todos/${id}`, {"task": updatedTodo});
    location.reload();
  } catch (error) {
    console.error(error);
  }
}

async function deleteTodo(button) {
  // const button = event.target;

  if (button) {
    const div = button.parentNode;
    try {
      const id = div.id;
      const response = await axios.delete(`/todos/${id}`);


      tasklist.removeChild(div);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Invalid target element");
  }
}

function showData(data) {
  data.forEach((task) => {
    let div = document.createElement("div");
    div.id = task.id;
    div.innerHTML = `${task.task} <button class="edit">Update</button> <button class="delete-button">Delete</button>`;
    tasklist.append(div);
  });

  tasklist.addEventListener("click", (event) => {
    const button = event.target;
    let id = button.parentNode.id;
    if (button.classList.contains("delete-button")) {
      deleteTodo(button);
    }

    if (button.classList.contains("edit")) {
      const userInput = prompt("Please enter updated data:");

      // Displaying the entered value
      if (userInput !== null) {
        console.log("You entered:", userInput);
        updateTodo(id, userInput);
      } else {
        console.log("No input received");
      }
    }
  });
  
}
async function getdata(Api) {
  let data = await fetch(Api);
  let responsedata = await data.json();
  showData(responsedata);
}

getdata("/gettodo");
