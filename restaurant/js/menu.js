var tables = JSON.parse(tables);
var items = JSON.parse(items);
var testing;
var latest_table, currentTarget;

displayItems();
displayTables();



function displayTables() {

    for (var i = 0; i < tables.length; i++) {
        var tableRef = document.getElementById('tables');
        var new_div = document.createElement("div");
        new_div.className="table-1";
        new_div.innerHTML = "<p>" +tables[i].name+"</p>" + " Rs. " + tables[i].total_amount + " | Total items: " + tables[i].total_items;
        new_div.addEventListener("dragover", allowDrop, false);
        new_div.addEventListener("drop", drop, false);
        new_div.addEventListener("click", displayBill, false);

        new_div.id = tables[i].id;
        new_div.name = tables[i].name;
        new_div.total_items = tables[i].total_items;
        new_div.total_amount = tables[i].total_amount;
        new_div.items = tables[i].items;
        
        tableRef.appendChild(new_div);
    }

}


function displayItems() {


    for (var i = 0; i < items.length; i++) {
        var menuRef = document.getElementById('menuItems');
        var new_div = document.createElement("div");
        new_div.className = 'table2';

       new_div.innerHTML='<p>'+items[i].name +'</p>'+items[i].cost;
        new_div.draggable = "true";
        new_div.addEventListener("dragstart", drag, false);


        new_div.id = items[i].id;
        new_div.name = items[i].name;
        new_div.type = items[i].type;
        new_div.cost = items[i].cost;

        menuRef.appendChild(new_div);
    }
}



function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.dropEffect = "copy";
    ev.dataTransfer.setData("text", ev.target.id);
    
}

function drop(ev) {
    ev.preventDefault();
    var item_id = ev.dataTransfer.getData("text");
    var item = document.getElementById(item_id);
    var table_id = ev.target.id;
    var table = document.getElementById(table_id);
    var found = false;

    for (var i = 0; i < table.items.length; i++) {
        if (table.items[i].item_id == item_id) {
            table.items[i].item_count++;
            //table.total_items++;
            table.total_amount += item.cost;
            found = true;
        }
    }

    if (found == false) {
        var new_item = { "item_id": item.id, "item_count": 1, "item_name": item.name, "item_cost": item.cost };
        table.items.push(new_item);
        table.total_items++;
        table.variety_count++;
        table.total_amount += item.cost;
    }

    table.innerHTML ="<p>"+ table.name+"</p>" + " Rs. " + table.total_amount + " | Total items: " + table.total_items;
    
}


function filterTables() {
    var input = document.getElementById('inputT');
    var filter = input.value.toLowerCase();
    var table = document.getElementById("tables");
    var div = table.children;
    for (var i = 0; i < div.length; i++) {
        if (div[i].name.toLowerCase().indexOf(filter) > -1) {
            div[i].style.display = "";
        } else {
            div[i].style.display = "none";
        }
    }
}


function filterItems() {
    var input = document.getElementById('input_items');
    var filter = input.value.toLowerCase();
    var items = document.getElementById("menuItems");
    var div = items.children;
    for (var i = 0; i < div.length; i++) {
        if ((div[i].name.toLowerCase().indexOf(filter) > -1) || (div[i].type.toLowerCase() == filter)) {
            div[i].style.display = "";
        } else {
            div[i].style.display = "none";
        }
    }
}

function displayBill(ev) {
    
    currentTarget = ev;
    
    var head = document.getElementById("modal-title");
    var table = document.getElementById(ev.target.id);
    head.innerHTML = table.name;
    var tableRef = document.getElementById('billTable');
    tableRef.innerHTML = "<thead><tr><th>Item</th><th>Price</th><th>Item-Count</th><th>Delete</th></tr></thead>";
    table.total_amount = 0;
    table.total_items = 0;
    var tableRef = document.getElementById('billTable');
    for (var i = 0; i < table.items.length; i++) {
        var item = document.getElementById(table.items[i].item_id);

        table.total_amount = table.total_amount + table.items[i]["item_cost"] * table.items[i]["item_count"];
        table.total_items += 1;
        tableRef.innerHTML += "<tbody><tr><td >" + table.items[i]["item_name"] + "</td><td >" + table.items[i]["item_cost"] + "</td><td ><input type='number' id ='" + 50 + i + "' value=" + table.items[i]["item_count"] + " onchange='editBill(this.value," + i + ")'></input></td><td><span class='glyphicon glyphicon-trash' onclick='deleteItem(" + i + ")'></span></td></tr></tbody>";
    }
    tableRef.innerHTML += "<thead><tr><td>Total:</td><td>" + table.total_amount + "</td></tr></thead>";

    var footer = document.getElementById("modal-footer");
    footer.innerHTML = "<button type='button' class='btn btn-primary' onclick='closeSession()' data-dismiss='modal' >Close Session(GenerateBill)</button>";
    $('#tableBill').modal('show');
    ev.target.style.background="orange";
}
function closeModal(){
    var table=document.getElementById(currentTarget.target.id);
    table.style.background="white";
}
function closeSession() {
    var table = document.getElementById(currentTarget.target.id);
    table.items.splice(0, table.items.length);
    table.total_amount = 0;
    table.total_items = 0;
    table.innerHTML ="<p>"+ table.name + "</p> Rs. " + table.total_amount + " | Total items: " + table.total_items;
    table.style.background = "white";
}


function deleteItem(item) {
    var table = document.getElementById(currentTarget.target.id);
    table.items.splice(item, 1);
    displayBill(currentTarget);
    table.innerHTML = "<p>"+ table.name + "</p> Rs. " + table.total_amount + " | Total items: " + table.total_items;

}

function editBill(val, currentItem) {
    if (val <= 0) {
        alert("items should be possitive")
    } else {
        var table = document.getElementById(currentTarget.target.id);
        table.items[currentItem]["item_count"] = val;
        displayBill(currentTarget);
        table.innerHTML ="<p>"+ table.name + "</p> Rs. " + table.total_amount + " | Total items: " + table.total_items;
    }
}
var modal=document.getElementById('tableBill');
window.onclick=function(event){
    if(event.target==modal)
        currentTarget.target.style.background="white";
}