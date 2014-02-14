// Run our kitten generation script as soon as the document's DOM is ready.
// document.addEventListener('DOMContentLoaded', function () {
//   // kittenGenerator.requestKittens();
// });

function TiddlyChrome() {
    TiddlyChrome.spaceName = localStorage["space"];
    TiddlyChrome.baseURL = 'http://' + TiddlyChrome.spaceName + '.tiddlyspace.com';
    // add listener for msgs from page
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          sendResponse({success: TiddlyChrome.populateFields(request)});
        }
    );
    // inject and execute script onto page
    chrome.tabs.executeScript({ file: 'inject.js' });
    TiddlyChrome.displayDefaults();
}

TiddlyChrome.displayDefaults = function() {
    privacy = document.getElementsByName("privacy");
    for(var i=0; i < privacy.length; i++) {
        if(localStorage["privacy"] && privacy[i].value == localStorage["privacy"]) {
            privacy[i].checked = true;
            break;
        }
    }
    if(localStorage["tags"]) {
        document.getElementById("tags").value = localStorage["tags"];
    }
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

    var tiddler = {},
        privacy = document.querySelector('input[name="privacy"]:checked').value;
    // in milliseconds so should be unique enough
    tiddler.title = Date.now();
    tiddler.text = document.getElementById('quote').getElementsByClassName("text")[0].innerHTML;
    tiddler.tags = TiddlyChrome.stringToTags( document.getElementById('tags').value );
    tiddler.type = type;
    tiddler.fields = {};
    tiddler.fields['url'] = document.getElementById('quote').getElementsByClassName("url")[0].innerHTML;
    tiddler.bag = TiddlyChrome.spaceName + '_' + privacy;
    return tiddler;
};

TiddlyChrome.putTiddler = function(tiddler) {
    var callBack = function() {
        // 4 = done
        if (this.readyState == 4) {
            // to do: make user aware tiddler has been saved successfully
            window.close();
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

TiddlyChrome.stringToTags = function(tagString) {
    var brackets = /^\s*\[\[([^\]\]]+)\]\](\s*.*)/,
        whitespace = /^\s*([^\s]+)(\s*.*)/,
        match,
        rest = tagString,
        tags = [];

    match = brackets.exec(rest) || whitespace.exec(rest);
    while (match) {
        tags.push(match[1]);
        rest = match[2];
        match = brackets.exec(rest) || whitespace.exec(rest);
    }
    return tags;
};

TiddlyChrome.populateFields = function(data) {
    document.getElementById('quote').getElementsByClassName("text")[0].innerHTML = data.selection;
    document.getElementById('quote').getElementsByClassName("url")[0].innerHTML = data.url;
    return "true";
};

var app = new TiddlyChrome();
document.getElementById('save').onclick = TiddlyChrome.saveTiddler;
