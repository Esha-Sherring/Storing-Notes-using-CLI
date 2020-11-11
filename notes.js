//This file describes all the functions used for writing, removing,listing or reading notes 
const fs=require('fs');
const chalk=require('chalk');
const { title } = require('process');


//Adding a note
const addNote=(title,body) => {
    const notes=loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
     
const removeNote =(title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }    
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const readNote =(title) => {
    const notes= loadNotes();
    const note= notes.find((note) => note.title === title)

    if(!note)
    {
        console.log(chal.red.inverse("NO note found"));
    }
    else{
         (note) 
            console.log(chalk.inverse(note.title))
            console.log(note.body)
    }

}
const loadNotes = () => {
    try{
          
        const dataBuffer= fs.readFileSync('notes.json');
        const dataJSON= dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(err)
    {
        return [];
    }
}
module.exports={
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}