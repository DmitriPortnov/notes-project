var count = 0;
var notes;

document.getElementById('addNote').addEventListener('click', addNote);

svNotes();

function addNote(){
    var newNote = {noteText: document.getElementById('freeText').value,
                creator: document.getElementById('creator').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value};
notes = getNotes();
buildNote(newNote);
clearFields(newNote);
}

function saveNotes(notes) {
    notes = JSON.stringify(notes);
    window.localStorage.setItem("notes_Dima", notes);
}

function putInArr(note){
    notes.push(note);
    return notes;
}

function buildDomNote(div){
    var row = rowElement();
    var btn = makeElmnt('button');
    var glyph = makeElmnt('i');

    div.setAttribute('class', 'note fadeIn col-lg-3');
    btn.setAttribute('class', 'del');
    btn.setAttribute("onclick", "delNote(event)");
    glyph.setAttribute('class', 'fas fa-trash-alt');
    btn.value = count++;

    row.appendChild(div);
    div.appendChild(btn);
    btn.appendChild(glyph);
}

function buildNote(note) {
    var div = makeElmnt('div');
    var p = makeElmnt('p');
    var div2 = makeElmnt('div');
    var div3 = makeElmnt('div');
    var p2 = makeElmnt('p');

    p.classList.add('txtArea');
    div2.classList.add('text');
    p2.classList.add('tData');

    div.appendChild(div2);
    div2.appendChild(p);
    div.appendChild(div3);
    div3.appendChild(p2);

    p.innerText = note.noteText;
    p2.innerHTML = note.creator + '<br/>' + note.date + '<br/>' + note.time;

    buildDomNote(div);
}

function clearFields(note){
    document.getElementById('freeText').value = '';
    document.getElementById('creator').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';

    notes = putInArr(note);
    saveNotes(notes);
}

function getNotes() {
    notes = JSON.parse(window.localStorage.getItem('notes_Dima'));
        if (notes == null) {
            notes = [];
        }
    return notes;
}

function svNotes() {
    savedNotes = getNotes();
    if (savedNotes!=null){
        for (var i=0; i<savedNotes.length; i++) {
            buildNote(savedNotes[i]);
        }
    }
}

function rowElement() {
    return document.getElementsByClassName('row')[0];
}

function delNote(event) {
    var row = rowElement();
    var newNotes = getNotes();
    var num = event.currentTarget.value;

    newNotes.splice(num, 1);
    row.removeChild(event.target.parentElement.parentElement);

    saveNotes(newNotes);
    reValue(newNotes);
}

function makeElmnt(Elmnt) {
    return document.createElement(Elmnt);
}

function reValue (arrNotes){
    row = rowElement();
    delBtn = document.getElementsByClassName('del');
    for (var i=0 ; i<arrNotes.length; i++) {
        delBtn[i].value = i;
    }
    count = arrNotes.length;
}