"use strict";
const form = document.querySelector("form");
const inputTitle = document.querySelector("input");
const inputNote = document.querySelector("textarea");
const notesContainer = document.querySelector(".notes");

const notes =
  localStorage.getItem("notes") === null
    ? []
    : JSON.parse(localStorage.getItem("notes"));

const updateLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const updateUI = function () {
  notesContainer.innerHTML = "";
  const html = notes
    .map((note) => {
      return `
        <div class="note" data-id="${note.id}">
          <h3 class="remove">❌</h3>
          <h3 class="edit">✏️</h3>
          <input type="text" style="display:none" class="updateTitle">
          <h2 class="note-title">${note.title}</h2>
          <textarea type="text"  style="display:none" class="updateNote"></textarea>
          <p class="note-note">
            ${note.note}
          </p>
        </div>
  `;
    })
    .join("");

  notesContainer.insertAdjacentHTML("beforeend", html);
};

updateUI();

const addNote = function () {
  if (!inputTitle.value) {
    alert("Enter any Title");
    return;
  }

  notes.push({
    id: Date.now(),
    title: inputTitle.value.trim(),
    note: inputNote.value.trim(),
  });

  updateLocalStorage();
  updateUI();

  inputNote.value = inputTitle.value = "";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addNote();
});

notesContainer.addEventListener("click", function (e) {
  const target = e.target;
  const id = target.closest(".note").dataset.id;
  const index = notes.findIndex((cur) => cur.id === +id);

  if (target.classList.contains("remove")) {
    notes.splice(index, 1);
    updateLocalStorage();
    updateUI();
  }

  if (target.classList.contains("edit")) {
    const inputUpdateTitle = target.parentElement.querySelector(".updateTitle");
    const inputUpdateNote = target.parentElement.querySelector(".updateNote");
    const noteTitle = target.parentElement.querySelector(".note-title");
    const noteNote = target.parentElement.querySelector(".note-note");

    inputUpdateNote.style.display = "block";
    inputUpdateTitle.style.display = "block";
    noteTitle.style.display = "none";
    noteNote.style.display = "none";

    inputUpdateNote.value = noteNote.textContent.trim();
    inputUpdateTitle.value = noteTitle.textContent.trim();
    inputUpdateNote.focus();

    inputUpdateNote.onblur = function () {
      notes[index].title = inputUpdateTitle.value;
      notes[index].note = inputUpdateNote.value;
      updateUI();
      updateLocalStorage();
    };
  }
});
