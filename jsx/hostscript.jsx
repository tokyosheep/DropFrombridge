function process(obj){
    for(var i=0;i<obj.files.length;i++){
        try{
            var f = new File(obj.files[i]);
            app.open(f);
            doAction(obj.action[1],obj.action[0]);
        }catch(e){
            alert(e);
            continue
        }
    }
}