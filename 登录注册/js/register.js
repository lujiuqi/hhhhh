var regbox=document.getElementById("regbox");
var rform=document.getElementById("regform");
var rInput=regbox.getElementsByTagName("input");
var rBtn=regbox.getElementsByTagName("button");
var rSpan=regbox.getElementsByTagName("span");
var rVerify=regbox.getElementsByTagName("i")[0];
rVerify.innerHTML=tool.randomVeri(4);
console.log(regbox,rInput,rBtn);
var uArr=[];//记录用户信息的数组
var checkArr=[];//记录每一项的验证结果
var pArr=['请输入6-15位密码','弱','中','强'];
var id=0;
var regPhone=/^1[3-9]\d{9}$/;
var regemail=/^\w{6,10}@[0-9a-zA-Z]{2,15}\.(com|cn|net)$/;
for(var i=0;i<rInput.length;i++){
    checkArr.push(false);
}
rInput[0].onchange=function(){
    if(!rInput[0].value){
        rSpan[0].innerHTML="手机号不能为空";
        checkArr[0]=false;
    }else if(regPhone.test(rInput[0].value)){
        rSpan[0].innerHTML="√";
        checkArr[0]=true;
    }else{
        rSpan[0].innerHTML="手机号格式不对";
        checkArr[0]=false;

    }
}
//验证密码的强弱
rInput[1].onchange=function(){
    var l=0;//记录密码等级
    if(/[0-9]/.test(rInput[1].value))
    l++;
    if(/[a-zA-Z]/.test(rInput[1].value))
    l++;
    if(/[^0-9a-zA-Z]/.test(rInput[1].value))
    l++;
    if(rInput[1].value.length<6||rInput[1].value.length>15) 
    l=0;
    rSpan[1].innerHTML=pArr[l];
    if(l>=2){
        checkArr[1]=true;
    }else{
        checkArr[1]=false;
    }

}
//确认密码
rInput[2].onchange=function(){
    var val=this.value;
    if(val==rInput[1].value){
        rSpan[2].innerHTML="√";
        checkArr[2]=true;
    }else{
        rSpan[2].innerHTML="两次输入的密码不一致";
        checkArr[2]=false;
    }
}
//邮箱的验证
rInput[3].onchange=function(){
    if(!rInput[3].value){
        rSpan[3].innerHTML="邮箱不能为空";
    }else if(regemail.test(rInput[3].value)){
        rSpan[3].innerHTML="√";
        checkArr[3]=true;
    }else {
        rSpan[3].innerHTML="邮箱号格式不对";
        checkArr[0]=false;
    }
}
rInput[4].onchange=function(){
    var val=rInput[4].value;
    if(val.toLowerCase()==rVerify.innerHTML.toLowerCase()){
        rSpan[4].innerHTML="√";
        rVerify.innerHTML=tool.randomVeri(4);
        checkArr[4]=true;
    }else{
        rSpan[4].innerHTML="验证码有误";
        rVerify.innerHTML=tool.randomVeri(4);
        checkArr[4]=false;
    }
}
rVerify.onclick=function(){
    rVerify.innerHTML=tool.randomVeri(4);
}
console.log(checkArr);
rform.onsubmit=function(){
    for(var i=0;i<checkArr.length;i++){
        if(!checkArr[i]){
            alert("注册失败,请重新输入信息");
            return false;
        }
    }
    var user={
        uphone: rInput[0].value,
        upassword:rInput[1].value,
        uemail:rInput[3].value
    }
    uArr.push(user);
    console.log(uArr);
    localStorage .setItem('user',JSON.stringify(uArr))
    alert("注册成功去登录 ");
    window.location="./enroll.html";
    return false;
}

// 13487627466
// 17t090
// 123123@qq.com