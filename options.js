function Option(name, selector, type) {
    this.name = name;
    this.selector = selector;
    this.type = type;
}

// should handle no choice better (defaults...)
Option.prototype.save = function() {
    localStorage[this.name] = document.querySelector(this.selector).value;
};

Option.prototype.restore = function() {
    this.value = localStorage[this.name];
    if (!this.value) {
        return;
    }
    if(this.type === "radio") {
        document.querySelector("#" + this.value).checked = true;
    } else {
        document.querySelector(this.selector).value = this.value;
    }
};

(function() {
    var options = [
        new Option("type", "#type", "select"),
        new Option("tags", "#tags", "input"),
        new Option("space", "#space", "input"),
        new Option("privacy", 'input[name="privacy"]:checked', "radio")
    ];

    function restore_options() {
       options.forEach(function(el, ind, arr){
           el.restore();
       });
    }

    function save_options() {
       options.forEach(function(el, ind, arr){
           el.save();
       });
    }
    
    document.addEventListener('DOMContentLoaded', restore_options);
    document.querySelector('#save').addEventListener('click', save_options);
}());
