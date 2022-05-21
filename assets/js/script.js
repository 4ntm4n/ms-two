//store objects from noteMaker in array
const myNotes = [];

const handleSubmit = (event) => {
    //prevent default value and save form input data
    event.preventDefault();
    console.log("form was submitted")
    const formTitle = document.getElementById('title-input');
    const formContent = document.getElementById('content-input');
    const formCheckbox = document.getElementById('input-checkbox');
    let isPrio;

    //control if checkbox is checked  and sends input data to the noteMaker()=>
    formCheckbox.checked ? isPrio = true : isPrio = false;
    noteMaker(formTitle.value, formContent.value, isPrio);

    form.reset(); // reset the form.
}

//create a note object and push it to the myNotes array.
const noteMaker = (title, content, prio) => {
    const note = {
        title,
        content,
        prio,
        _id: 1, //do not set directly, use setter method.
        set id(idNum){
            this._id = idNum;
            console.log('an id has been set');
            console.log(myNotes[0]);
        }
    }
    //if the note is prio it lands first in the array, else last.
    note.prio ? myNotes.unshift(note) : myNotes.push(note);

    //check if it works
    if(myNotes !== []){
        console.log('an object was created with the following id: ' + myNotes[0]._id);
        console.log(myNotes[0].title + " " + myNotes[0].content+ " " + myNotes[0].prio);
    }
}

// this function takes an array as argument and loops through it and append it to the DOM.
const renderNotes = (array) => {
    const notesList = document.getElementById('notes-list'); 
    notesList.innerHTML = '';

    for (let i = 0; i < array.length; i++)  {
        li = document.createElement('li');  // create a list element for each object in array.
        li.classList.add('note');
        li.innerHTML =`
            <h3 class="note-title" >${array[i].title}</h3>
            <p class="note-content">${array[i].content}</p>
            <span class="note-id"> num123 change this </span>
        `
        notesList.appendChild(li);
    }
}

const form = document.getElementById('notes-input');
form.addEventListener('submit', handleSubmit);



