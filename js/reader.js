class ReaderPage extends WebNotes {
	constructor() {
		super();
		this.initializeUI();
	}
	initializeUI() {
		super.readFromStorage();
		this.displayExistedNotes();
		window.addEventListener("storage", this.handleStorageEvent.bind(this));
	}

	handleStorageEvent(event) {
		if (event.storageArea === localStorage && event.key === "notes") {
			// Check if the event is relevant
			const notesJSON = localStorage.getItem("notes");
			if (notesJSON) {
				const notesArray = JSON.parse(notesJSON);
				if (notesArray.length > this.displayedCount) {
					const lastNote = notesArray[notesArray.length - 1];
					const lastNoteId = lastNote.id;
					const lastNoteContent = lastNote.content;
					const noteObj = new NoteObj(lastNoteId, lastNoteContent);
					this.notesContainer.append(noteObj.getNoteCombo());
					this.displayedCount += 1;
				}
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", () => new ReaderPage());
