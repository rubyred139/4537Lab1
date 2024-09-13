class WriterPage extends WebNotes {
	constructor() {
		super();
		this.initializeUI();
	}

	initializeUI() {
		timeDisplay();
		this.readFromStorage();
		this.displayNoteCombo();
		const addNoteButton = document.getElementById("addNotes");
		addNoteButton.addEventListener("click", () => this.addNewNote());
	}

	addNewNote() {
		this.getStorageData();

		this.id += 1;
		const noteCombo = new NoteObj(this.id);
		this.notesContainer.append(noteCombo.getNoteCombo());
		noteCombo.textArea.newNote.addEventListener("blur", () => {
			// Check if the note already exists in notesArr
			const existingNote = this.notesArr.find(
				(note) => note.id === noteCombo.id
			);
			if (existingNote) {
				existingNote.content = noteCombo.textArea.getContent();
			} else {
				this.notesArr.push({
					id: noteCombo.id,
					content: noteCombo.textArea.getContent(),
				});
			}

			timeDisplay();
			//update localstorage
			this.updateLocalStorage();
		});
	}

	displayNoteCombo() {
		//display the element
		this.notesArr.forEach((note) => {
			const noteObj = new NoteObj(note.id, note.content);
			//display the element
			this.notesContainer.append(noteObj.getNoteCombo());
		});
	}
}

document.addEventListener("DOMContentLoaded", () => new WriterPage());
