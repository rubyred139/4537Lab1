class WriterPage extends WebNotes {
	constructor() {
		super();
		this.initializeUI();
	}

	initializeUI() {
		this.readFromStorage();
		this.displayExistedNotes();
		const addNoteButton = document.getElementById("addNotes");
		addNoteButton.addEventListener("click", () => this.addNewNote());
	}

	addNewNote() {
		this.id += 1;
		this.noteCombo = new NoteObj(this.id);
		this.notesContainer.append(this.noteCombo.getNoteCombo());
		this.noteCombo.textArea.newNote.addEventListener("blur", () => {
			this.notesArr.push({
				id: this.noteCombo.id,
				content: this.noteCombo.textArea.getContent(),
			});
			console.log(this.notesArr);
			//update localstorage
			const notesJSON = JSON.stringify(this.notesArr);
			console.log(notesJSON);
			localStorage.setItem("notes", notesJSON);
		});
	}
}

document.addEventListener("DOMContentLoaded", () => new WriterPage());
