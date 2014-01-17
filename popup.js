
// Run our kitten generation script as soon as the document's DOM is ready.
// document.addEventListener('DOMContentLoaded', function () {
//   // kittenGenerator.requestKittens();
// });

function TiddlyChrome() {
   TiddlyChrome.baseURL = 'http://boycook.tiddlyspace.com';
   TiddlyChrome.spaceName = localStorage["space"];
}

TiddlyChrome.saveTiddler = function() {
   // var space = new Space(baseURL, spaceName, this);
   var tiddler = TiddlyChrome.readTiddler();
   console.log(tiddler);
   TiddlyChrome.putTiddler(tiddler);
};

TiddlyChrome.readTiddler = function() {
   var typeElem = document.getElementById('type');
   var type = typeElem.options[typeElem.options.selectedIndex].value;

   var tiddler = {};
   tiddler.title = document.getElementById('title').value;
   tiddler.text = document.getElementById('text').value;
   tiddler.tags = document.getElementById('tags').value;
   tiddler.type = type;
   tiddler.bag = TiddlyChrome.spaceName + '_' + 'public';
   return tiddler;
};

TiddlyChrome.putTiddler = function(tiddler) {
   var callBack = function() {
      if (xhr.readyState == 4) {
         console.log(xhr.responseText);
      }
   };
   TiddlyChrome.doAjax(TiddlyChrome.baseURL + '/bags/' + tiddler.bag + '/tiddlers/' + tiddler.title,
                       'PUT', tiddler, callBack);   
};

TiddlyChrome.doAjax = function(url, method, data, callBack) {
   var xhr = new XMLHttpRequest();
   xhr.open(method, url, true);
   xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   xhr.onreadystatechange = callBack;
   xhr.send(JSON.stringify(data));   
};

var app = new TiddlyChrome();
document.getElementById('save').onclick = TiddlyChrome.saveTiddler;

