// Saves options to localStorage.
function save_options() {
   var space = document.getElementById("space").value;
   localStorage["space"] = space;
   var privacy = document.querySelector('input[name="privacy"]:checked').value;
   localStorage["privacy"] = privacy;
}

// Restores select box state to saved value from localStorage.
function restore_options() {
   restore_space();
   restore_privacy();
}
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
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
