const noteNameList =["C4","Db4","D4","Eb4",
                    "E4","F4","Gb4","G4",
                    "Ab4","A4","Bb4","B4",
                    "C5","Db5","D5","Eb5",
                    "E5"]

/* Iterate over all the notes on the list and add them to an object such as that they look like:
noteDict = {
    C4 = {
        "audio" = Audio(C4),
        "domSelector" = document.querySelector(C4),
        "playNoteFunction" = ()=>{playNote code}
    },
    Db4 = ...
}
*/
let noteDict = {}          
for (const noteName of noteNameList){
    
    noteDict[noteName] = {
        noteAudio : new Audio(`notes/${noteName}.mp3`),
        noteDomSelector: document.querySelector(`.${noteName}`),
        noteFunction: returnNotePlayFunction(noteName)
    }
}


// Iterate again to attach the eventListeners

for (const noteName of noteNameList){
    document.querySelector(`.${noteName}`).addEventListener("click", noteDict[noteName].noteFunction)
}


const playSound = audio => {
    const clone = audio.cloneNode();
    clone.play();
    setTimeout(() => (clone.volume = 0.8), 400);
    setTimeout(() => (clone.volume = 0.6), 800);
    setTimeout(() => (clone.volume = 0.4), 1200);
    setTimeout(() => (clone.volume = 0.2), 1600);
    setTimeout(() => (clone.volume = 0), 2000);
};

// This function returns a function which plays the note, adds and then removes the class active
function returnNotePlayFunction(noteName){
    return ()=>{
    
            playSound(noteDict[noteName].noteAudio);
            noteDict[noteName].noteDomSelector.classList.add("active");
            setTimeout(()=>noteDict[noteName].noteDomSelector.classList.remove("active"), 200)  
            }
}

/* TODO: this has to be refactored in order to account for the new way of storing the notes in the noteDict.
    A suggestion is to create another dict with the keyCode as a key, and the expected note as a value in the noteName format.
    
    When a keydown event is detected, 
        we check if the key is in the noteDict object with noteDict.hasOwnProperty(keycode)*.
        If the key is in the object, 
            we return noteDict[noteName].noteFunction()
            
    I have left C4 done as an example.
    
    * more info about this in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
*/
window.addEventListener("keydown", ({ keyCode }) => {
    // Press A
    if (keyCode === 65) return noteDict['C4'].noteFunction();

    // Press W
    if (keyCode === 87) return playDb4();

    // Press S
    if (keyCode === 83) return playD4();

    // Press E
    if (keyCode === 69) return playEb4();

    // Press D
    if (keyCode === 68) return playE4();

    // Press F
    if (keyCode === 70) return playF4();

    // Press T
    if (keyCode === 84) return playGb4();

    // Press G
    if (keyCode === 71) return playG4();

    // Press Y
    if (keyCode === 89) return playAb4();

    // Press H
    if (keyCode === 72) return playA4();

    // Press U
    if (keyCode === 85) return playBb4();

    // Press J
    if (keyCode === 74) return playB4();

    // Press K
    if (keyCode === 75) return playC5();

    // Press O
    if (keyCode === 79) return playDb5();

    // Press L
    if (keyCode === 76) return playD5();

    // Press P
    if (keyCode === 80) return playEb5();

    // Press Ñ or ;
    if (keyCode === 192 || keyCode === 59) return playE5();
})
