var i;
var selectedImage = null;
function display() {
    $(document).ready(function () {
        $.getJSON("images.json", function (data) {

            i = data;


            imageLink();

        });
    });
}
function imageLink() {
    if (localStorage.getItem('imageStore') === null) {

        localStorage.setItem('imageStore', JSON.stringify(i));
    }
    else {
        i = JSON.parse(localStorage.getItem('imageStore'));
    }
    var imgList = "";
    $.each(i.images, function (index, value) {
        imgList += "<img onclick='ImageClickHandler(" + index + "); ' src=" + value.url + ">";
        
    }); $('#jsonImages').append(imgList);


}
function ImageClickHandler(imageNo) {
    selectedImage = imageNo;
    setFields();
}

function setFields() {
    images = i.images;
    $("#url").val(images[selectedImage]["url"]);
    $("#name").val(images[selectedImage]["name"]);
    $("#info").val(images[selectedImage]["information"]);
    $("#udate").val(images[selectedImage]["date"]);
}
function toggle() {
    var x = document.getElementById("formDiv");
    if (x.style.display == "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function validate() {
    return (validateDate()&& validateInfo() && validateName() && validateUrl());
}

function validateName() {
    var name = $("#name").val();
    if (name == "") {
        alert("name is empty");
        return false;
    } return true;;
}
function validateInfo() {
    var description = $("#info").val();
    if (description == "") {
        alert("enter description");
        return false;
    } return true;;
}
function validateUrl() {
    var url = $("#url").val();
    
    if (url.match(/\.(jpg|jpeg|gif|png)$/))
        {
          return true;
        }
        else
        {
            alert("enter valid url");
          return false;
        }
   
}
function validateDate(){
    var udate=$("#udate").val();
    var imageDate=new Date(udate);
    var curDate= new Date();
    if(imageDate.getTime()<curDate.getTime()){
        return true;
    }alert("enter valid date");
    return false;
}

function add() {
    if (!validate())
        return false;
    var a = {
        url: $('#url').val(), name: $('#name').val(), information: $('#info').val(), date: $('#udate').val()
    };
    i.images.push(a);
    localStorage.setItem('imageStore', JSON.stringify(i));
    imageLink();

}
function edit() {
    if(!validate())
    return false;
    if(selectedImage==null){
        alert("select image to edit");
        return false;
    }
    i.images[selectedImage]["url"]=$('#url').val();
    i.images[selectedImage]["name"]=$('#name').val();
    i.images[selectedImage]["information"]=$('#info').val();
    i.images[selectedImage]["date"]=$('#udate').val();
    localStorage.setItem('imageStore', JSON.stringify(i));
    imageLink();
}
function del(){
    if(!validate())
    return false;
    if(selectedImage==null){
        alert("select image to delete");
        return false;
    }
    
    i.images.splice(selectedImage,1);
    localStorage.setItem('imageStore', JSON.stringify(i));
    selectedImage=null;
    imageLink();
    
}