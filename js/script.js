//console.log(document);

document.addEventListener("DOMContentLoaded",function(){
    //alert("Hola Mundo");
    document.getElementById("menu-icon").addEventListener("click",function(){
        document.getElementById("nav-list").classList.toggle("active");
    })
})