const createNoteModal = document.querySelector(".btnCta")
const closeBtn = document.querySelector(".crossIcon");
const noteSbmtBtn = document.querySelector(".crtBtn");
const modal = document.querySelector(".createModal");
const dispModal = document.querySelector(".displayModal");
const overlay = document.querySelector(".overlay");
const notesSection = document.querySelector(".notes");
const form = document.querySelector(".form");
const clearBtn = document.querySelector(".btnClear");
const saveBtn = document.querySelector(".saveBtn")
const dispForm = document.querySelector(".dispForm");


displayNote();

function truncateString(string, maxLength) {
  if (string.length < maxLength){
    return string
  }
  return string.substring(0, maxLength) + "...";
}

function saveTheEdit(key,value){
  let data = localStorage.getItem(key);
  if (data != null){
    let note = JSON.parse(data);
    note.note = value;
    localStorage.setItem(key,JSON.stringify(note));
  }

}


document.body.addEventListener("click", function(e) {
  if (e.target.className =="delBtn fas fa-trash-alt fa-lg"){
    deleteNote(e.target)
  }

  if (e.target.className =="noteOverlay"){
    
    dispModal.style.display = "flex";
    const title = document.querySelector(".dispTitle");
    const date = document.querySelector("#dispDate")
    const author = document.querySelector("#dispAuthor")
    const note = document.querySelector(".dispNote")
    let id = e.target.parentElement.id;
    let detail = localStorage.getItem(id)
    detail = JSON.parse(detail);
    dispForm.addEventListener("submit",function(){
      saveTheEdit(id,note.value)
    })
    title.innerText = detail.title;
    date.innerText = detail.date;
    author.innerText = detail.author;
    note.innerHTML = detail.note;
    overlay.style.display = "block";
  }

  
})

function clearNotes() {
  localStorage.clear();
  notesSection.innerText = "";
}

clearBtn.addEventListener("click", clearNotes);


function deleteNote(target){
  console.log(target.parentElement.getAttribute("id"));
  localStorage.removeItem(target.parentElement.getAttribute("id"));
  notesSection.removeChild(target.parentElement);
}

createNoteModal.addEventListener("click", function (e) {
  e.preventDefault()
  modal.classList.add("show")
  overlay.style.display = "block"
  closeBtn.addEventListener("click", closeModal);
})



function closeModal(){
  modal.classList.remove("show")
  overlay.style.display = "none";
  
}

function addToLocalStorage(note, id) {
  localStorage.setItem(id, JSON.stringify(note))
}

function listDownLocalStorage() {
  let values = [];
  let keys = Object.keys(localStorage);
  i = keys.length;
  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values;
}

function displayNote() {
  let notes = listDownLocalStorage();
  notes.map(function (note) {
    let noteObj = JSON.parse(note)
    let noteDiv = document.createElement("div")
    noteDiv.classList.add("note")
    noteDiv.setAttribute("id", noteObj.noteId)
    noteDiv.innerHTML = `
    <div class="dateDiv">
      <p class="infoTxt">${noteObj.date}</p>
    </div>
    <div class="titleDiv">
      <p class="title">${truncateString(noteObj.title,15)}</p>
    </div>
    <div class="contentDiv">
      <p class="regularTxt">${truncateString(noteObj.note,188)}</p>
    </div>
    <div class="authorDiv">
      <p class="infoTxt">${noteObj.author}</p>
    </div>
    <i class="delBtn fas fa-trash-alt fa-lg"></i>
    <div class="noteOverlay"></div>
    `
    notesSection.appendChild(noteDiv);
    form.reset();
  })

}
noteSbmtBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let note = document.querySelector("#note").value;
  let author = document.querySelector("#author").value;
  let keys = Object.keys(localStorage);
  let noteId = "note" + keys.length;
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");
  let date = `On ${year}-${month}-${day}`
  console.log(date)
  let notes = {
    date:date,
    title: title,
    note: note,
    author:author,
    noteId: noteId
  }
  addToLocalStorage(notes, noteId)
  location.reload()
})



