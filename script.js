fetch("users.json")
.then((response)=>{
    
    return response.json();
})
.then((data1)=>{
    let dataSet1 = data1
    console.log(dataSet1);



// ---------------------------------
/*
let data = {
     icebox: ["hoppa", "gråta"],
     todo: ["leka"],
     doing: ["äta"],
     test: ["jobba", "läsa"],
     done: ["musik", "måla"]
}
*/

let boards = document.querySelectorAll(".boards");
let key = 0;
let icebox = document.getElementById("icebox");
let todo = document.getElementById("todo");
let doing = document.getElementById("doing");
let test = document.getElementById("test");
let done = document.getElementById("done");
let index;
let data;

console.log("test");


let button = document.getElementById("button");
let input = document.getElementById("input");

button.addEventListener('click', create)
/*
document.querySelectorAll(".drag").forEach(function (drag) {
    drag.addEventListener('dragstart', dragStart)
    drag.addEventListener('dragend', dragEnd)
})
*/

boards.forEach(function (emp) {
    emp.addEventListener('dragstart', dragStart)
    emp.addEventListener("dragover", dragOver)
    emp.addEventListener("drop", dragDrop)
    emp.addEventListener("click",del)
});

function del(){
    let element = event.target;
    let todoObject = element.parentElement.innerText
    let parent = element.parentElement.parentElement.id
    if (element.className == "fas fa-trash-alt"){
        let objId = data[parent].indexOf(todoObject);
        data[parent].splice(objId,1);
        display();
    }


}

function dragStart(evt) {
    evt.dataTransfer.setData("text", evt.target.id);
    console.log("dragging...");
    selected = evt.target;
}

function dragEnd() {
    console.log("ending....")
}

function display() {
   
    boards.forEach(function (bor) {
        bor.innerHTML = bor.id;
    });
        
        ["icebox", "todo", "doing", "test", "done"].forEach(function (info) {
            document.getElementById(info).innerHTML += data[info].map(function (item) {
                key++
                return `<li id="${key}" class="drag" draggable='true'>${item}<i class="fas fa-trash-alt"></i></li>`
            }).join(" ");
       
        })
    key = 0;
}



function create() {
    data.icebox.push(input.value);
    input.value ="";
    display();
}


function dragOver(e) {
    e.preventDefault();
    console.log("over");
    let fromTarget = document.getElementById(selected.id).parentElement.id 
    let indexInArray;
    if (e.target.parentNode.className == 'boards') {
        e.preventDefault();
        if ( isBefore( selected, e.target ) ) {
            e.target.parentNode.insertBefore( selected, e.target );
        } else {
            e.target.parentNode.insertBefore( selected, e.target.nextSibling );
        }
        let newArray = [];
        let listArray = e.target.parentElement.querySelectorAll("li");
        listArray.forEach(element => {
            newArray.push(element.innerText);            
        });
        // console.log(newArray);
        data[fromTarget] = newArray;
    }
}

function dragDrop(evt) {

    if (evt.target.className == 'boards') {
        evt.preventDefault();
        selected = null;
        console.log("dropped")
        push(evt)
        display()
  
    }

}

function push(evt){
    let id = evt.dataTransfer.getData("text");
    let newtarget = evt.target.id;
    let currentValue = document.getElementById(id).innerText     // value
    let fromTarget = document.getElementById(id).parentElement.id  // from id
    data[newtarget].push(currentValue)
    data[fromTarget].splice(data[fromTarget].indexOf(currentValue),1);

   console.log(data[fromTarget]);
   console.log(data[newtarget]);
}


// ____________ localstorage
    
     
    function ls(){
   if(localStorage.getItem(index)) {
       let temp = JSON.parse(localStorage.getItem(index));
       data = temp;
       }
   // if not - create an empty []
   else {
       data = {
        icebox: [],
        todo:[],
        doing: [],
        test: [],
        done: []
       }
       };
   display();
};

let logout_but = document.querySelector('.log_out');
logout_but.addEventListener('click',function(logout){
 //  localStorage.clear();
   localStorage.setItem(index,JSON.stringify(data))
   logout1();
   console.log("logout");
});

let login_but = document.getElementById("login_button")
login_but.addEventListener('click', ready)


//aleksandra 
function ready() {   
    let user =[];
    let inputUser = document.getElementById("username");
    let inputPass = document.getElementById("userpass")
    console.log(dataSet1);
    
    for (var i = 0; i < dataSet1.length; i++) {
        if (dataSet1[i].hasOwnProperty("username")) {
            console.log("1")
            console.log(dataSet1[i].username);
            console.log(inputUser.value);
            if (dataSet1[i].username == inputUser.value) {
                console.log("2")
                if(dataSet1[i].password == inputPass.value){
                    let inputUser1 = inputUser.value;
                    let inputPass1 = inputPass.value;
                    user.push(inputUser1);
                    user.push(inputPass1);
                     console.log(user);   
                     index = inputUser1         
                     ls()       
                };
                break; //bye bye for loop
            }
        }
       
    }

  
    if(user[0] == inputUser.value && user[1] == inputPass.value){
        display();
        document.getElementById("userScreen").style.display = 'block';
        document.getElementById("loginScreen").style.display = 'none';
        
    } else {
        alert("Wrong Username or Password");
    }
}

function logout1(){
    console.log("logout_again")
    display();
        document.getElementById("userScreen").style.display = 'none';
        document.getElementById("loginScreen").style.display = 'block';
}

function isBefore(el1, el2) {
    if (el2.parentNode === el1.parentNode) {
       let cur = el1.previousSibling;
       while (cur != undefined) {
          if (cur === el2) {
             return true;
          }
          cur = cur.previousSibling;
       }
    } else {
       return false;
    }
 }


}); // fetch ends