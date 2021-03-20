var lgbox=document.getElementById("lgbox");
var lgform=document.getElementById("lgform");
var lgInput=lgbox.getElementsByTagName("input");
var lgSpan=lgbox.getElementsByTagName("span");
var button=document.getElementsByTagName("button")[1];
var uArr=JSON.parse(localStorage.getItem('user'));
console.log(uArr);
lgform.onsubmit=function(){
    var phone=lgInput[0].value;
    var pass=lgInput[1].value;
    
    var flag=false;
    for(var i=0;i<uArr.length;i++){
        if(uArr[i].uphone==phone&&uArr[i].upassword==pass){
            flag=true;
            break;
        }
    }
    if(flag){
        alert("成功");
        window.location='../首页/index.html';
    }else{
        alert("失败");
    }
    return false;
}

   