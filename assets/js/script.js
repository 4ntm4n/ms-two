//Declare array where all note objects will be stored
let myNotes = [];

// declare fontAwesome icons
const ghost = `<i class="fa-solid fa-ghost"></i>`;
const skull = `<i class="fa-solid fa-skull"></i>`;
const reverse = `<i class="fa-solid fa-arrow-rotate-left"></i>`;
const prioIcon = `<i class="fa-solid fa-star"></i>`;
const notPrioIcon = `<i class="fa-regular fa-star"></i>`;

/**
 * declare 'feedback' and store the note section h2 in it
 * this will be used for user feedback through out this program.
 */
let feedback = document.getElementById("note-section-heading");

/**
 * light-switch for starred button.
 * will be set to one when starred button is clicked
 * will be set to 0 if any other button in the control panel is clicked.
 */
let starred = 0;

/**
 * initiate id counter for important and normal notes.
 * important notes will always have an id of sub 1000
 * normal notes will have an id of 1000 and above
 */
let nonPrioCount = 1000;
let prioCount = 1000;

/**
 * declare function that handles note generator form submit
 * check if form checkbox was checked, if so, isPrio is true, else false.
 * call the noteMaker function with the form input and isPrio value.
 * scroll the user into the right position where the note was added
 */
const handleSubmit = (event) => {
  event.preventDefault();

  // store form input fields in variables.
  const formTitle = document.getElementById("title-input");
  const formContent = document.getElementById("content-input");
  const formCheckbox = document.getElementById("input-checkbox");

  //control if checkbox is checked  and store it in isPrio variable.
  let isPrio = false;
  if (formCheckbox.checked) {
    isPrio = true;
  } else {
    isPrio = false;
  }
  noteMaker(formTitle.value, formContent.value, isPrio);
  form.reset();

  //scroll into the first item if the note created is prio, else scroll to the last item in list.
  const noteArr = document.getElementById("notes-list").children;
  const lastNote = noteArr.length - 1;
  const theLastNote = document.getElementById(noteArr[lastNote].id.toString());
  isPrio
    ? feedback.scrollIntoView({ behavior: "smooth" })
    : theLastNote.scrollIntoView({ behavior: "smooth" });
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
    },
  };

  //make the prio note land first in the array, and non-prio notes last.
  if (note.prio) {
    prioCount--;
    note.id = prioCount;
    myNotes.unshift(note);
  } else {
    nonPrioCount++;
    note.id = nonPrioCount;
    myNotes.push(note);
  }

  // call the renderNotesFunction with the not removed notes filtered out.
  renderNotes(notRemovedFilter(myNotes));
  //interact with the user
  interact();
};

/**
 * declare function that loops through an array and append object data in a list format
 * add button to individual notes
 * add event listeners to each note button
 */
const renderNotes = (array) => {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    // create the 3 different buttons for each object in the array.
    const impNoteBtn = document.createElement("button");
    impNoteBtn.ariaLabel = "toggle importance on note";
    const restBtn = document.createElement("button");
    restBtn.ariaLabel = "restore note";
    const rmBtn = document.createElement("button");
    rmBtn.ariaLabel = "permanently delete note";

    const li = document.createElement("li"); // create a list element for each object in array.
    li.classList.add("note");
    li.setAttribute("id", array[i]._id);

    li.innerHTML = `
            <h3 class="note-title" >${array[i].title}</h3>
            <p class="note-content">${array[i].content}</p>
            <span class="note-id"> ${array[i]._id} </span>
        `;

    //remove btn
    if (array[i].removed) {
      rmBtn.setAttribute("class", "note-btn del-btn");
      rmBtn.innerHTML = skull;
      li.classList.add("removed");
    } else {
      rmBtn.classList.add("note-btn", "rm-btn");
      rmBtn.innerHTML = ghost;
    }

    // add hidden restore button and display block in css 2, add sort button in html
    restBtn.classList.add("note-btn", "rest-btn");
    if (array[i].removed) {
      restBtn.innerHTML = reverse;
      li.appendChild(restBtn);
      impNoteBtn.style.display = "none"; //hide star-button if note has been removed
    }

    //important button
    if (array[i].prio) {
      impNoteBtn.innerHTML = notPrioIcon;
      impNoteBtn.classList.add("imp-btn", "note-btn", "mk-prio");
      li.classList.add("prio");
    } else {
      impNoteBtn.classList.add("imp-btn", "note-btn", "mkn-prio");
      impNoteBtn.innerHTML = prioIcon;
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

  //is note already removed? delete it permanently, else set removed to true.
  if (starred === 1) {
    myNotes[index].removed = true;
    const rmStarred = impFilter(myNotes);
    renderNotes(notRemovedFilter(rmStarred));
  } else if (myNotes[index].removed) {
    myNotes.splice([index], 1);
    renderNotes(removedFilter(myNotes)); //render removed notes
  } else {
    myNotes[index].removed = true;
    renderNotes(notRemovedFilter(myNotes)); //render all notes - removed
    interact();
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
  //render notes but only notes that have a removed value of false
  renderNotes(notRemovedFilter(myNotes));
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

//add function to sort an array of objects based on its title from A-Z / Z-A.
const sortByTitle = (array) => {
  //stop sorting attempt if there is one or less than one object in the array.
  if (notRemovedFilter(array).length <= 1) {
    feedback.innerHTML =
      "Try this again when you have created at least 2 notes";
    renderNotes(notRemovedFilter(array));
    return;
  }
  /**
   *  make tempArray an instance of the array being passed
   *  then operate on the instance instead of changing the original array
   *  give objects inside tempArray a new key called sorted.
   *  if the note has been sorted before, reverse sort order.
   */
  let tempArray = notRemovedFilter(array);
  // note.sorted has note been added? add it, set it to false and continue
  if (tempArray[0].sorted === null) {
    tempArray.forEach((note) => (note.sorted = false));
  }
  /* is note.sorted false? sort note.title A-Z, set .sorted to true and renderNotes, 
    else sort .title Z-A set .sorted to false and render notes */
  if (tempArray[0].sorted === false) {
    tempArray.sort((a, b) => (a.title > b.title ? -1 : 1));
    tempArray.forEach((note) => (note.sorted = true)); // add a sorted key that is set to true.
    renderNotes(tempArray);
    feedback.innerHTML = "sorting by title. Z-A";
  } else {
    tempArray.sort((a, b) => (a.title > b.title ? 1 : -1));
    tempArray.forEach((note) => (note.sorted = false)); // add a sorted key that is set to false.
    renderNotes(tempArray);
    feedback.innerHTML = "sorting by title. A-Z";
  }
};

//function that gives the user feedback based on number of notes in myNotes.
const interact = () => {
  const numOfNotes = myNotes.length;
  numOfNotes == 1
    ? (feedback.innerHTML = "You have added a note, therefore you are...")
    : numOfNotes == 2
    ? (feedback.innerHTML = "what's better than 2 notes..? ah yes, 3 notes..")
    : numOfNotes == 100
    ? (feedback.innerHTML = "All your notes are belong to us!")
    : numOfNotes >= 999
    ? (feedback.innerHTML =
        "mother of god.. no one has created this many notes... bailing out, your on your own.... ")
    : (feedback.innerHTML = "Your notes are displayed here");
};

//scroll function credit: ispired by w3school
const scrlElem = document.getElementById("scroll-elem");
const scrollFunction = () => {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrlElem.style.display = "flex";
  } else {
    scrlElem.style.display = "none";
  }
};
document.body.scrollTop = 0;
window.onscroll = () => {
  scrollFunction();
};

//get control panel buttons from index.html
const delBtn = document.getElementById("render-deleted");
const impBtn = document.getElementById("render-important");
const homeBtn = document.getElementById("my-notes");

//click function for deleted button that display removed notes
delBtn.addEventListener("click", () => {
  const removedNotes = removedFilter(myNotes);
  renderNotes(removedNotes);
  starred = 0;
  feedback.innerHTML = "Your removed notes are displayed here";
  feedback.scrollIntoView({ behavior: "smooth" });
});
//click function for the starred button to filter out and render important notes
impBtn.addEventListener("click", () => {
  const impNotes = impFilter(myNotes);
  renderNotes(notRemovedFilter(impNotes));
  starred = 1;
  feedback.innerHTML = "Your important notes are displayed here";
  feedback.scrollIntoView({ behavior: "smooth" });
});
//click function that call the sort function
const sort = document.getElementById("sort-btn");
sort.addEventListener("click", () => {
  starred = 0;
  sortByTitle(myNotes);
  feedback.scrollIntoView({ behavior: "smooth" });
});

//click function that renders all notes that have a removed value of false
homeBtn.addEventListener("click", () => {
  renderNotes(notRemovedFilter(myNotes));
  starred = 0;
  interact();
  feedback.scrollIntoView({ behavior: "smooth" });
});

// click-function that takes user to the top of the page.
const createNoteBtn = document.getElementById("create-note-btn");
createNoteBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth", block: "start" }); // For Safari
});

//call the handleSubmit function when submit button is clicked.
const form = document.getElementById("notes-input");
form.addEventListener("submit", handleSubmit);
