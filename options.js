// Saves options to localStorage.
function save_options() {
   var space = document.getElementById("space").value;
   localStorage["space"] = space;
}

// Restores select box state to saved value from localStorage.
function restore_options() {
   var space = localStorage["space"];
   if (!space) {
      return;
   }
   document.getElementById("space").value = space;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
