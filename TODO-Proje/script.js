// Eleman ekleme işlemi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;


loadItems();




eventListeners();
function eventListeners() {
  form.addEventListener("submit", addNewItem);

  //Eleman silme

  taskList.addEventListener("click", deleteItem);

  // tüm elemanları silme
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems(){

    items = getItemsFromLS();

    items.forEach(function(item){
        createItem(item);
    })
}


// local storage kayıt ettik
function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem ('items')) 
    
    }
    return items;
}

// local storage bilgi ekleme

function setItemTols(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}


function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1)
        }
    
    });
    localStorage.setItem('items',JSON.stringify (items));
}


function createItem(text){
    const li = document.createElement("li");

    li.classList = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';
  
    li.appendChild(a);
  
    taskList.appendChild(li);
}

function addNewItem(e) {
  if (input.value === "") {
    alert("add new item");
  }


  createItem(input.value);


  setItemTols(input.value);

  input.value = ""; // yazdıgımız geri gitsin diye clear input

  e.preventDefault();
}

// delete an item teker teker silme
function deleteItem(e) {



  //target neye tıkladıgını söyler
  if (e.target.className === "fas fa-times") {
    if(confirm('eminmisiniz ?')){
    //silmek için
    e.target.parentElement.parentElement.remove();

        //delete local
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);


  }
    }

  e.preventDefault(); // aşagı yukarı oynamaması işin
}





// delete all items hepsini aynanda silmek

function deleteAllItems(e) {
  if (confirm("eminmisiniz.")) {
    // taskList.innerHTML='';

  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
  }
    localStorage.clear();
  }

  e.preventDefault();
}
