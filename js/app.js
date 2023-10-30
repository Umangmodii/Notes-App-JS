showNotes();
let addBtn = document.getElementById("addBtn");
let cancelBtn = document.getElementById("cancelBtn");

cancelBtn.addEventListener('click', function(e) {
  e.preventDefault()
  document.getElementById("addTxt").value = '';
  document.querySelector("input[name='key']").value = '';
  document.getElementById("addBtn").innerText = "Add Note"
})
addBtn.addEventListener('click', function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let key= document.querySelector("input[name='key']")
  if(addTxt.value == "")
  return false;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if(key.value == ""){
    notesObj.push(addTxt.value);
  }else{
    if(!!notesObj[key.value]){
      notesObj[key.value] = addTxt.value
    }
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  // console.log(notesObj);
  document.getElementById("addBtn").innerText = "Add Note"
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
    html += `<div class="card noteCard m-2 shadow-sm rounded-0" >
              <div class="card-body">
                <h5 class="card-title">Note ${index + 1} </h5>
                <p class="card-text"> ${element} </p>
                <div class="text-center">
                  <button data-id='${index}' onClick="editNote(this.getAttribute('data-id'))" class="btn btn-primary  btn-sm rounded-0">Edit</button>
                  <button id='${index}' onClick="deleteNote(this.id)" class="btn btn-sm rounded-0 btn-danger">Delete</button>
                </div>
               </div>
             </div>`
  });
  let noteElm = document.getElementById("notes");
  if (notesObj.length!=null) {
    noteElm.innerHTML = html;
  }else{
    noteElm.innerHTML = 'No Notes is there, Please add Note....'; 
  }
}
//fuction to delete a note 
function deleteNote(index) {
  if(confirm("Are you sure to delete this note ?") === false)
  return false;
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index,1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
function editNote(index){
  var key = document.querySelector("input[name='key']")
  var note = document.querySelector("#addTxt")
  key.value = index
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if(!!notesObj[index])
  note.value = notesObj[index];
  document.getElementById("addBtn").innerText = "Update Note"
  document.querySelector("html, body").scrollTop = 0

}
//function to filter in search bar
let search = document.getElementById("searchTxt");
search.addEventListener('input', function() {
    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element) {
      let cardTxt = (element.getElementsByTagName("p")[0].innerText).toLowerCase();
      console.log(cardTxt)
      if (cardTxt.includes(inputVal) === true) {
        element.style.display ='block';
      } else {
        element.style.display ='none';
      }
    }); 
});