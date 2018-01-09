$({start:0}).animate({start:100},{
    duration:5000,
    step:function(e){
        $("div").css({"width":e})
    }
})
