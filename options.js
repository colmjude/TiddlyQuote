// Saves options to localStorage.
function save_options() {
   var space = document.getElementById("space").value;
   localStorage["space"] = space;
   var privacy = document.querySelector('input[name="privacy"]:checked').value;
   localStorage["privacy"] = privacy;
   var tags = document.getElementById("tags").value;
   localStorage["tags"] = tags;
   var type = document.getElementById("type").value;
   localStorage["type"] = type;
}

// Restores select box state to saved value from localStorage.
function restore_options() {
   restore_space();
   restore_privacy();
   restore_tags();
   restore_type();
}
// refactor:
// would passing storage variable and UI update method work?
function restore_space() {
    var space = localStorage["space"];
    if (!space) {
        return;
    }
    document.getElementById("space").value = space;
}
function restore_privacy() {
    var privacy = localStorage["privacy"];
    if(!privacy) {
        return;
    }
    document.getElementById(privacy).checked = true;
}
function restore_tags() {
    var tags = localStorage["tags"];
    if(!tags) {
        return;
    }
    document.getElementById("tags").value = tags;
}
function restore_type() {
    var type = localStorage["type"];
    if(!type) {
        return;
    }
    document.getElementById("type").value = type;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
