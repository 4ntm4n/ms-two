//store objects from noteMaker in array
let myNotes = [];
//let myDelNotes = [];
let nonPrioCount = 1000; // id number for nonPrio-notes will origin from this number
let prioCount = 1000; //id number for Prio-notes will origin from this number

const handleSubmit = (event) => {
  //prevent default value and save form input data
  event.preventDefault();

  console.log("form was submitted");
  const formTitle = document.getElementById("title-input");
  const formContent = document.getElementById("content-input");
  const formCheckbox = document.getElementById("input-checkbox");

  //control if checkbox is checked  and sends input data to the noteMaker()=>
  let isPrio = false;
  if (formCheckbox.checked) {
    isPrio = true;
  } else {
    isPrio = false;
  }
  noteMaker(formTitle.value, formContent.value, isPrio);
  form.reset();
};

//create a note object and push it to the myNotes array.
const noteMaker = (title, content, prio, _id, removed = false) => {
  const note = {
    title,
    content,
    prio,
    _id: 0, //do not set directly, use setter method.
    removed,
    set id(idNum) {
      this._id = idNum;
      console.log("an id has been set");
    },
  };

  if (note.prio) {
    prioCount--;
    note.id = prioCount
    myNotes.unshift(note);
  } else {
    nonPrioCount++;
    note.id = nonPrioCount;
    myNotes.push(note);
  }

  renderNotes(notRemovedFilter(myNotes));
};

// this function takes an array as argument and loops through it and append it to the DOM.
const renderNotes = (array) => {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    li = document.createElement("li"); // create a list element for each object in array.
    btn = document.createElement("button");
    btn.innerHTML = "Remove";
    li.classList.add("note");
    li.setAttribute("id", array[i]._id);
    li.innerHTML = `
            <h3 class="note-title" >${array[i].title}</h3>
            <p class="note-content">${array[i].content}</p>
            <span class="note-id"> ${array[i]._id} </span>
        `;
    li.appendChild(btn);
    notesList.appendChild(li);
    btn.addEventListener("click", (i) => {
      removeNote(i);
    });
  }
};


//function to remove note from the view.
function removeNote(i) {
  const domNoteId = Number(i.target.parentNode.id);

  //find the clicked note in the myNotes array by filtering its id.
  const index = myNotes.findIndex((note) => {
    return note._id === domNoteId;
  });

  //set the corelating object's .remove value to true
  if(myNotes[index].removed === true){
    myNotes.splice([index], 1)
    renderNotes(removedFilter(myNotes));
  }else{
  myNotes[index].removed = true;
  renderNotes(notRemovedFilter(myNotes));
}
  }

  //render myNotes again but only objects that have removed set to false.
 








//function that compares two arrays and find index of their matches
const findMatch = (baseArr, compArr) => {
  // 1. filter out matches in baseArr and compArr and store it as an array (matches)
  matches = baseArr.filter((noteId) => compArr.includes(noteId));
  console.log(matches); //log name
  console.log(baseArr.indexOf(matches)); //log index

  delIndex = baseArr.indexOf(matches[0]);
  //4. store index of found match in baseArr
  const indexInBaseArr = [];

  //2. loop through matches array
  for (notes of matches) {
    //3. push index of matches to indexInBaseArr
    indexInBaseArr.push(baseArr.indexOf(notes));
  }

  //5. return array containing index of matches.
  console.log(indexInBaseArr);
  return indexInBaseArr;
};

const deleteNoteObj = (baseArr, index) => {
  console.log(index);
  console.log(baseArr);
  baseArr.splice(index, 1);
  console.log(baseArr);
};

//create function to remove duplicates in array.

//https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects#:~:text=How%20it%20works%3A-,Array.,duplicates%2C%20it%20is%20using%20Array.
const deleteDuplies = (array) => {
  const ids = array.map((note) => note._id);
  const filtered = array.filter(
    ({ _id }, index) => !ids.includes(_id, index + 1)
  );
  return filtered;
};

const impFilter = (array) => {
  return array.filter((note) => {
    return note.prio === true;
  });
};

const removedFilter = (array) => {
  return array.filter((note) => {
    return note.removed === true;
  });
};

const notRemovedFilter = (array) => {
  return array.filter((note) => {
    return note.removed === false;
  });
};

//get control panel buttons from index.html
const delBtn = document.getElementById("render-deleted");
const impBtn = document.getElementById("render-important");
const oldBtn = document.getElementById("render-old-first");

//click function that removes any duplicates and then renders them
delBtn.addEventListener("click", () => {
  const removedNotes = removedFilter(myNotes);
  renderNotes(removedNotes);
});
//click function to filter out and render
impBtn.addEventListener("click", () => {
  const impNotes = impFilter(myNotes);
  renderNotes(impNotes);
});
oldBtn.addEventListener("click", () => renderNotes(notRemovedFilter(myNotes)));

const form = document.getElementById("notes-input");
form.addEventListener("submit", handleSubmit);
