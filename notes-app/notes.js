const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title)

  debugger

  if(!duplicateNote) {
    notes.push({ title, body});
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title already taken'));
  }
}

const removeNote = title => {
  const notes = loadNotes();
  const resultNotes = notes.filter(note => note.title !== title);

  if(resultNotes.length < notes.length) {
    saveNotes(resultNotes);
    console.log(chalk.green.inverse('Note successfuly removed!'));
  } else {
    console.log(chalk.red.inverse('Note title not found'));
  }
}

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.white.inverse('Your notes'))
  notes.forEach(note => console.log(note.title))
}

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title)

  if(note) {
    console.log(chalk.blue.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red('No note found'));
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch(e) {
    return []
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
}