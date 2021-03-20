var tool=(function(){
    /**
 * 获取非行间样式
 * @param {*} obj 要获取样式的元素
 * @param {*} attr 样式属性名
 */

function getStyle(obj,attr){
    return window.getComputedStyle?getComputedStyle(obj)[attr]:obj.currentStyle[attr];
}
/**
 * 日期格式化函数
 * @param {*} date 要格式化的日期时间对象
 */
function formDate(date){
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();
    var h=date.getHous();
    var mi=date.getMinutes();
    var s=date.getSeconds();
    m=m<10?"0"+m:m;
    d=d<10?"0"+d:d;
    h=h<10?"0"+h:h;
    mi=mi<10?"0"+mi:mi;
    s=s<10?"0"+s:s;
    return y+'年'+m+'月'+d+'日'+h+':'+mi+':'+s;
}
/**
 *   获取n位随机验证码
 * @param {*} n n位的随机验证码
 */
function randomVeri(n){
    var str="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var str1=''
    for(var i=0;i<n;i++){
        str1+=str[Math.floor(Math.random()*str.length)];
    }
    return str1;

}
/**
 * 创建元素函数
 * @param {*} tagname 要创建的元素的标签名
 * @param {*} oCon 创建的标签中的内容，可以默认为空字符串
 */
function createEl(tagname,oCon){
    if(!oCon) oCon='';//先判断创建的元素中是否要添加内容
    var el=document.createElement("tagname");
    el.innerHTML=oCon;
}
/**
 *   事件绑定兼容函数
 * @param {*} el 要绑定事件的元素
 * @param {*} oEvent 要绑定的事件（不带on 如click)
 * @param {*} fn 需要绑定的事件处理函数  oDiv.onclick=fun1,fun1是事件处理函数
 * addEventListener(oEvent,fn,false);oEvent事件类型，fn事件处理函数 false是否捕获（默认）冒泡
 */
function bindEvent(el,oEvent,fn){
    if(el.addEventListener){
        el.addEventListener(oEvent,fn,false);//标准浏览器
    }else{
        el.attachEvent('on'+oEvent,fn)//IE浏览器
    }
}
/**
 *取消事件绑定兼容函数
 * @param {*} el 要绑定事件的元素
 * @param {*} oEvent 要绑定的事件（不带on 如click)
 * @param {*} fn 需要绑定的事件处理函数  oDiv.onclick=fun1,fun1是事件处理函数 
 */
function removeEvent(el,oEvent,fn){
    if(el.removeEventListener){
        el.removeEventListener(oEvent,fn,false);//标准浏览器
    }else{
        el.detachEvent('on'+oEvent,fn)//IE浏览器
    }
}
/**
 * 取消冒泡的兼容函数
 * 子元素接收到事件后，阻止子元素再给父元素传播事件
 * ie只有冒泡
 * @param {*} ev 
 */
function stopBublle(ev){
    var ev=ev||event;//事件对象兼容处理，当事件触发时，通过事件函数的第一个参数传入
    if(ev.stopPropagation){
        ev.stopPropagation();//标准浏览器
    }else{
        ev.cancelBubble=true;//IE浏览器，但所有浏览器都支持
    }
}
/**
 * 阻止事件绑定下的默认事件
 * @param {*} ev 事件对象兼容处理，当事件触发时，通过事件函数的第一个参数传入
 */
function stopDefault(ev){
    var ev=ev||event;
    return ev.preventDefault?ev.preventDefault():ev.returnValue=false;
}


/**
 * 匀速运动框架
 * @param {*} obj 进行运动的元素
 * @param {*} attr obj进行运动的属性
 * @param {*} target 运动的目标值
 * @param {*} step 运动的步长
 */
function linearMove(obj,attr,target,step){
    clearInterval(timer);//清除定时器，防止定时器叠加
    step=parseInt(getStyle(obj,attr))>target?-step:step;//step正负，如果当前元素的获取的属性值大于目标值则往反方向
    timer=setInterval(function(){
        var cur=parseInt(getStyle(obj,attr));//定时器开启求这次的当前值(上次累加后的值）
        var speed=cur+step//此次要走的距离
    //边界判定 步长为负同时此次要走的距离大于目标值，则把speed设为目标值
        if(step<0&&speed<=target||step>0&&speed>=target){
            speed=target;
        }
        obj.style[attr]=speed+'px';
    },30)
}
/**
 * 缓冲运动框架
 * @param {*} el 进行运动的元素
 * @param {*} obj 需要进行运动（变化）的属性对象，是键值对（属性1：目标值1....)
 * @param {*} fn 回调函数
 * 
 *  对象的遍历：var obj={
        name:12,
        age:13,
        sex:"man"
        }
    for(var attr in obj){
       console.log(attr);//name age sex属性
        console.log(obj[attr]);//12 13 man值
    }
 *
 */
function bufferMove(el,obj,fn){
    clearInterval(el.timer);
    el.timer=setInterval(function(){
        var flag=true;//假设都已达到目标值
        for(var attr in obj){
            if(attr=="opacity"){//判断是否是透明度
                var cur=Math.round(getStyle(el,attr)*100);//把透明度放大十倍
            }else{
                var cur=parseInt(getStyle(el,attr));//取得当前值
            }
            var speed=(obj[attr]-cur)/10;//速度=（目标值-当前值）/(6-10)
            speed=speed>0?Math.ceil(speed):Math.floor(speed);//速度正值向上取整，负值向下取整
            if(cur!=obj[attr]){//如果有未达到目标值的属性，就将flag置为false
                flag=false;
            }
            if(attr=='opacity'){//如果该属性是透明度，赋值是分为标准浏览器和IE浏览器
                el.style.opactiy=(cur+speed)/100;//标准浏览器
                el.style.filter='alpha(opacity='+ cur+speed+')';//IE浏览器
            }else{
                el.style[attr]=cur+speed+'px';
            }
            if(flag){//如果所有属性都已到达目标值则停止定时器，如果有回调函数就执行回调函数
                clearInterval(el.timer);
                fn&&fn.call(el);
            }
        }
    },30)
}
/**
 * 
 * @param {*} method ajax的请求方法
 * @param {*} url 请求的url
 * @param {*} data 数据
 * @param {*} success 成功的回调
 */
//  function ajax1(method,url,data,success){
//             var oAjax=new XMLHttpRequest();
//             data=data||" ";
//             if(method.toLowerCase()=="get"){
//                 url+="?"+data;
//                 oAjax.open('get',url,true);
//                 oAjax.send();
//             }else if(method.toLowerCase()=="post"){
//                 oAjax.open('post',url,true);
//                 oAjax.setRequestHeader("content-type","application/x-www-form-urlendconde");
//                 oAjax.send(data);
//             }
//             oAjax.onreadystatechange=function(){
//                 if(oAjax.readyState==4){
//                     if(oAjax.status==200){
//                     success&&success(oAjax.responseText);
//                     }else{
//                         alert("error:"+oAjax.status)
//                     }
//                 }     
//             }
//         }


    /**
     * ajax的封装函数
     * @param {*} obj {
     * method:ajax方法（get或post）,
     * url:服务器地址接口或API,
     * data:发生的数据，默认为'',
     * success:获取数据成功的回调函数
     * }
     */
    function ajax(obj){
        //判断是否有数据，默认为空
        obj.data=obj.data||"";
        //创建ajax对象
        var oAjax=new XMLHttpRequest();
        //根据传入的是get还是post分别进行操作
        if(obj.method.toLowerCase()=="get"){
            //get方法要将参数连接在url后面
            obj.url+='?'+obj.data;
            //设置方法及url，第三个参数是是否异步，默认是异步
            oAjax.open('get',obj.url,true);
            // 发送请求
            oAjax.send();

        }else if(obj.method.toLowerCase()=="post"){
            oAjax.open('post',obj.url,true);
            // 设置请求头
            oAjax.setRequestHeader("content-type","application/x-www-form-urlencoded");
            // 发送请求数据作为参数传入
           oAjax.send(obj.data);

        }
       oAjax.onreadystatechange=function(){
            if(oAjax.readyState==4){//ajax状态码
                if(oAjax.status==200){//HTTP状态码
                    obj.success&&obj.success(oAjax.responseText)//回调函数，如果有就执行，如果没有就啥也不干
                }else{
                    alert('error:' + oAjax.status);
                }
            }
        }
    }

    return {
        'getStyle' : getStyle,
        'formDate' : formDate,
        'randomVeri' : randomVeri,
        'createEl' : createEl,
        'bindEvent' : bindEvent,
        ' removeEvent' : removeEvent,
        'stopBublle' :stopBublle,
        'stopDefault' : stopDefault,
       ' linearMove':linearMove,
        'bufferMove' : bufferMove,
        'ajax' : ajax
    }

})()





