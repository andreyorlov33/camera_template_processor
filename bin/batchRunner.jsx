#include "json2.js";

function loadJSON(json_path) {
    var jsonFile = new File(json_path);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

(function start() {
    try {
        var script = new File($.fileName).toString();
        var script_name = script.split('/').pop()
        var template = script.split(script_name).shift()+'camera_tempalte_24x12_2688x5401.tif'
        var input = script.split('bin').shift()+'input/'
        var json = script.split(script_name).shift()+'files.json'
       
        var files = loadJSON(json)
        var AIFile = new File(template)
        app.open(new File(AIFile))
        var path_items = app.activeDocument.pathItems.length
   
        for(var i = 0 ; i < files.length ; i ++){
          var chunk = new File(input+files[i].name)
           app.open(new File(chunk))
           app.doAction("select_and_copy", "camera_compositor.atn")
           app.documents[1].close(SaveOptions.DONOTSAVECHANGES)
           app.activeDocument = app.documents[0]
           app.activeDocument.pathItems[i].makeSelection()
           app.activeDocument.paste()
           app.activeDocument.flatten()
        }  

        
    }
    catch(e){
        alert(e)
    }
})()     