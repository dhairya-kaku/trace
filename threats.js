// Go to another page
function goTo(page) {
  window.location.href = page;
}

// Show or hide a box when you click
function toggle(id) {
  var box = document.getElementById(id);
  if (box.style.display === "block") {
    box.style.display = "none";
  } else {
    box.style.display = "block";
  }
}
