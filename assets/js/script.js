//store objects from noteMaker in array
const myNotes = [];
const myDelNotes = [{title: "hello", id: 3},{}];
let nonPrioCount = 1000; // id number for nonPrio-notes will origin from this number
let prioCount = 999; //id number for Prio-notes will origin from this number

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
    isPrio ? prioCount-- : nonPrioCount++;
    noteMaker(formTitle.value, formContent.value, isPrio);
}

//create a note object and push it to the myNotes array.
const noteMaker = (title, content, prio) => {
    const note = {
        title,
        content,
        prio,
        _id: 0, //do not set directly, use setter method.
        set id(idNum){
            this._id = idNum;
            console.log('an id has been set');
            console.log(myNotes[0]);
        }
    }

    //if the note is prio it lands first in the array, else last.
     if (note.prio){
         note.id = prioCount;
         myNotes.unshift(note);
     }else{
         note.id = nonPrioCount;
         myNotes.push(note);
     } 
       

    //check if it works
    if(myNotes !== []){
        console.log('an object was created with the following id: ' + myNotes[0]._id);
        console.log(myNotes[0].title + " " + myNotes[0].content+ " " + myNotes[0].prio);
    }

    renderNotes(myNotes);
}

// this function takes an array as argument and loops through it and append it to the DOM.
const renderNotes = (array) => {
    const notesList = document.getElementById('notes-list'); 
    notesList.innerHTML = '';
  
    for (let i = 0; i < array.length; i++)  {
        li = document.createElement('li');  // create a list element for each object in array.
        btn = document.createElement('button');
        btn.innerHTML="Remove";
        li.classList.add('note');
        li.innerHTML =`
            <h3 class="note-title" >${array[i].title}</h3>
            <p class="note-content">${array[i].content}</p>
            <span class="note-id"> ${array[i]._id} </span>
        `
        li.appendChild(btn)
        notesList.appendChild(li);
        btn.addEventListener('click', (i) => removeTask(i));//todo: add push to deleted array.
 
    }

  
}

function removeTask(i) {
    /* 2. THE BUTTON IS NOW A CHILD OF THE LI, SO DELETE ITS PARENT */
    let deleteTask = i.target.parentElement;
    deleteTask.remove();
  }

const deleteNotes = (title, content, prio) => {
    const delNote = {
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
    delNote.prio ? myDelNotes.unshift(delNote) : myDelNotes.push(delNote);
}



const form = document.getElementById('notes-input');
form.addEventListener('submit', handleSubmit);



const hej = [1, 2, 4, 5, 6, 7, 8, 9, 10];
const hejdo = [1, 5, 7, 6];


const findMatches = (array1, array2) => {
    matches = array1.filter(noteId => array2.includes(noteId));

    for (notes of matches) {
        console.log(array1.indexOf(notes));
    }
}