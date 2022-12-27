showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let obj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesObj.push(obj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addTxt.value = "";

  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="noteCard card ml-5 mb-4" style="width: 18rem; border-color: grey; border-width: 4px; border-radius: 10px; background-color:rgb(19, 18, 18)">
    <div class="card-body">
    <h5 style="color: white">  ${index + 1}.</h5>
        <h4 class="mb-3" style="color: lightgrey" contenteditable> <u class="mr-2">Title: </u>${
          element.title
        }</h4>
        <h5 class="card-text" style="color: lightgrey" contenteditable><u class="mr-2">Note: </u>${
          element.text
        }</h5>
        <button id="${index}"onclick="deleteNote(this.id)" class="btn" style="border-color: lightgrey; border-width: 2px; color: lightgrey"><b>Delete</b> <i class="fa fa-trash ml-2 "></i></button>
    </div>
</div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<i style="color: lightgrey">Add your first note!</i>`;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();

  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/
