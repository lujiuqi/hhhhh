var sDiv=document.getElementById("search");
var sIn=document.getElementById("s-in");
var sBtn=document.getElementById("s-btn");
sBtn.onmouseenter=function(){
    sDiv.style.width="120px";
    sDiv.style.borderColor="#ccc";
    sIn.style.width="100px";
    sIn.focus();
}
sIn.onblur=function(){
    sDiv.style.width="0px";
    sDiv.style.borderColor="#fff";
    sIn.style.width="0px";
}