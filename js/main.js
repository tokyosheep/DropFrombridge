window.onload = () =>{
    "use strict";
    const csInterface = new CSInterface();
    themeManager.init();
    const setList = document.getElementById("setList");
    const childList = document.getElementById("childList");
    
    const filePath = csInterface.getSystemPath(SystemPath.EXTENSION) +`/js/`;
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
    
    const http = require("http");
    const url = require("url");
    
    const GetAction = "GetAction.jsx";
    
    const server = http.createServer((req,res)=>{
        const url_parts = url.parse(req.url);
        switch(url_parts.pathname){
            case "/":
                if(req.method == "POST"){
                    (async ()=>{
                        const received = await receivingBody(req);
                        console.log(received);
                        PhotoshopProcess(JSON.parse(received));
                        res.end("true");
                    })();
                    break;
                }
            default:
                response.writeHead(200,{"Content-Type":"text/plain"});
                response.end("no page...");
                break;
        }
    });
    
    server.listen(8000);
                
    function receivingBody(req){
        return new Promise(resolve=>{
            let body = "";
            req.on("data",chunk=>{
                body += chunk;
            });
            req.on("end",received=>{
                resolve(body);
            });
        });    
    }
    
    class LoadingActions{
        constructor(){
            this.parent = setList;
            this.children = childList;
            this.WriteAction();
            this.parent.addEventListener("change",this);
        }
        
        
        async handleEvent(){
            const actions = await getActions();removeChildren(this.children);
            console.log(this.parent[this.parent.selectedIndex].value);
            actions[this.parent.selectedIndex].children.forEach(v=>{
                this.children.appendChild(this.setActions(v));
            });
        }
        
        async WriteAction(){
            const actions = await getActions();
            actions.forEach(v =>{
                this.parent.appendChild(this.setActions(v));
            });
            actions[0].children.forEach(v =>{
                this.children.appendChild(this.setActions(v));
            });
        }
        
        setActions(action){
            const name = decodeURI(action.name);
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            return option;
        }
        
    }
    
    const loadedActions = new LoadingActions();
    
    function getActions(){
        return new Promise(resolve=>{
                csInterface.evalScript(`$.evalFile("${extensionRoot}${GetAction}")`,(o)=>{
                const obj = JSON.parse(o);
                console.log(obj);    
                resolve(obj);    
            });
        });
    }
    
    function removeChildren(parent){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
    
    function PhotoshopProcess(received){
        const toString = Object.prototype.toString
        console.log(Array.isArray(received));
        const extensions = Array.from(document.getElementsByClassName("ext")).map(v=>{
            const obj = {};
            obj[v.id] = v.checked;
            return obj;
        });
        console.log(extensions);
        const obj = {
            action:[setList[setList.selectedIndex].value,childList[childList.selectedIndex].value],
            files:(received)
        }
        console.log(obj);
        csInterface.evalScript(`process(${JSON.stringify(obj)})`);
    }
}
