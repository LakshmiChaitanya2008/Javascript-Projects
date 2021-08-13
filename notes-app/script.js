"use strict";

const form = document.querySelector("form");
const inputTitle = document.querySelector("input");
const inputNote = document.querySelector("textarea");
const notesContainer = document.querySelector(".notes");

class App {
  // prettier-ignore
  notes = localStorage.getItem("notes") === null ? [] : JSON.parse(localStorage.getItem("notes"));

  constructor() {
    this.updateUI();
    form.addEventListener("submit", this.addNote.bind(this));

    notesContainer.onclick = function (e) {
      if (e.target.parentElement.classList.contains("note")) {
        const target = e.target;
        const id = target.closest(".note").dataset.id;
        const index = this.notes.findIndex((cur) => cur.id === +id);

        if (e.target.classList.contains("remove"))
          this.deleteNote.call(this, e);

        if (e.target.classList.contains("edit"))
          this.editNote.call(this, e, index);
      }
    }.bind(this);
  }

  updateLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  updateUI() {
    notesContainer.innerHTML = "";
    const html = this.notes
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
  }

  addNote(e) {
    e.preventDefault();

    if (!inputTitle.value) {
      alert("Enter any Title");
      return;
    }

    this.notes.push({
      id: Date.now(),
      title: inputTitle.value.trim(),
      note: inputNote.value.trim(),
    });

    this.updateLocalStorage();
    this.updateUI();

    inputNote.value = inputTitle.value = "";
  }

  editNote(e, index) {
    const inputUpdateTitle =
      e.target.parentElement.querySelector(".updateTitle");
    const inputUpdateNote = e.target.parentElement.querySelector(".updateNote");
    const noteTitle = e.target.parentElement.querySelector(".note-title");
    const noteNote = e.target.parentElement.querySelector(".note-note");

    inputUpdateNote.style.display = "block";
    inputUpdateTitle.style.display = "block";
    noteTitle.style.display = "none";
    noteNote.style.display = "none";

    inputUpdateNote.value = noteNote.textContent.trim();
    inputUpdateTitle.value = noteTitle.textContent.trim();
    inputUpdateNote.focus();

    inputUpdateNote.onblur = function () {
      console.log(this);
      this.notes[index].title = inputUpdateTitle.value;
      this.notes[index].note = inputUpdateNote.value;
      this.updateUI();
      this.updateLocalStorage();
    }.bind(this);
  }

  deleteNote(e) {
    const target = e.target;
    const id = target.closest(".note").dataset.id;
    const index = this.notes.findIndex((cur) => cur.id === +id);

    this.notes.splice(index, 1);
    this.updateLocalStorage();
    this.updateUI();
  }
}

const Notes = new App();
