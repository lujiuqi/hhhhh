(function(){
    var vBox=document.getElementById("video");
    var oVideo=vBox.getElementsByTagName("video")[0];
    var contrl=document.getElementById("contrl");
    var vBtn=contrl.getElementsByTagName("a");
    var vSpan=contrl.getElementsByTagName("span");
    var progress=document.getElementById("progress");
    var pDiv=progress.getElementsByTagName("div")[0];
    function formatTime(time){
        var h=parseInt(time/3600);
        var m=parseInt(time%3600/60);
        var s=parseInt(time%60);
        h=h<10?'0'+h:h;
        m=m<10?'0'+m:m;
        s=s<10?'0'+s:s;
        return h+":"+m+":"+s;
    }
    oVideo.oncanplay=function(){
        vSpan[2].innerHTML=formatTime(this.duration);
    }
    vBtn[0].onclick=function(){
        if(oVideo.paused){
            oVideo.play();
            this.innerHTML="||";
        }else{
            oVideo.pause();
            this.innerHTML="◀"
        }
    }
    oVideo.ontimeupdate=function(){
        vSpan[0].innerHTML=formatTime(this.currentTime);
        var scale=this.currentTime/this.duration;
        pDiv.style.width=scale*progress.offsetWidth+'px';
        // console.log(pDiv.style.width);

    }
    progress.onmousedown=function(ev){
        var ev=ev||event;
        iw=ev.offsetX;
        var scale=iw/this.offsetWidth;
        pDiv.style.width=iw+'px';
        oVideo.currentTime=scale*oVideo.duration;
    }
    oVideo.onended=function(){
        vBtn[0].innerHTML="◀"

    }
    var vol=oVideo.volume*100;
    // console.log(vol);
    vBtn[2].onclick=function(){
        vol-=10;
        if(vol<=0){
            vol=0;
        }
        oVideo.volume=vol/100;
    }
    vBtn[1].onclick=function(){
        vol+=10;
        if(vol>=100){
            vol=100;
        }
        oVideo.volume=vol/100;
    }
    vBox.onmouseleave=function(){
        contrl.style.bottom="-30px";
    
    }
    vBox.onmouseenter=function(){
        contrl.style.bottom="0"; 
    }
    var vflag=true;
    var timer=null;
    vBtn[3].onclick=function(){
        if(vflag){
            vBox.requestFullscreen();
            vBox.onmousemove=function(ev){
                clearTimeout(timer);
                var ev=ev||event;
                var odre=ev.offsetX+ev.offsetY;//相对于带有定位的父盒子的x，y坐标
                vBox.style.cursor="default";
                contrl.style.bottom="0px";
                // console.log(odre);
                timer=setTimeout(function(){
                    var ndre=ev.offsetX+ev.offsetY;
                    // console.log(ndre,odre);
                    if(odre==ndre){
                        vBox.style.cursor="none";
                        contrl.style.bottom="-30px";
                    }else{
                        console.log(123456789);
                    }
                },5000);
            }
        }else{
        document.webkitCancelFullScreen();
        vBox.onmousemove=null;
        clearTimeout(timer);
        }
        vflag=!vflag;
    }

//播放列表
tool.ajax({
    method:'get',
    url:'./data/playList.json',
    success:function(res){
        // console.log(res);
        var data=JSON.parse(res);
        // console.log(data);
        playlist(data);
    }
})
function getTop(el){
    var iTop=0;
    while(el.offsetParent){
        iTop=el.offsetTop;
        el=el.offsetParent;
    }
    return iTop;
}
function playlist(arr){
    var contentlist=document.getElementsByClassName("contentlist")[0];
    var pUl=contentlist.getElementsByTagName("ul")[0];
    var lessonc=document.getElementById("lessonc");

    //把数据放进列表
    for(var i=0;i<arr.length;i++){
        
        pUl.innerHTML+='<li _src="'+arr[i].src+'">'+ arr[i].title+'</li>';
       
    }
    var pLi=pUl.getElementsByTagName("li");
    for(var i=0;i<pLi.length;i++){
       pLi[i].onclick=function(){
        oVideo.src=this.getAttribute("_src");
        vBtn[0].innerHTML="◀" ;
        pDiv.style.width="0";
        lessonc.innerHTML=this.innerHTML;
       }
    } 
    //自定义滚动条的移动
    var scrollbar=document.getElementsByClassName("scrollbar")[0];
    var sBtn=scrollbar.getElementsByTagName("a");
    var bar=document.getElementById("bar");//滑块外边的条
    var slider=document.getElementById("slider");//滑块
    var disY=0;
    //滚动条的移动函数
    function sliderMove(t){
        if(t<=0){
            t=0;
        }else if(t>=bar.offsetHeight-slider.offsetHeight){//运动的总距离
            t=bar.offsetHeight-slider.offsetHeight;
        }
        slider.style.top=t+'px';
        var scale=t/(bar.offsetHeight-slider.offsetHeight);
        // console.log(pUl.offsetHeight-contentlist.offsetHeight);
        pUl.style.top=-scale*(pUl.offsetHeight-contentlist.offsetHeight)+'px';

    }
    // console.log(bar,slider);
    //点击滑块移动（拖拽）
    slider.onmousedown=function(ev){
        // alert(1)
        var ev=ev||event;
        disY=ev.offsetY;
        document.onmousemove=function(ev){
            var ev=ev||event;
            var  t=ev.clientY-getTop(bar)- disY;
            sliderMove(t);
        }
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null
        }
        return false;
    }
    //滚轮滚动
    function iScroll(ev){
        var ev=ev||event;
        var bdown=false;
        if(ev.wheelDelta){
            if(ev.wheelDelta<0){
                bdown=true;
            }else{
                bdown=false;
            }

        }else{
            if(ev.detail>0){
                bdown=true;
            }else{
                bdown=false;
            }

        }
        if(bdown){
            sliderMove(slider.offsetTop+20);

        }else{
            sliderMove(slider.offsetTop-20);
        }
     tool.stopDefault(ev);
    }
    tool.bindEvent(pUl,'mousewheel',iScroll);
    tool.bindEvent(pUl,'DOMMouseScroll',iScroll);
    //点击上下移动滑块
    var timer1=null;
    sBtn[0].onmousedown=function(){
        timer1=setInterval(function(){
            sliderMove(slider.offsetTop-20);
        },30)      
    }
    sBtn[0].onmouseup=function(){
       clearInterval(timer1);
    }
    sBtn[1].onmousedown=function(){
        timer1=setInterval(function(){
            sliderMove(slider.offsetTop+20);
        },30)      
    }
    sBtn[1].onmouseup=function(){
       clearInterval(timer1);
    }
    
    
}
//相关课程
tool.ajax({
    method:'get',
    url:'./data/relatedClass.json',
    success:function(res){
        
        var data=JSON.parse(res);
        console.log(data);
        relatelist(data);
    }
})
function relatelist(arr){
    var rlist=document.getElementById("rlist");
    for(var i=0;i<arr.length;i++){
        rlist.innerHTML+=' <li> <img src="'+arr[i].img+'" alt=""><p>'+arr[i].class+'</p><p id="price"><i>'+arr[i].oldPrice+'</i>    <i>'+arr[i].newPrice +'</i></p> </li>'
    }
}
//评论
tool.ajax({
    method:'get',
    url:'./data/comment.json',
    success:function(res){
        // console.log(res);
        var data=JSON.parse(res);
        console.log(data);
        commentshow(data);
    }
})
function commentshow(arr){
    var comment=document.getElementsByClassName("comment")[0];
    var cSpan=comment.getElementsByTagName("span")[0];
    var cUl=comment.getElementsByTagName("ul")[0];
    var contrlpage=document.getElementById("contrlpage");
    var cInput=contrlpage.getElementsByTagName("input");
    var cBtn=contrlpage.getElementsByTagName("button");
    var ipage=0;
    var allpage=Math.ceil(arr.length/5);
    var nowArr=[];
    cInput[1].value=allpage;
    function showdata(){
        cUl.innerHTML='';
        nowArr=[];
        for(var i=ipage*5;i<(ipage+1)*5;i++){
           if(arr[i]){
            nowArr.push(arr[i]);
           }
        }
        console.log(nowArr);
        for(var i=0;i<nowArr.length;i++){
            cUl.innerHTML+='<li class="clearfix"> <div> <img src="'+nowArr[i].src+'" alt=""><p>'+nowArr[i].name+'</p><p>'+nowArr[i].time+'</p></div><p>'+nowArr[i].comment+'</p><span> 点赞数  '+nowArr[i].line+'</span></li>';          
        }
        cInput[0].value=ipage+1; 

    }
    showdata();
     //点击确定跳转
     //判断输入的内容
     cInput[0].oninput=function(){
         var val=this.value;
         if(val<0||val>allpage||/\D/.test(val)){
             this.value=1;
         }
     }
    
     cBtn[0].onclick=function(){
         ipage=parseInt(cInput[0].value)-1;
         showdata(); 
     }
    //点击上一页跳转
    cBtn[1].onclick=function(){
        ipage--;
        if(ipage<=0){
            ipage=0;
        }   
        // cInput[0].value=ipage+1;    
        showdata();
    }
   
    //点击下一页跳转
    cBtn[2].onclick=function(){
        ipage++;
        if(ipage>=allpage-1){
            ipage=allpage-1;
        }       
        // cInput[0].value=ipage+1;
        showdata();
    }
   

   

}


})()



