/**
 * This class contains the necessary properties and methods defining a note:
 * - Constructor input fields:
 *      - Name: the name of the key
 *      - Keys: the code of the keys that will be tied to the node being played (e.g. "a" plays a "C4")
 * - Additional class fields:
 *      - NoteAudio: audio from /notes/*.mp3 tied to the note. This will be played on key press or mouse click
 *      - noteDomElement: HTML element tied to the note for visual aid
 * - Methods:
 *      - play(): will reproduce the tied NoteAudio for this note with decaying volume and show the note as pressed in the page view
 *      - bindListeners(): will bind the window and noteDomElement listeners on keydown and click to play the pressed note
 */
class Note {
    constructor (name, keys) {
        this.name = name;
        this.keys = keys;
        this.noteAudio = new Audio(`notes/${this.name}.mp3`);
        this.noteDomElement = document.querySelector(`.${this.name}`)
    }
    
    play () {
        const clone = this.noteAudio.cloneNode();
        clone.play();
        setTimeout(() => (clone.volume = 0.8), 400);
        setTimeout(() => (clone.volume = 0.6), 800);
        setTimeout(() => (clone.volume = 0.4), 1200);
        setTimeout(() => (clone.volume = 0.2), 1600);
        setTimeout(() => clone.pause(), 2000);
        this.noteDomElement.classList.add("active");
        setTimeout( () => this.noteDomElement.classList.remove("active"), 200)  
        console.log(this.noteDomElement);
    }
    
    bindListeners () {
        this.noteDomElement.addEventListener("click", () => this.play());
        this.keys.forEach(key => {
            window.addEventListener("keydown", (keyDownEvent) => {
                if (key === keyDownEvent.keyCode) this.play();
            });
        });
    }
}

// Create all the notes in the piano and bind them to the desired keys in the user keyboard. Then, bind all the window listeners
const noteList = [
    new Note ("C4", [65]),
    new Note ("Db4", [87]),
    new Note ("D4", [83]),
    new Note ("Eb4", [69]),
    new Note ("E4", [68]),
    new Note ("F4", [70]),
    new Note ("Gb4", [84]),
    new Note ("G4", [71]),
    new Note ("Ab4", [89]),
    new Note ("A4", [72]),
    new Note ("Bb4", [85]),
    new Note ("B4", [74]),
    new Note ("C5", [75]),
    new Note ("Db5", [79]),
    new Note ("D5", [76]),
    new Note ("Eb5", [80]),
    new Note ("E5", [192, 59]),
]

noteList.forEach(note => note.bindListeners());
