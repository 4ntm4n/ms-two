//store objects from noteMaker in array
let myNotes = [];

//let myDelNotes = [];
let nonPrioCount = 1000; // non-prio notes ID origin.
let prioCount = 1000; //PRIO notes ID origin.

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
    note.id = prioCount;
    myNotes.unshift(note);
  } else {
    nonPrioCount++;
    note.id = nonPrioCount;
    myNotes.push(note);
  }

  interact();
  renderNotes(notRemovedFilter(myNotes));
};

// this function takes an array as argument and loops through it and append it to the DOM.
const renderNotes = (array) => {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    li = document.createElement("li"); // create a list element for each object in array.
    li.classList.add("note");
    li.setAttribute("id", array[i]._id);
    
    li.innerHTML = `
            <h3 class="note-title" >${array[i].title}</h3>
            <p class="note-content">${array[i].content}</p>
            <span class="note-id"> ${array[i]._id} </span>
        `;
    //remove btn
    const rmBtn = document.createElement("button");
    rmBtn.classList.add("note-btn","rm-btn");
    if (array[i].removed) {
      rmBtn.innerHTML = "DELETE";
      li.classList.add("removed");
    } else {
      rmBtn.innerHTML = "Remove";
    }

    // add hidden restore button and display block in css 2, add sort button in html
    const restBtn = document.createElement("button");
    restBtn.classList.add("rest-btn");
    if (array[i].removed) {
      restBtn.innerHTML = "restore";
      li.appendChild(restBtn);
    }

    //important button
    const impNoteBtn = document.createElement("button");
    impNoteBtn.classList.add("imp-btn");
    if (array[i].prio) {
      impNoteBtn.innerHTML = "not prio";
      li.classList.add("prio");
    } else {
      impNoteBtn.innerHTML = "make prio";
    }

    li.appendChild(rmBtn);
    li.appendChild(impNoteBtn);
    notesList.appendChild(li);

    //event listeners to buttons inside the notes
    rmBtn.addEventListener("click", (i) => {
      removeNote(i);
    });

    restBtn.addEventListener("click", (i) => {
      restoreNote(i);
    });

    impNoteBtn.addEventListener("click", (i) => {
      NoteImpStatus(i);
    });
  }
};

//function to remove note from the view.
const removeNote = (i) => {
  const domNoteId = Number(i.target.parentNode.id);

  //find the clicked note in the myNotes array by filtering its id.
  const index = myNotes.findIndex((note) => {
    return note._id === domNoteId;
  });

  //is note already removed? delete it! else set removed to true.
  if (myNotes[index].removed === true) {
    if (window.event.ctrlKey) {
      // nested else if to restore removed
      const domNoteId = Number(i.target.parentNode.id);

      //find the clicked note in the myNotes array by filtering its id.
      const index = myNotes.findIndex((note) => {
        return note._id === domNoteId;
      });

      if (myNotes[index].removed) {
        myNotes[index].removed = false;
        renderNotes(removedFilter(myNotes));
      }
    } else {
      myNotes.splice([index], 1);
      renderNotes(removedFilter(myNotes)); //render removed notes
    }
  } else {
    myNotes[index].removed = true;
    renderNotes(notRemovedFilter(myNotes)); //render all notes - removed
  }
};

const restoreNote = (i) => {
  const domNoteId = Number(i.target.parentNode.id);

  //find the clicked note in the myNotes array by filtering its id.
  const index = myNotes.findIndex((note) => {
    return note._id === domNoteId;
  });

  myNotes[index].removed = false;

  renderNotes(removedFilter(myNotes));
};

//function to make note important or non important.
const NoteImpStatus = (i) => {
  const domNoteId = Number(i.target.parentNode.id);

  //find the clicked note in the myNotes array by filtering its id.
  const index = myNotes.findIndex((note) => {
    return note._id === domNoteId;
  });

  let tempArr = [];
  if (myNotes[index].prio === true) {
    myNotes[index].prio = false; //set prio to false
    tempArr = myNotes.splice([index], 1);
    myNotes = myNotes.concat(tempArr);
  } else {
    myNotes[index].prio = true;
    tempArr = myNotes.splice([index], 1);
    myNotes = tempArr.concat(myNotes);
  }

  renderNotes(notRemovedFilter(myNotes));
};

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


//create function to remove duplicates in array.

//https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects#:~:text=How%20it%20works%3A-,Array.,duplicates%2C%20it%20is%20using%20Array.
const deleteDuplies = (array) => {
  const ids = array.map((note) => note._id);
  const filtered = array.filter(
    ({ _id }, index) => !ids.includes(_id, index + 1)
  );
  return filtered;
};

//filters that render different types of notes obj. based on obj. keys.
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

//add function to sort notes by name A-Z.
const sortByTitle = (array) => {

  // note.sorted has note been added? add it, set it to false and continue
  if (array[0].sorted === null) {
    array.forEach((note) => (note.sorted = false));
  }
  /* is note.sorted false? sort note.title A-Z, set .sorted to true and renderNotes, 
  else sort .title Z-A set .sorted to false and render notes */
  if (array[0].sorted === false) {
    array.sort((a, b) => (a.title > b.title ? -1 : 1));
    array.forEach((note) => (note.sorted = true)); // add a sorted key that is set to true.
    renderNotes(array);
  } else {
    array.sort((a, b) => (a.title > b.title ? 1 : -1));
    array.forEach((note) => (note.sorted = false)); // add a sorted key that is set to false.
    renderNotes(array);
  }
};

const interact = () => {
  const numOfNotes = myNotes.length;
  const h2 = document.getElementsByTagName("h2")[0];

  numOfNotes == 1
    ? (h2.innerHTML = "You have added a note, therefore you are...")
    : numOfNotes == 2
    ? (h2.innerHTML = "yep that's it...")
    : numOfNotes == 100
    ? (h2.innerHTML = "All your notes are belong to us!")
    : numOfNotes >= 999
    ? (h2.innerHTML =
        "mother of god.. no one has created this many notes... bailing out, your on your own.... ")
    : (h2.innerHTML = "All your notes are displayed here");
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
//click function to filter out and render important notes
impBtn.addEventListener("click", () => {
  const impNotes = impFilter(myNotes);
  renderNotes(impNotes);
});
oldBtn.addEventListener("click", () => renderNotes(notRemovedFilter(myNotes)));

const form = document.getElementById("notes-input");
form.addEventListener("submit", handleSubmit);

