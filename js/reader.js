class ReaderPage extends WebNotes {
	constructor() {
		super();
		this.initializeUI();
	}
	initializeUI() {
		this.readFromStorage();
		this.displayText();
		timeDisplay();
	}

	displayText() {
		this.notesArr.forEach((note) => {
			const textContainer = document.createElement("div");
			textContainer.setAttribute("id", `text-container-${this.id}`);
			textContainer.classList.add("text-container");

			const noteText = new TextArea(note.id, note.content);
			textContainer.appendChild(noteText.newNote);
			this.notesContainer.appendChild(textContainer);
		});
	}
}

document.addEventListener("DOMContentLoaded", () => new ReaderPage());
