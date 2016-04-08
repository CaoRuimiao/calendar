$(function(){
    $('.dateBox').mousedown(function(e){
        e.preventDefault();
    });
    var date=new Date();
    var todayStyle=date.getFullYear()+'-'+Number(date.getMonth()+1)+'-'+date.getDate();
    var jinYM=date.getFullYear()+'-'+Number(date.getMonth()+1);
    var jinRi=date.getDate();
    var title=date.getFullYear()+'年'+Number(date.getMonth()+1)+'月';
    $('.dateBox .top .title').html(title);
    $('.dateBox .message span').html('今天：'+title+date.getDate()+'日');
    var everyMonthCount=[31,28,31,30,31,30,31,31,30,31,30,31];

    // 判断是不是闰年
    var isLeapYear=function(year){
        if(year%4==0&&year%100!=0||year%400==0){
            return true;
        }else{
            return false;
        }
    }
    // 在日期盒子中添加元素
    var dayBox=$('.dayBox');
    // 法一：------------------
    for(var i=0;i<6;i++){    //行
        for(var j=0;j<7;j++){     // 列
            var div=$('<div>');
            div.addClass('day fl');
            div.attr('hang',i);
            div.appendTo(dayBox);
        }
    }
    for(var k=0;k<$('.day').length;k++){
        var n=$('.day').eq(k).attr('hang');
        if(k==7*n+5||k==7*n+6){
            $('.day').eq(k).addClass('red');
        }
    }
    //--法二：-----------------------------
    // for(var i = 0; i < 42; i++){
    //     var div=$('<div>');
    //     div.addClass('day fl div'+i);
    //     div.appendTo(dayBox);  
    // }
    // for(var j = 0; j < 6; j++){
    //     $('.div' +Number((j * 7) + 5)).addClass('red');
    //     $('.div' + Number((j * 7) + 6)).addClass('red');
    // }
    // ---法三：----------------------
    // ??? $(this).index() % 7 == 5
    //------------------------

    //更新页面显示
    var onDateChange=function(){
        var xx=date.getFullYear();
        var yy=date.getMonth()+1;
        var zz=date.getDate();
        $('.day').removeClass('selectDay today');
        $('#d'+zz).addClass('selectDay');
        if(xx+'-'+yy+'-'+zz==todayStyle){
            $('#d'+jinRi).removeClass('selectDay redZi').addClass('today');
        }else if(xx+'-'+yy==jinYM){
            $('#d'+jinRi).addClass('redZi');
        }
        $('.dateBox .top .title').html(xx+'年'+yy+'月');
    }
    //---------前一天------------
    //var previousDay=function(){
    //    var currentyear=date.getFullYear();
    //    var currentmonth=date.getMonth();
    //    var currentdate=date.getDate();
    //    var targetyear,targetmonth,targetdate;
    //    targetdate=currentdate-1;
    //    if(targetdate==0){
    //        targetyear=currentyear;
    //        targetmonth=currentmonth-1;
    //        if(targetmonth==-1){
    //            targetyear=currentyear-1;
    //            targetmonth=11;
    //        }
    //        if(targetmonth==1){
    //            if(isLeapYear(targetyear)){
    //                everyMonthCount[1]=29;
    //            }
    //        }
    //        targetdate=everyMonthCount[targetmonth];
    //    }else{
    //        targetmonth=currentmonth;
    //        targetyear=currentyear;
    //    }
    //    date=new Date(targetyear,targetmonth,targetdate);
    //}
    // -----------------------下一天---------
    //var nextDay=function(){
    //    var currentyear=date.getFullYear();
    //    var currentmonth=date.getMonth();
    //    var currentdate=date.getDate();
    //    var targetyear,targetmonth,targetdate;
    //    targetdate=currentdate+1;
    //    if(targetmonth==1&&isLeapYear(targetyear)){
    //        everyMonthCount[1]=29;
    //    }
    //    if(targetdate>everyMonthCount[targetmonth]){
    //        targetyear=currentyear;
    //        targetmonth=currentmonth+1;
    //        if(targetmonth==12){
    //            targetyear=currentyear+1;
    //            targetmonth=0;
    //        }
    //        targetdate=1;
    //    }else{
    //        targetmonth=currentmonth;
    //        targetyear=currentyear;
    //    }
    //    date=new Date(targetyear,targetmonth,targetdate);
    //};
    // --------前一个月---------
    var previousMonth=function(){
        var currentyear=date.getFullYear();
        var currentmonth=date.getMonth();
        var targetyear,targetmonth;
        targetmonth=currentmonth-1;
        targetyear=currentyear;
        // 跨年
        if(targetmonth==-1) {
            targetyear = currentyear - 1;
            targetmonth = 11;
        }
        date=new Date(targetyear,targetmonth);
    }
    // --------后一个月------------
    var nextMonth=function(){
        var currentyear=date.getFullYear();
        var currentmonth=date.getMonth();
        var targetyear,targetmonth;
        targetmonth=currentmonth+1;
        targetyear=currentyear;
        // 跨年
        if(targetmonth==12){
            targetyear=currentyear+1;
            targetmonth=0;
        }
        date=new Date(targetyear,targetmonth);
    };
    // 画日历

    var drawDate=function(){
        var i=0;
        var L,prevMonthCount;
        var tmp=date.getDate();
        date.setDate(1);
        var xingqi=date.getDay();
        date.setDate(tmp);
        L=xingqi==0?6:xingqi-1;
        // 画日历时，如果是闰年，则二月天数为29；否则，二月天数为28；
        if(isLeapYear(date.getFullYear())){
            everyMonthCount[1]=29;
        }else{
            everyMonthCount[1]=28;
        }
        //跨年
        if(date.getMonth()-1==-1){
            prevMonthCount=31;
        }else{
            prevMonthCount=everyMonthCount[date.getMonth()-1];
        }
        // 画前一个月
        for(;i<L;i++){
            $('.day').eq(i).html(prevMonthCount-(L-i-1));
            $('.day').eq(i).removeAttr('id').addClass('prevMDay').attr('pr',true);
        }
        // 画当月的
        for(;i<everyMonthCount[date.getMonth()]+L;i++){
            $('.day').eq(i).html(i-L+1);
            $('.day').eq(i).attr('id','d'+(i-L+1));
            $('.day').eq(i).removeClass('redZi prevMDay nextMDay');
            $('.day').eq(i).removeAttr('pr nx');
        }
        // -----画下一个月的
        var D=i;
        for(;i<$('.day').length;i++){
            $('.day').eq(i).html(i-D+1);
            $('.day').eq(i).removeAttr('id').addClass('nextMDay').attr('nx',true);
        }
    }
    drawDate();
    onDateChange();

    $('.prev').click(function(){
        //previousDay();
        previousMonth();
        drawDate();
        onDateChange();
    });
    $('.next').click(function(){
        //nextDay();
        nextMonth();
        drawDate();
        onDateChange();
    });
    //  --------------点击切换日历---------------
    $('.day').click(function(){
        var x,y,z;
        var a=date.getFullYear();
        var b=date.getMonth();
        if(this.hasAttribute('id')){  //当月
            date.setDate(this.innerHTML);
            onDateChange();
        }else if(this.hasAttribute('pr')){
            z=Number(this.innerHTML);
            y=b-1;
            x=a;
            if(y==-1){
                x=a-1;
                y=11;
            }
            date=new Date(x,y,z);
            drawDate();
            onDateChange();
        }else if(this.hasAttribute('nx')){
            z=Number(this.innerHTML);
            y=b+1;
            x=a;
            if(y==12){
                x=a+1;
                y=0;
            }
            date=new Date(x,y,z);
            drawDate();
            onDateChange();
        }
    });
    // ---------前往今天
    $('.back').click(function(){
        date=new Date();
        drawDate();
        onDateChange();
    });









})