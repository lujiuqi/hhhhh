(function(){
    //数据渲染
    tool.ajax({
        method:'get',
        url:'./data/banner.json',
        success:function(res){
            var data=JSON.parse(res);
            // console.log(data);
            banner(data);
        }
    })
    function banner(arr){
        var oBanner=document.getElementById("banner");
        var oCon=oBanner.getElementsByClassName("con")[0];
        var oUl=oCon.getElementsByTagName("ul")[0];
        var oPre=oCon.getElementsByClassName("pre")[0];
        var oNext=oCon.getElementsByClassName("next")[0];
        var oP=oBanner.getElementsByTagName("P")[0];
        var timer=null;
        var n=0;
        for(var i=0;i<arr.length;i++){
            oUl.innerHTML+=' <li><img src="'+arr[i]+'" alt=""></li>';
            oP.innerHTML+='<span></span>';
        }
        oUl.innerHTML+=' <li><img src="'+arr[0]+'" alt=""></li>';
        var aSpan=oP.getElementsByTagName("span");
        aSpan[0].className="on";
    //计算ul的宽
        var iw=oUl.children[0].offsetWidth;
        var len=oUl.children.length;//li的个数
        oUl.style.width=len*iw+'px';
        oNext.onclick=function(){
            play();
        }
        function play(){
            n++;
            if(n>len){
                n=1;
                oUl.style.left=0;
            }
            tool.bufferMove(oUl,{left:-n*iw});
            for(var i=0;i<aSpan.length;i++){
                aSpan[i].className="";
            }
            if(n==len-1){
                aSpan[0].className="on";
            }else{
                aSpan[n].className="on";
            }
        }
        oPre.onclick=function(){
            n--;
            if(n<0){
                n=len-2;
                oUl.style.left=-iw*(len-1)+'px';
            }
            tool.bufferMove(oUl,{left:-n*iw});
            for(var i=0;i<aSpan.length;i++){
                aSpan[i].className="";
            }
            aSpan[n].className="on";
        }
        timer=setInterval(function(){
            play();
        },2000);
        oBanner.onmouseenter=function(){
            oNext.style.display="block";
            oPre.style.display="block";
            clearInterval(timer);
        }
        oBanner.onmouseleave=function(){
            oNext.style.display="none";
            oPre.style.display="none";
            timer=setInterval(function(){
                play();
            },2000);
        }
        for(var i=0;i<aSpan.length;i++){
            aSpan[i].index=i;
            aSpan[i].onclick=function(){
                if(n==len-1){
                    n=0;
                    oUl.style.left=0;
                }
                for(var i=0;i<aSpan.length;i++){
                    aSpan[i].className="";
                }
                n=this.index;
                this.className="on";
                tool.bufferMove(oUl,{left:-n*iw});
            }
        }
    

    }
      //直播课程
//    var limage=document.getElementById("limage");
//    var image=limage.getElementsByTagName("img")[0];
//    var lSpan=limage.getElementsByTagName("span")[0];
//    var rlist=document.getElementById("r-list");
//    var aLi=rlist.getElementsByTagName("li");
//    var la=rlist.getElementsByTagName("a");
   tool.ajax({
    method:'get',
    url:'./data/hot.json',
    success:function(res){
        var data=JSON.parse(res);
        // console.log(data);
        hotlesson(data);
    }
   })

   function hotlesson(arr){
        var limage=document.getElementById("limage");
        var image=limage.getElementsByTagName("img")[0];
        var lSpan=limage.getElementsByTagName("span")[0];
        var rlist=document.getElementById("r-list");
        var aLi=rlist.getElementsByTagName("li");
        var la=rlist.getElementsByTagName("a");

        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onmouseenter=function(){
             for(var i=0;i<aLi.length;i++){
                 aLi[i].className="";
             }
             this.className="on";
             lSpan.innerHTML=la[this.index].innerHTML;
             lSpan.style.color="#fff"
             image.src=arr[this.index];
            }
        }
   }
  


    //获取课程数据
    tool.ajax({
       method:'get',
        url:'./data/lessonContent.json',
        success:function(res){
            var data=JSON.parse(res).goodLesson;
            // console.log(data);
            tablesson(data);

        }
    })
    function tablesson(obj){
        console.log(obj);
        var oLes=document.getElementById("lessons");
        var aList=document.getElementById("list").getElementsByTagName("li");
        var oUl=oLes.getElementsByClassName("content")[0].getElementsByTagName("ul")[0];
        // console.log(aList,oUl);
        showlesson(obj.onlineSell);
        for(var i=0;i<aList.length;i++){
            aList[i].index=i;
            aList[i].onmouseenter=function(){
                for(var i=0;i<aList.length;i++){
                    aList[i].className='';
                }
                this.className='on';
                switch(this.index){
                    case 0:
                        showlesson(obj.onlineSell);
                        break;
                    case 1:
                        showlesson(obj.styleDesign);
                        break;
                    case 2:
                        showlesson(obj.web);
                        break;
                    case 3:
                        showlesson(obj.program);
                        break;
                    case 4:
                        showlesson(obj.office);
                        break;
                }

            }
        }
        function showlesson(arr){
            oUl.innerHTML='';
            for(var i=0;i<arr.length;i++){
                oUl.innerHTML+='<li> <img src="'+ arr[i].img+'" alt=""> <p>'+arr[i].title+'</p> <span>￥1880</span>'+
                '<i>35课时</i></li>'
            }
          
    
        }
    }
 //免费课程
 tool.ajax({
     method:'get',
     url:'./data/lessonContent.json',
     success:function(res){
         var data=JSON.parse(res).freeLesson;
         console.log(data);
         freelesson(data);
     }
 })
 function freelesson(obj){
     console.log(obj,2);
     var free=document.getElementById("free");
     var fLi=document.getElementById("flist").getElementsByTagName("li");
     var fUl=free.getElementsByClassName("content")[0].getElementsByTagName("ul")[0];
    //  console.log(free,fLi,fUl,4);
     flesson(obj.internetSell);
     for(var i=0;i<fLi.length;i++){
         fLi[i].index=i;
         fLi[i].onmouseenter=function(){
            for(var i=0;i<fLi.length;i++){
                fLi[i].className="";
            }
            this.className='on';
            switch(this.index){
                case 0:
                    flesson(obj.internetSell);
                    break;
                case 1:
                    flesson(obj.design);
                    break;
                case 2:
                    flesson(obj.web);
                    break;
                case 3:
                    flesson(obj.java);
                    break;
            }

         }
     }
     function flesson(arr){
        fUl.innerHTML='';
        for(var i=0;i<arr.length;i++){
            // console.log(arr[i].img,5);
            fUl.innerHTML+='<li> <img src="'+ arr[i].img+'" alt=""> <p>'+arr[i].title+'</p> <span>￥1880</span>'+
            '<i>35课时</i></li>'
        }
      

    }
 }
//就业面授班
tool.ajax({
    method:'get',
    url:'./data/lessonContent.json',
    success:function(res){
        var data=JSON.parse(res).jobLesson;
        console.log(data,10);
        joblesson(data);
    }
})
function joblesson(obj){
    console.log(obj,2);
    var oJob=document.getElementById("job");
    var jLi=document.getElementById("jlist").getElementsByTagName("li");
    var jUl=oJob.getElementsByClassName("content")[0].getElementsByTagName("ul")[0];
    console.log(oJob,jLi,jUl,9);
    job(obj.design);
    for(var i=0;i<jLi.length;i++){
        jLi[i].index=i;
        jLi[i].onmouseenter=function(){
            for(var i=0;i<jLi.length;i++){
                jLi[i].className="";
            }
            this.className="on";
            switch(this.index){
                case 0:
                job(obj.design);
                break;
                case 1:
                job(obj.web);
                break;
                case 2:
                   job(obj.web);
                    break;
                case 3:
                    job(obj.java);
                    break;
            }

        }

    }
    function job(arr){
        jUl.innerHTML='';
        for(var i=0;i<arr.length;i++){
            console.log(arr[i].img,5);
            jUl.innerHTML+='<li> <img src="'+ arr[i].img+'" alt=""> <p>'+arr[i].title+'</p> <span>￥1880</span>'+
            '<i>35课时</i></li>'
        }

    }
}
var first=document.getElementsByClassName("first")[0];

first.onmouseenter=function(){
    console.log(1211111111111111);
    first.style.borderColor="salmon";
}
first.onmouseleave=function(){
    first.style.borderColor="#ccc";
}
var second=document.getElementsByClassName("second")[0];
second.onmouseenter=function(){
    second.style.borderColor="#1A84F0";
}
second.onmouseleave=function(){
    second.style.borderColor="#ccc";
}
var third=document.getElementsByClassName("third")[0];
third.onmouseenter=function(){
    third.style.borderColor="#9750f8";
}
third.onmouseleave=function(){
    third.style.borderColor="#ccc";
}



})()