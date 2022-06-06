# FlexGrid Yoga

![FlexGrid on different screen sizes and devices](assets/img/readme/screenshot%20from%202022-04-18%2011-50-26.png)

[**Have a look on your own device**](https://4ntm4n.github.io/ms-one/index.html)

## Project outline

### **user stories:**

> Typical users are interested in getting involved with online-classes and tutorship in yoga.

- **The typical end user wants to:**

  - know more about site and yoga instructor
  - be able to subscribe to news coming from community regarding techniques and upcoming yoga sessions
  - get a hint about what is expected inside the paid members area
  - be able to sign up and become a full member, attending live- and pre recorded -yoga sessions
  - connect to community on social medias

- **a typical returning user wants to:**
  - sign in to their account and conduct yoga sessions.

> site owner wants to inspire potential end users who wants to learn yoga and market the benefits of yoga and let users connect with her community and sign up to engage in live and pre-recorded yoga sessions.

- **in short, the site owner wants to:**

  - educate new site visitors about herself
  - give brief overview of the benefits of yoga
  - let new users sign up to newsletter to keep them in the loop of what is happening in the community
  - let users know how they can engage in social media.
  - let existing users log in to view the paid-for content.
  - Give a hint about what is expected inside the paid members area
  - Let new users sign up and become full members

## Approach

### Wireframes
The wireframes for this project focuses on the layout of the different sections to ensure that balance is created within each section, and also to make sure that sections are not repetitive even though similar elements are being used across the website.  

These wireframes are created using Adobe Illustrator.
![FlexGrid Yoga wireframes](assets/img/readme/wireframe.png)

### Design Approach

The design of the website is created with the benefits of yoga in mind. the text should be easy to read and not be distracted by design elements around it. the design features are created to feel relaxed positive and light weight, where elements have room to breath. 

**Design features**

- Elements that contain no text are **soft and rounded**.

  - Text areas are **square and light** to stand out from the rest of the website and enhance readability.

  - initially the colors are **few and muted**, as you progress down the site **more colors** are mixed in to keep visitors curious and **enhance positivity**.

  - Elements have a **lot of space** around them to feel more relaxed.

  - Elements that have animations are **slow and subtle** to make elements feel **relaxing**.

**Fonts**

> **'Fredoka One'** is a round blocky font that is chosen for the headings on the webpage to blend in with the overall design language.

> Paragraphs, anchor tags, and other small text areas have the font set to **Roboto** with a fallback of _Helvetica_ and _Sans-Serif_ to maximize readability while not being a distraction from the rest of the website.

**Colors**

> The choice of colors are inspired by different colors of yoga mats. these colors are often pastel, so they have been altered slightly along the way to enhance contrast and readability.

**Animations**

> animations that take place when a user interacts with certain elements on the website are designed to be slightly slower than on an average website to induce a relaxing feeling, which in turn connects back to the overall design approach.

---

### Technical Approach

In order to make the website less cluttered and reduce the amount of scrolling the website is built on two main pages.

1.  > **an index page** <br>
        the main page, with a single page layout style where the site owner could present herself and the users could get to learn more about her and about yoga.
2.  > **a members page** <br>
        where existing users can sign in and a new user can choose to sing up and become a full member.

**Framework**

> This website does not take advantage of any framework. Since this is a small project the it instead takes advantage of CSS3's newly added feature of CSS-grids to create rows for each section. Each section is then made into a flexbox.

> **this approach has 2 main advantages:**
>
> 1. it removes unnecessary code from framework, which can enhance loading speeds.
>
> 2. using CSS-grids reduces the amount of divs in the html which makes the syntax more clean and better for screen readers and assistive technologies.

**Responsive design**

> This website is created with a mobile first approach.
>
> Mobile phones usually have less processing power than a tablet, laptop and desktop. By having the CSS load up the mobile design first, the website renders faster on mobile phones since it can ignore styling that is specified lower down in the style.css document that only applies to larger screens.
>
> On larger screens, each section takes advantage of the full width of the screen it is being displayed on. But the content inside each section is limited to a width of 1000px. This makes the website look more unified across larger screens and creates a better user experience since the user will have access to all the websites information within 1000px and do not have to pan the head to read.

---

## Website Features

> ### Header

The header is designed to be large enough to give breathing room to its elements and feel relaxed, while still hint that there are information visible below that you can scroll to.

![header section of FlexGridYoga](assets/img/readme/screenshot-index-header.png)

**Contains the following elements:**

- an inspiring **background image**
- a fixed, responsive **navigation menu**

- **a welcome heading** with the company name

- **a textbox** with an introduction text

- a **call-to-action button** that takes the user to the join us page where
  the user can choose to subscribe to a newsletter through a form or click a link to go to the sign-up form and become a full paying member.

**What it accomplish:**

1.  let users know more about the website.
2.  give users a shortcut to join section.
3.  give the user a way to navigate around the site.

---

> ### About Section - instructor presentation

In the about section, the yoga instructor get a chance to introduce herself. This section is set higher in the information hierarchy than the other sections below since the _instructor_ really is what sets one community apart from another.

![About section of FlexGridYoga](assets/img/readme/screenshot-index-about.png)

**Contains the following elements:**

- introduction **text-area**
- selfie **image**

**What it accomplish:**

1.  Let users get to know the instructor.
2.  Let site owner differentiate herself from competitors

---

> ### Benefits section - Why yoga?

This section informs the users of som of the benefits of yoga.

The goal with this is to inspire users interest in the subject. This is done with six interactive cards, each presenting one unique benefit you gain from doing yoga.

![Benefits section of FlexGridYoga](assets/img/readme/screenshot-index-benefits.png)

**Contains the following elements:**

- a section **heading**
- interactive and responsive **cards**

**What it accomplish:**

1.  Educate users on the benefits of engaging in yoga.
2.  Give site owner a tool to inspire her visitors.
3.  Make website a bit more interactive.

---

> ### Join Section - first step to get involved

New users might be hesitant to become a full paying member on the first visit. So in order for the site owner to keep users in the loop, and in order to let new users connect and learn more about the future content and what value it would bring to them, they have an option to join a newsletter where the site owner has the potential to reach interested visitors in the future via email.

![Join section of FlexGridYoga](assets/img/readme/screenshot-index-join.png)

**Contains the following elements:**

- a responsive **text-box** containing information on what _value_ signing up could bring new users.
- a **link** directing interested users to the sign up form on the _Members page_.
- a responsive **form** that could feed an emailing list database. this form contains following information:
  - **First name** _required_
  - **Last name**
  - **Email** _required_
  - **Submit button**

**What it accomplish:**

1.  Educate users on the benefits of engaging in yoga.
2.  Give site owner a tool to inspire her visitors in the future.

**Design feature:**

> Input labels are placed off screen using CSS. The users can't see them, but the screen readers can. Making the section looking clean while keeping functionality. Placeholders shows the user what is expected in the form-fields.
>
> By mixing different vivid colors in the background image, the join section becomes positive and fun to inspire user to commit.

---

> ### Members page header

The header inherits most of the styling from the index page. but the welcome text box and the website name heading is replaced with a login form.

Existing users can sign in to the website here.

![header on members page of FlexGridYoga](assets/img/readme/screenshot-members-login.png)

**Contains the following elements**

- a **fieldset legend**
- **log-in** form for existing users form contains the following form-elements:
- **Email** _required_
- **Password** _required_
- **Submit button** that submits the form and could validate the user to log in.

**What it accomplish:**

1.  gives existing users an easy way to log in to their accounts.

**Design feature:**

> Just like on the join section of the index page, the labels are not displayed but still accessible for screen readers and assistive technology for users who needs it.

---

> ### Members page - sign up section

In this section the user gets is faced with the option to become a paying member of the website and gain full access to its content.

![sign up section on members page of FlexGridYoga](assets/img/readme/screenshot-members-signup.png)

**Contains the following elements**

- **information box** with the following sub-elements:
  - **heading** letting user know what it costs
  - **text** explaining the offer
  - **video element** using an iframe with embedded youtube content that the user can interact with.
- **account creation form** containing the following sub-elements:
  - an _Account Creation_ **fieldset** with 3 input fields create the new account.
  - A **detail > summary** element styled to look like a button that reviels the _payment_ part of the form
  - a _Payment Card_ **fieldset** to fill in the payment details
  - a _Billing_ **fieldset** that let the user fill in the billing adress for the payment.

**What it accomplish:**

1.  Give users an idea of what is behind the paywall.
2.  Give site owner a way to promote the paid-for content.
3.  Let users create a members account.
4.  Let users provide payment details to become full members.

**Technical Feature:**

> the video element in the information box let's the user get a hint of what to expect as a paying member. The video runs on youtube using iframe and youtube's sharing feature using embedded code which gives the user full controls over play, pause, volume and playing speed functionalities.

---

> ### Footer - Social media links

The footer and the end of the website contains links to the website's social media platforms.

![Footer of FlexGridYoga](assets/img/readme/screenshot-index-footer.png)

**Contains the following elements**

- List of **links to social media** pages.
- **Copy right text** for the website. ( in this case my own name since this is an exercise.)

**Section Goal:**

1.  Let users connect to website's social media platforms
2.  Give site owner a way to promote her community on social media.

**Design feature:**

> The footer area is designed to be as clean and minimal as possible yet have enough contrast to be clear ans readable.
> animations on the elements has been removed to reduce distractions from the rest of the the website. the mouse still indicate these icons are links through the pointer-change.

---

### Features Left to Implement

Herea are some ideas that could further improve this website:

- Flip over cards with more information of yoga benefits on the backside
- Members login inside the fixed nav-bar for faster login for existing users.
- Gallery page from social media showcasing the community

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