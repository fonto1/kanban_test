let data = {
    icebox : ["hoppa","gråta"],
    todo : ["leka"],
    doing :["äta"],
    test : ["jobba", "läsa"],
    done : ["musik","måla"]
}

let ulIce = document.getElementById("icebox");
let button = document.getElementById("button");
let input = document.getElementById("input");

button.addEventListener('click',create)
/*
function display() {
document.getElementById("todo").innerHTML = data.todo.join('<br>');
document.getElementById("test").innerHTML = data.test.join('<br>');
document.getElementById("done").innerHTML = data.done.join('<br>');
}

//display();
*/


createDisplay()
function createDisplay(){
    ulIce.innerHTML ="";
    
    data.icebox.forEach(function(content){
         
         let li = document.createElement("li");
         let text = document.createTextNode(content)
         li.append(text);
         li.setAttribute('draggable', true);
         ulIce.append(li);

         console.log(text);
    })
}


function create(){
   data.icebox.push(input.value);
   createDisplay();
}