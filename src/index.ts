let listElement = document.querySelector("#app ul") as HTMLUListElement;
let inputElement = document.querySelector("#app input") as HTMLInputElement;
let buttonElement = document.querySelector("#app button") as HTMLElement;


let listSave: (string | null) = localStorage.getItem("@list_tasks");
let tasks: string[] = listSave !== null && JSON.parse(listSave) || []; //check if empty

function listTask(){
    listElement.innerHTML = "";
    
    tasks.map( item => {
        let allElement = document.createElement("li");//create element 
        let taskText = document.createTextNode(item);//add text in []



        //delete
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");

        //get position
        let position = tasks.indexOf(item);

        linkElement.setAttribute("onclick", `deleteTasks(${position})`);
        linkElement.setAttribute("style", "margin-left:10px");

        let linkText =  document.createTextNode("Delete");//create text
        linkElement.appendChild(linkText);//add text in element

        
        
        allElement.appendChild(taskText);//relating element and text
        allElement.appendChild(linkElement);//add delete
        listElement.appendChild(allElement);//add in html element
    })
}

listTask();//to execute

function addTask(){
    if(inputElement.value ===""){
        alert("Digite alguma tarefa!");
        return false;
    }else{
        let enterTask: string = inputElement.value;
        tasks.push(enterTask);
        inputElement.value = "";
        listTask();
        saveDatas();
    }
}

buttonElement.onclick = addTask;

function deleteTasks(position:number){
    tasks.splice(position, 1);

    listTask();
    saveDatas();
}

function saveDatas(){
    localStorage.setItem("@list_tasks", JSON.stringify(tasks));//convert to string and save to localStorege 
}

