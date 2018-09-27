$.ajax({
    url:'http://www.wengwenglove.com/home/set/getOptions',
    type:'POST',
    success:function(res){
        if(res.data.code == 200){
            console.log(res.data.data)
        }
    }
})