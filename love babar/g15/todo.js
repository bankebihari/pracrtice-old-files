const inputBox=document.getElementById("input");

const listContainrt=document.getElementsByClassName("tasklist");

const function addTask(params) {
	if(inputBox.value==""){
		alert("please enter a task!");
	}else{
		let li=document.createElement('li');
		li.innerHTML=inputBox.value;
		listContainrt.appendChild(li);
	}
}

function saveTasks(){
	localStorage.setItem("data"),listContainrt 
}