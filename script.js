let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = -1;

function displayNotes() {
  const notesContainer = document.getElementById("notes");
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";

    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="editNote(${index})">Edit</button>
      <button onclick="deleteNote(${index})">Delete</button>
    `;

    notesContainer.appendChild(noteElement);
  });
}

function addNote() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Please enter both title and note.");
    return;
  }

  if (editIndex === -1) {
    notes.push({ title, content });
  } else {
    notes[editIndex] = { title, content };
    editIndex = -1;
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  displayNotes();
}

function editNote(index) {
  document.getElementById("title").value = notes[index].title;
  document.getElementById("content").value = notes[index].content;

  editIndex = index;
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

displayNotes();
