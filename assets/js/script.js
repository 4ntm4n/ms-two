//store objects from noteMaker in array
let myNotes = [];
//fontAwesome icons
const ghost = `<i class="fa-solid fa-ghost"></i>`;
const skull = `<i class="fa-solid fa-skull"></i>`;
const reverse = `<i class="fa-solid fa-arrow-rotate-left"></i>`;
const prioIcon = `<i class="fa-solid fa-star"></i>`;
const notPrioIcon = `<i class="fa-regular fa-star"></i>`;

//store notes section h2 to use it for user feedback
let feedback = document.getElementById("note-section-heading");

//lightswitch for stared button. will be 1 if stared is clicked will be 0 if other button is clicked.
let stared = 0;

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

  //scroll into the first item if the note created is prio, else scroll to the last item in list.
  const noteArr = document.getElementById("notes-list").children;
  lastNote = (noteArr.length -1);
  
  const theLastNote = document.getElementById(noteArr[lastNote].id.toString());
  isPrio ? feedback.scrollIntoView({behavior: "smooth"}) : theLastNote.scrollIntoView({behavior: "smooth"});  
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

  renderNotes(notRemovedFilter(myNotes));
  interact();
};

// this function takes an array as argument and loops through it and append it to the DOM.
const renderNotes = (array) => {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const impNoteBtn = document.createElement("button");
    const restBtn = document.createElement("button");
    const rmBtn = document.createElement("button");

    li = document.createElement("li"); // create a list element for each object in array.
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

      impNoteBtn.style.display = "none";
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
  if(stared === 1){
    myNotes[index].removed = true;
    const rmStared  = impFilter(myNotes)
    renderNotes(notRemovedFilter(rmStared));

  }else if (myNotes[index].removed) {
    myNotes.splice([index], 1);
    renderNotes(removedFilter(myNotes)); //render removed notes
  }else {
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

/* //create function to remove duplicates in array.

//https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects#:~:text=How%20it%20works%3A-,Array.,duplicates%2C%20it%20is%20using%20Array.
const deleteDuplies = (array) => {
  const ids = array.map((note) => note._id);
  const filtered = array.filter(
    ({ _id }, index) => !ids.includes(_id, index + 1)
  );
  return filtered;
}; */

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
  console.log("array is attempting to sort");

  //stop sorting attempt if there is one or less than one object in the array.
  if (notRemovedFilter(array).length <= 1) {
    feedback.innerHTML ="Try this again when you have created at least 2 notes"
    renderNotes(notRemovedFilter(array));
     return;
     
  }
/*   make tempArray an instance of the array being passed 
  then operate on the instance instead of changing the original array */ 
  let tempArray = notRemovedFilter(array) 
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
    feedback.innerHTML = "sorting by title. Z-A"
  } else {
    tempArray.sort((a, b) => (a.title > b.title ? 1 : -1));
    tempArray.forEach((note) => (note.sorted = false)); // add a sorted key that is set to false.
    renderNotes(tempArray);
    feedback.innerHTML = "sorting by title. A-Z"
  }
};

//function that gives the user feedback based on number of notes created.
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

//get control panel buttons from index.html
const delBtn = document.getElementById("render-deleted");
const impBtn = document.getElementById("render-important");
const homeBtn = document.getElementById("my-notes");

//click function that display removed notes
delBtn.addEventListener("click", () => {
  const removedNotes = removedFilter(myNotes);
  renderNotes(removedNotes)
  stared = 0;
  feedback.innerHTML = "Your removed notes are displayed here"
  feedback.scrollIntoView({behavior: "smooth"});
});
//click function to filter out and render important notes
impBtn.addEventListener("click", () => {
  const impNotes = impFilter(myNotes);
  renderNotes(notRemovedFilter(impNotes));
  stared = 1;
  feedback.innerHTML = "Your important notes are displayed here"
  feedback.scrollIntoView({behavior: "smooth"});
});

const sort = document.getElementById("sort-btn");
sort.addEventListener("click", () => {
  stared = 0;
  sortByTitle(myNotes)
  feedback.scrollIntoView({behavior: "smooth"});
});

homeBtn.addEventListener("click", () =>{ 
  renderNotes(notRemovedFilter(myNotes))
  stared = 0;
  interact();
  feedback.scrollIntoView({behavior: "smooth"});
});

const scrlElem = document.getElementById('scroll-elem')


const scrollFunction = () => {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrlElem.style.display = "flex";
    
  } else {
    scrlElem.style.display = "none";
  }
};
document.body.scrollTop = 0;
window.onscroll = () => {scrollFunction()};

// silent function on click that takes user to the top of the page.
const createNoteBtn = document.getElementById('create-note-btn')
createNoteBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: "smooth", block: 'start'}); // For Safari
})

const form = document.getElementById("notes-input");
form.addEventListener("submit", handleSubmit);
