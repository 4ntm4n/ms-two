# Notes

![Notes on different screen sizes and devices](assets/img/readme/responsive.png)

[**Have a look on your own device**](https://4ntm4n.github.io/ms-two/index.html)

## Project outline

### **user stories:**

> Typical users are interested in getting similar functionality as they get from physical stickyNotes, but in a digital format.

- **The typical end user wants to have the ability to:**

  - create new sticky notes.
  - remove completed / irrelevant notes from the view.
  - sort notes by title name from A-Z or Z-A
  - make notes prioritized and have them showed up first in the list of notes.
  - have a view for the prioritized notes only. 
  - toggle between priority status on a note AFTER it has been created.
  - restore notes that has been removed.
  - delete notes permanently.
  - click a button that takes them to the note generator, instead of having to scroll up and down if many notes have been created.
  

## Approach

### Wireframes
The wireframes for this project focuses on the layout of the different sections to ensure the functionality of the application came across to the user in a non distracting way. The mindset when creating the wireframes and layout for this app can be summarized like this: Functionality > Design.

![Notes wireframes](assets/img/readme/wireframe.png)

### Design Approach

The design of the website is created with the functionality of the application in mind . I did not want to distract the user too much from the core purpose of the application: to have the ability to create and manipulate digital sticky notes. Having that said, I wanted the application to feel retro, lo-tech and incorporate a bit of humor to it. 
 
**Design features**

- Buttons have **universally understandable**  icons inside them.

  - layout of buttons are **designed to be reached** by your right thumb, even on larger screens.

  - **colors are contrasty** and highlights difference in different elements the user creates.

  - User is **automatically taken to the relevant place on the screen** depending on what action the user takes.

  - The user receives text **feedback** from within **already existing design elements** within the view when an action is taken.

**Fonts**

> **Permanent Marker** is a "scribbly font" that was chosen for the title of each note rendered in the view. this is to imitate the look and feel of a real sticky note. 

> Paragraphs, anchor tags, and other small text areas have the font set to **Ubuntu Condensed** with a fallback of _Sans-serif_ and to create a retro vibe while maximize readability.

**Colors**

> The choice of colors are inspired by real sticky notes, but more muted / washed out. for the overall color combination I used [this color scheme](https://www.schemecolor.com/city-by-night.php) called night city, since I felt it could add something interesting to my very basic design for this app.

**Animations**

> only notes, buttons and scroll have a slight subtle animation added to them. App is kept more simple and functions feels lighting fast by having it this way. It ties in to the overall low-tech feel of the design too while it gave me as a developer more time to focus on the functionality. 

**Layout**
> The layot of the app contains of a single page divided into 3 main sections.

1.  > **Header** <br>
    >   The header contains a form that takes the user input, called note-generator. It also contains a control-panel with the buttons that the user can interact with in order to render it's created notes in different ways.

2.  > **Notes section** <br>
    >   the notes section contains a feedback header that changes depending on how the user interacts with the page. It also contains an empty list that the user will fill with notes. these notes are displayed in a loose grid pattern using CSS's flex-box and row-wrap.

3.  > **Footer**
    >   The footer contains a link to my GitHub page and a copyright text.
        

**Framework**
> No. This project is written in vanilla JS, HTML and CSS, with a mobile first approach to responsive design.

---
<br>
<br> 

### **Technical Approach**

In this section we are going through the javascript functions, how they work with each other and how they respond to the users action in order to get an understanding how the application is working behind the scenes. 

<br>
<br>

#### **the handleSubmit function**
> This is the function that handles the user input data collected in the note-generator form. 
> It starts off by preventing the defult behavior of the form submit, making sure that the user stays on the same page when submit has been triggered. 
> it continues by collecting the user data, and send it to the noteMaker function where the data will be formatted into an object.
> 
>It is also this function that handles a scroll down to the added note. If the note had a prio value of true, it will scroll down to the top of the note section where the prio note will land. otherwise it should find the id of the note created, and scroll down to where that note is displayed. 

``` javaScript
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
  lastNote = (noteArr.length -1);
  const theLastNote = document.getElementById(noteArr[lastNote].id.toString());
  isPrio ? feedback.scrollIntoView({behavior: "smooth"}) : theLastNote.scrollIntoView({behavior: "smooth"});  
};

```
<br>
<br>

#### **The noteMaker function**
>
> The core of this app is function called "noteMaker" this function takes a couple of different parameters that can be viewed below, and creates an object called "note". The noteMaker then makes sure your note is stored in an array called myNotes. 
>
> Beneath the note object template, there is some logic that tells the app _how_ it should store the note. is this an important note? Then place it first in the myNotes array, otherwise, push it to the end and place it last.
> An Id is also set here, if the note was important (aka "prio") an Id below 1000 is set, else an Id above 1000 is set. 
> 
>  When the note has been stored, a function that renders the notes in the DOM is called before communicating with the user, using the interact function. 

 ``` javaScript
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
```
<br>
<br>

#### **the renderNotes function**
>
>This function takes an array as an argument and itterates through all the object, extracting the data of the object and append the data to an un ordered list that is defined inside index.html. This function is what makes makes the user see what it has stored in myArray, in other words it creates the visual represenation of the myNotes array. 
> 
> There is a lot going on inside this function, so I will break it down in smaller sections below.

>The function is declared and the list inside index.html is pinpointed by it's id attribute and the list content is emptied.
``` javaScript
const renderNotes = (array) => {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";
    ...
```
> the function then iterates over each object and for each object in the array, it starts off by creating 3 buttons that the user can interact with in order to do specific tasks related to the note the buttons are attached to. 
> 
> It then creates then continues to create a list-item containing a header that will display the notes title, a paragraph that will display the notes content and a span tag that shows the ID that noteMaker generated. 
``` javaScript
    ...
    for (let i = 0; i < array.length; i++) {
    // create the 3 different buttons for each object in the array.
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

```
>
> Still inside the loop of the renderNotes function, the note buttons are created and appended to the list item. As you can see there are some logic to determine what text goes in each button depending of how the user has interacted with that note. 
>For example, an important note should have a button to make it a normal note and vise versa. A removed note should not have an important button but rather a restore button and a 'permanent delete' button.
``` javaScript
    ... 
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
```

> Before the loop ends and the function is complete,  a click-function is declared for each button inside the note. These click-functions in turn call another correlating function declared outside of renderNotes.
``` javaScript
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
```
<br>
<br>

> the first button that appears on each non removed note are is coupled with this function, it finds the note's correlated object in the myNotes array by it's ID value, and then set's the removed value to true before it re-renders the note filtering out all the removed notes. 
>
>You can also see that there are some logic to this function. if the note already has a removed value of true, it should be considered removed and have a delete button instead of a remove button. the delete function removes the note completely from myArray by using javascript's splice method. 
>
>If you have clicked the button that renders all the important / starred notes, there is logic telling the app to render the important notes again after a note has been removed. this gives the user the impression that they are staying in the same "place" on the website, and is not being forcely moved to the "home" view where all active notes are rendered.

``` javaScript
const removeNote = (i) => {
  const domNoteId = Number(i.target.parentNode.id);

  //find the clicked note in the myNotes array by filtering its id.
  const index = myNotes.findIndex((note) => {
    return note._id === domNoteId;
  });

  //is note already removed? delete it permanently, else set removed to true.
  if(starred === 1){
    myNotes[index].removed = true;
    const rmStarred  = impFilter(myNotes)
    renderNotes(notRemovedFilter(rmStarred));

  }else if (myNotes[index].removed) {
    myNotes.splice([index], 1);
    renderNotes(removedFilter(myNotes)); //render removed notes
  }else {
    myNotes[index].removed = true;
    renderNotes(notRemovedFilter(myNotes)); //render all notes - removed
    interact();
  }
};
```
<br>
<br>

#### **The restoreNote function**
>
> This function let's the user restore a note that has been removed. it basically finds the corelating object by filter the myNotes array with the matching note ID from the note being clicked, then set that objects removed value to false before rendering the removed notes again, displaying all removed notes to the user except the one that was just restored.

```javaScript
const restoreNote = (i) => {
  const domNoteId = Number(i.target.parentNode.id);

  //find the clicked note in the myNotes array by filtering its id.
  const index = myNotes.findIndex((note) => {
    return note._id === domNoteId;
  });

  myNotes[index].removed = false;
  renderNotes(removedFilter(myNotes));
};
```
<br>
<br>

#### **The NoteImpStatus function**
> This is the function that let's the user toggle a note between important and not important after it has been created. 
> Like the other note-button-functions in this app, it starts off by finding the matching note in myNotes array by filtering out the object that has a matching id value as the id on the DOM rendered note. 
>
> What is different with this function however, is that it creates a temporary array, where it puts the note you clicked, and then concatenate the temporary array with the  myNotes array. Why? because if you make a note important, the concatenation makes sure that the note ends up first in the array, if you make an important note, non-important it concatenates in a way that makes sure the note the user clicked lands in the end of the MyNotes array, and are there for displayed last the next time myNotes are rendered. 

``` javaScript
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
```
<br>
<br>

#### **The filter functions**
>
>
> The filter functions are what makes this app easy and maintainable. The first approach in the creation of this app, all notes with different values where put in their own array. removed notes had their own array, important notes was pushed to one array and so on. This was very fiddly since you had to concatenate arrays, then remove duplicates on this array, it often ended in a mess. 
> By using filters, and filtering out the notes you are interested in by a certain key value, there is no need for anything else than a large array where deleted, non-deleted, important and non-important notes are combined. If you want to view the important notes, filter out notes with an prio value of true, if you want to see the notes you removed, filter out the notes with a removed value of true, if you wanna see all your notes, but not the removed notes, filter out all notes with a removed value of false.

``` javaScript
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
```
<br>
<br>

#### **The sort function**
> This is the function the user gets access to by clicking the sort button in the control panel. 
>It works by putting all the notes in a temporary array, then doing the sorting operation on that temporary array. This way the order of myNotes are not affected by the sorting m, which is convenient for the user who can click the home button after looking at the sorted view, and get back to the standard view.
> 
> Before the sorting operation is made, this function first checks if there are more than 2 non deleted notes in the myNotes array, if it is not, the function will return and the user will get prompted with a message stating that sorting can only be done if you have created at least 2 notes. 
> If the user has indeed created more than two notes, the sorting will begin. 
>
> Uniquely for this function, it will go through each note in myArray, place it in a temporary array, and then add a new key named sorted, sorted will be set to true. if the notes that are being sorted is already true, it will be sorted in a different than sorted will be set to false. if sorted is true, the notes will be sorted from A-Z, if sorted is false the notes will be sorted from Z-A. 
>
> In summary, this functions sorts all the notes based on the first letter or number of the note.title. It is doing all operations on a copy of the myNotes array rather than changing the original array, and it is rendering the myNotes copy to the viewer when it is executing. 
``` javaScript
const sortByTitle = (array) => {

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
```
<br>
<br>

#### **The interact function**
> The interact function add dynamics to the to the user experience. It is there to make this app just a little but less dull. 
> this function checks how many note there is myNotes, and based on that number can print different things to the user. 

``` javaScript
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
```
<br>
<br>

#### **the scroll function**
> A scroll function is added to help a user who have created a lot of different notes. If there are a lot of notes, list will be long, and the scroll will seem endless. 
> 
> this function adds a button called 'add' in the control panel. if it is clicked the user is taken to the top of the page where a new note can be added. 

``` javaScript
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
```
---

### Features Left to Implement

Here are some ideas that could further improve this website:

- Login function and a back end system that le'ts the user save notes for later. 
- color options inside the note generator
- option to add tags to notes, and a filter that filters out notes that .include(tagNames)
- search bar that let's user search for notes that .includes(searchTerm)
---

## Testing

Here follows some picture of the website on mobile and tablet to show the website might appear on smaller screens than in the feature section.

### **Mobile full page:**

> ![full mobile page](assets/img/readme/testing/mobile-full-index.png)
>
> > this is how the index page looks like on mobile
> >
> > You can for example see that the benefits section **cards** is shrunken in size and that the join form **input fields** are displayed in a column, rather than in a row.

> ![full mobile page](assets/img/readme/testing/mobile-full-members.png)
>
> > this is how the members page looks like on mobile
> >
> > Every element is centered. and the information box that was split into two parts in the sign-up section is now looking like one solid box.

### **Mobile Navigation:**

> ![full mobile page](assets/img/readme/testing/mobile-index-header.png)
>
> > On mobile, the navigation menu is replaced with a hamburger button.
> >
> > This is what the mobile navigation looks like closed.

> ![mobile navigation open](assets/img/readme/testing/mobile-nav-open.png)
>
> > When you click the burger menu button, this is what the navigation menu looks like open.
> >
> > You can also see that when open the menu, the menu bar disappears, and the burger icon is animated to become an X.

> ![mobile navigation active button](assets/img/readme/testing/mobile-nav-button.png)
>
> > When you click a button in the menu, it takes you to the correlating section.
> >
> > you close the menu by pressing the X.

### **Video Elements:**

> ![Video element from youtube](assets/img/readme/testing/mobile-members-signup1.png)
>
> > Here you can see the video element that is displayed in the sign-up section of the members page.
> > This video is implemented using an iframe element and embedded code from youtube.
> >
> > This video works the same way it would on youtube.com, meaning the video will only play if the user intends it to. The user also has full control over actions such as play, pause, full screen view, video quality and sound.
> >
> > Since the video is embedded using iframe, this is like watching youtube from within this website, meaning the creator of what ever video is embedded will get credited by youtube in terms of view counts etc. It can there for also work as a link to a site owners potential youtube page.
> >
> > > **important note:**
> > >
> > > This video is for mockup reasons only to display what an embedded video would look like on this page and should be replaced by the site owners own video uploaded to youtube. All credit goes to the creator and creators account:
> > >
> > > _Name of account:_
> > >
> > > [**Boho Beautiful Yoga**](https://www.youtube.com/channel/UCWN2FPlvg9r-LnUyepH9IaQ)
> > >
> > > _Link to video used:_
> > >
> > > https://www.youtube.com/watch?v=CiaD3jP0YhA

### **Form Field Validation:**

> ![form field being validated](assets/img/readme/testing/form-field-validation.png)
>
> > form fields are validated by html 5.
> > All form fields are also type specific if applicable, meaning if a form field expects an email address, its input will not be accepted as valid if it is missing a correct email formatting.
> >
> > in this example you can see an email form being validated because the form field is set to "required".

### **Lighthouse Results:**

> ![form field being validated](assets/img/readme/testing/lighthouse-report.png)
>
> > _Performance_, _Accessibility_ adherence, _SEO_ and _Best Practices_ have been tested with the inbuilt lighthouse tester in chrome developer tools.
> >
> > These are the results.
> >
> > **Please Note:**
> >
> > The iframe element containing **youtube's code** has been commented out during testing of the website. This is because it contains performance thresholds and yields best practice suggestions that are outside the scope of this _front end_ project. see image below for details:
> ![light house suggestions youtube element](assets/img/testing/bugs/../../readme/testing/bugs/bug2.png) 

### **Validator Tests**

To extend the validation of the HTML and CSS, external validators from w3c has been checking the code as well.

- HTML

  - No errors were returned when passing the index page through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2F4ntm4n.github.io%2Fms-one%2Findex.html)

  - No errors were returned when passing the members page through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2F4ntm4n.github.io%2Fms-one%2Fmembers.html)

- CSS

  - No errors were found when passing the single CSS file through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2F4ntm4n.github.io%2Fms-one%2Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

- Accessibility:
  - External accessibility tests were made with no errors through [WAVE](https://wave.webaim.org/report#/https://4ntm4n.github.io/ms-one/index.html)

### Unfixed Bugs

> **What?**
>
> > background of fixed menu bar disappears.
> >
> > ![navigation bug](assets/img/readme/testing/bugs/bug1.png)
>
> **When?**
>
> > When user is on a desktop browser and resizes the viewport so small that the hamburger menu appears. If the hamburger menu is then clicked to be opened and the viewport is enlarged so that the "normal" navigation menu appears again.
>
> **Why?**
>
> > This is due to the fact that the menu is made with pure CSS and uses a transparent checkbox on top of the hamburger icon. When the checkbox is checked, the menu is toggled, and the navigation bar disappears. If it is left checked, and the viewport enlarged, the menu will disappear but the checkbox will remain checked. This means that all styling that is applied when the checkbox is checked also will remain until you physically uncheck the checkbox.
>
> **Solution**
>
> > 1.  You can redesign the menu so that it covers the entire screen, and remove the animation that removes the nav-bar. (This creates some other UX issues).
> >
> > 2.  You could re-create the hamburger menu using a method that involves javascript. (This is arguably the best solution but N/A for this project.)

---

## **Testing User stories**

> In this section we are testing the user stories stated in the outlined before this website was created in order to check if we have met all user needs.
>
> > We are testing the user stories one by one. Click the list items to view its correlating solution.

- **Typical users wants to:**

  - <details>
      <summary>
        Know more about site and yoga instructor
      </summary>
      <img src="assets/img/readme/screenshot-index-about.png">  
    </details>

  - <details>
      <summary>
        Be able to subscribe to news coming from community regarding techniques and upcoming yoga sessions
      </summary>  
      <img src="assets/img/readme/screenshot-index-join.png">
    </details>

  - <details>
      <summary>
        Get a hint about what is expected inside the paid members area
      </summary>
      <img src="assets/img/testing/../readme/testing/mobile-members-signup1.png">  
    </details>

  - <details>
      <summary>
        Be able to sign up and become a full member, attending live- and pre recorded -yoga sessions
      </summary>
      <img src="assets/img/readme/testing/mobile-members-signup2.png">    
    </details>

  - <details>
      <summary>
        Connect to community on social medias
      </summary>
      <img src="assets/img/readme/screenshot-index-footer.png">  
    </details>

- **Existing users wants to:**

  - <details>
      <summary>
        Sign in to their account and conduct yoga sessions.
      </summary>
      <img src="assets/img/readme/testing/mobile-members-login.png">  
    </details>

- **Site owner wants to:**

  - <details>
      <summary>
        Educate new site visitors about herself
      </summary>
      <img src="assets/img/readme/screenshot-index-about.png">  
    </details>

  - <details>
      <summary>
        give breif overview of the benefits of yoga
      </summary>  
      <img src="assets/img/readme/screenshot-index-benefits.png">
    </details>

  - <details>
      <summary>
        let new users sign up to newsletter to keep them in the loop of what is happening in the community
      </summary>
      <img src="assets/img/readme/screenshot-index-join.png"> 
    </details>

  - <details>
      <summary>
        let users know how they can engage in social media.
      </summary>
      <img src="assets/img/readme/screenshot-index-footer.png">  
    </details>

  - <details>
      <summary>
        let existing users log in to view the paid-for content.
      </summary>
      <img src="assets/img/readme/testing/mobile-members-login.png">    
    </details>

  - <details>
      <summary>
        Give a hint about what is expected inside the paid members area
      </summary>
      <img src="assets/img/testing/../readme/testing/mobile-members-signup1.png">  
    </details>

  - <details>
      <summary>
        Let new users sign up and become full members
      </summary>
      <img src="assets/img/readme/testing/mobile-members-signup2.png">    
    </details>

---

## Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows:
  - In the GitHub repository, navigate to the Settings tab
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

> You can visit the live website form any device by following this link:
>
> https://4ntm4n.github.io/ms-one/index.html

## Credits

In this section I want to give credits to resources I have used when creating this website.

### **Technical**

> Here I want to give credit to the resources I have used that gave me enough knowledge in html and css in order to build this website.

> #### **Code Institute**
>
> Since I am a full stack developer student at code institute most of my fundamental programming skills and essential knowledge in html and css comes from here:
>
> > https://codeinstitute.net

> #### **Codecademy** - _Intermediate CSS track_
>
> On Codecademy.com I took a course in intermediate CSS after finishing the course material on Code Institute. Here I learned about flexbox in CSS and also CSS inbuilt grid functionality that I used to create rows for each section of this website.
>
> > Here is a link to the track on codecademy:
> > https://www.codecademy.com/learn/learn-intermediate-css
>
> > here is a link to project I made to teach myself flexbox:
> > https://github.com/4ntm4n/Tea-cozy/blob/main/README.md

> #### **tips and tricks**
>
> Here I will are some things I picked up after googling and reading forums
>
> **smooth-scrolling in CSS:**
>
> > https://gomakethings.com/smooth-scrolling-links-with-only-css/
>
> **center an image from html through CSS:**
>
> > https://www.w3schools.com/howto/howto_css_image_center.asp
>
> **adding script to bottom of the page:**
>
> > https://stackoverflow.com/questions/38407962/when-to-use-the-script-tag-in-the-head-and-body-section-of-a-html-page#:~:text=Put%20your%20functions%20in%20the,not%20interfere%20with%20page%20content.&text=If%20your%20is%20not%20placed,of%20the%20element.
>
> **styling input fields:**
>
> > https://www.w3schools.com/css/css_form.asp
>
> **hamburger menu:**
>
> found this burger menu method, imported it and modified it to suit this website.
>
> > https://codepen.io/alvarotrigo/pen/wvrzPWL
>
> **using media queries:**
>
> > https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
>
> **how to ease everything on hover:** > https://stackoverflow.com/questions/41267357/css-ease-in-and-out-on-hover

### **Content**

In terms of text content, almost everything has been invented by myself on the fly as I saw fit and can be viewed as relevant mockup text that should be replaced by the site owners own words if this site ever were to be commercially used.

> #### **Benefits of yoga**
>
> The cards in the benefits section have six different benefits of yoga presented on them, these benefits were inspired by this article.
>
> > https://www.hopkinsmedicine.org/health/wellness-and-prevention/9-benefits-of-yoga

### **Fonts and icons**

> - Fonts for text and heading has been imported through [Google Fonts](https://fonts.google.com/)
>   >
> - The icons in the footer were taken from [Font Awesome](https://fontawesome.com/)

### **Media**

In this section you can see where the media elements on the website comes from and who created them.

> **flower pictures that are used for the benefits cards:** >https://www.freepik.com/free-vector/yoga-mind-quote-vector-template-social-media-post-set_20266489.htm#query=flower%20yoga%20pose&position=0&from_view=search
>
> > created by rawpixel.com and availabel on https://freepik.com/

> **background of sign-up section on members page:** >https://www.freepik.com/free-vector/people-practicing-yoga_9176176.htm#query=yoga%20studio&position=33&from_view=keyword
>
> > Created by pch.vector and available on https://freepik.com/

> **background of join section on index page** >https://www.freepik.com/free-vector/open-air-yoga-class-concept_9892525.htm#query=yoga&position=2&from_view=author
>
> > created by pikisuperstar and available on https://freepik.com/

> **Selfie image in the about section on index page** > https://www.freepik.com/free-photo/woman-yoga-mat-relax-park-young-sporty-asian-woman-practicing-yoga-doing-headstand-exercise-working-out-wearing-sportswear-pants-top_14625823.htm#query=yoga%20nature%20headstand&position=0&from_view=search
>
> > Image by jcomp and available on https://freepik.com/

> **background image in header on index and members page**
>
> > bought from Adobe stock photos and available on https://adobestock.com/

> **video element in sign-up section on members page**
>
> As mentioned in the testing area: _This video is for mockup reasons only_ to display what an embedded video would look like on this page and should be replaced by the site owners own video uploaded to youtube. All credit goes to the creator and creators account.
>
> By viewing the video on this website, you are watching the creators channel on youtube through the iframe and youtube's embedded code.
>
> > _Name of account:_
> >
> > **Boho Beautiful Yoga**
>
> > _Link to video used:_
> >
> > https://www.youtube.com/watch?v=CiaD3jP0YhA

---

### Some final words from the developer

Thank you for taking the time to read through this website documentation.

This project is the first of five milestone projects in a full stack developer course that I have enrolled through [Code Institute](https://codeinstitute.net).

- There are many ways to approach a project like this, but in this case I wanted to:

  - **A**: limit myself to **pure** html and CSS since this is a course in those topics and I was curious to see how much could be done without using any javascript to create front end functionality.

  - **B**: **not use** any framework to aid me in class creation, grid functionality and design.

  - **C**: Work from a **pre-defined** project suggestion (in this case yoga / mindfulness) to further challenge myself and create a, what I can imagine, more life like scenario for a web developer where you put yourself in a clients shoes and work with a topic that is not always aligning with personal interests.

> FlexGrid Yoga - a study in HTML & CSS
>
> By Anton Askling 2022





# ms-two

https://www.w3schools.com/jsref/jsref_concat_array.asp#:~:text=The%20concat()%20method%20concatenates,not%20change%20the%20existing%20arrays.

prevent pointer when fontawesome icon inside button !"!!!!
https://stackoverflow.com/questions/21653978/font-awesome-icon-preventing-click-in-parent-button

scroll to top
https://www.w3schools.com/howto/howto_js_scroll_to_top.asp


color scheme:
https://www.
schemecolor.com/city-by-night.php