class TextArea {
	constructor(id, content = "") {
		this.id = id;
		this.content = content;
		this.newNote = document.createElement("textarea");
		this.newNote.setAttribute("id", `textarea-${id}`);
		this.setContent();
		this.newNote.addEventListener("blur", () => {
			this.content = this.getContent(); // Update content when editing is done
		});
	}
	setContent() {
		this.newNote.value = this.content;
	}
	getContent() {
		return this.newNote.value;
	}
}

class RemoveButton {
	constructor(id) {
		this.id = id;
		this.removeBtn = document.createElement("button");
		this.removeBtn.textContent = "remove";
		this.removeBtn.setAttribute("id", `button-${id}`);
		this.removeBtn.addEventListener("click", () => this.removeItem(id));
	}
	removeItem(id) {
		// Remove from the DOM
		const noteElement = document.getElementById(`note-container-${id}`);
		if (noteElement) {
			noteElement.remove();
		}
		// Update local storage
		const notes = localStorage.getItem("notes");
		const notesArray = JSON.parse(notes);
		const updatedNotes = notesArray.filter((note) => note.id != id);
		localStorage.setItem("notes", JSON.stringify(updatedNotes));
	}
}

class NoteObj {
	constructor(id, note = "") {
		this.id = id;
		this.noteContent = note;
		this.noteContainer = document.createElement("div");
		this.textArea = new TextArea(this.id, this.noteContent);
		this.removeBtn = new RemoveButton(this.id);
		this.createNoteDiv();
	}
	createNoteDiv() {
		this.noteContainer.setAttribute("id", `note-container-${this.id}`);
		this.noteContainer.classList.add("note-container");

		// Append text area and remove button to the container div
		this.noteContainer.appendChild(this.textArea.newNote);
		this.noteContainer.appendChild(this.removeBtn.removeBtn);
	}

	getNoteCombo() {
		return this.noteContainer;
	}
}

class WebNotes {
	constructor() {
		this.notesArr = [];
		this.id = 0;
		this.notesContainer = document.getElementById("notesContainer");
		//listen for changes of localStorage
		window.addEventListener(
			"storage",
			this.autoSyncLocalStorage.bind(this)
		);
	}

	getStorageData() {
		const existedNotes = localStorage.getItem("notes");
		if (existedNotes) {
			this.notesArr = JSON.parse(existedNotes);
		}
	}

	readFromStorage() {
		this.notesArr = [];
		this.getStorageData();
	}

	updateLocalStorage() {
		const notesJSON = JSON.stringify(this.notesArr);
		localStorage.setItem("notes", notesJSON);
	}

	autoSyncLocalStorage(event) {
		if (event.storageArea === localStorage && event.key === "notes") {
			this.notesContainer.innerHTML = "";
			this.readFromStorage();
			this.displayText();
			timeDisplay();
		}
	}
}

function timeDisplay() {
	let time = new Date();
	const timeDiv = document.getElementById("time");
	if (timeDiv) {
		document.getElementById("time").innerHTML =
			"stored at: " +
			time.toLocaleString("en-US", {
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
				hour12: true,
			});
	}
}
const writerButton = document.getElementById("writerButton");
if (writerButton) {
	writerButton.addEventListener("click", () => {
		window.location.href = "writer.html";
	});
}

const readerButton = document.getElementById("readerButton");
if (readerButton) {
	readerButton.addEventListener("click", () => {
		window.location.href = "reader.html";
	});
}
const backButton = document.getElementById("backButton");
if (backButton) {
	backButton.addEventListener("click", function () {
		window.location.href = "index.html";
	});
}
