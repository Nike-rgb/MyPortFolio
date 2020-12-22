//things happening on clicking the about and contact link
let about = document.querySelector('.about');
let contact = document.querySelector('.contact');
let alertMsgs = document.querySelector('.alert-msgs');
let isTimeoutCleared = true;
let timerId;

function displayAlertMsg(msg) {
  if(!isTimeoutCleared){
    clearTimeout(timerId);
    isTimeoutCleared = false;
    timerId = setTimeout(() => {
      alertMsgs.style.opacity = 0;
      isTimeoutCleared = true;
    }, 6000);
  } else{
    isTimeoutCleared = false;
      timerId = setTimeout(() => {
      alertMsgs.style.opacity = 0;
      isTimeoutCleared = true;
    }, 6000);
  }

  alertMsgs.style.opacity = "1";
  alertMsgs.innerHTML = msg;
}

if(alertMsgs.dataset.alert) displayAlertMsg(alertMsgs.dataset.alert);

about.onclick = (event) => {
  event.preventDefault();
  displayAlertMsg(`I'll write something "about" me when my
   life becomes interesting enough. As of now, this page has nothing on it.
    `);
  }
contact.onclick = (event) => {
  event.preventDefault();
  displayAlertMsg(`I don't have facebook<br>
  I don't have twitter.
  I don't have instagram<br>
  There. If you wanna contact, please do so in the 'ask me' form. Cheers!
  `);
}

//little animation at the start of the page
let heroText = document.querySelector('.hero-text p');
setTimeout(() => {
  heroText.style.transform = "translateX(0px)";
}, 00);


//lazy loading texts
let lazyA = document.querySelector('.lazy-a');
let lazyB = document.querySelector('.lazy-b');
let lazyC = document.querySelector('.lazy-c');

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      let targetDiv = entry.target;
      targetDiv.style.opacity = 1;
      targetDiv.style.transform = "translateX(0)";
      observer.unobserve(targetDiv);
    }
  });
}, {
  threshold : 0.7,
});

let targets = document.querySelectorAll('.lazy-loader');

 targets.forEach(target => {
   observer.observe(target);
 });

 //askMe anything
 let askMeIcon = document.querySelector('.askMe h3 i');
 let askMeForm = document.querySelector('.askMe form');
 let askMe = document.querySelector('.askMe');
 let askMeBtn = document.querySelector('.askMe button');

 function displayForm() {
   askMeForm.style.opacity = "1";
   askMeForm.style.display = "block";
   askMe.style.transform = "translateX(30%)";
   askMeForm.style.transform = "translateX(-15%)";
   isHidden = false;
 }

 function hideForm() {
   askMeForm.style.opacity = "0";
   setTimeout(() => askMeForm.style.display = "none", 2000);
   askMe.style.transform = "translateX(0%)";
   isHidden = true;
 }

 let isHidden = true;
 askMeIcon.addEventListener('click', () => {
   if(isHidden) displayForm();
   else hideForm();
 });

emailjs.init("user_pPrLRdzZbCZzzOvdUCiaT");

 askMeBtn.onclick = event => {
   event.preventDefault();
   let askMeQuestion = document.querySelector('.askMeQuestion').value;
   let askMeEmail = document.querySelector('.askMeEmail').value;
   askMeIcon.style.animation = "shake 2s ease infinite";
   axios.post('/ask', {
     askMeQuestion,
     askMeEmail,
   }).then(res => {
     if(res.data.error) {
       askMeIcon.style.animation = "none";
       askMeIcon.style.color = "red";
       setTimeout(() => askMeIcon.style.color = "white", 1000);
       askMeForm.reset();
       return displayAlertMsg(res.data.error);
     }
     emailjs.send("service_yq7cxsy","template_1fwd52v", {
       msg: askMeQuestion,
       email: askMeEmail,
     }).then(() => {
       askMeIcon.style.animation = "none";
       askMeForm.reset();
       askMeIcon.style.color = "#4BB543";
       setTimeout(() => askMeIcon.style.color = "white", 1000);
       displayAlertMsg("Message sent. I'll try get in touch with you soon.<br> Cheers!");
     });
    });
   hideForm();
 }



 //register and login forms displaying
 let loginLink = document.querySelector('.login');
 let registerLink = document.querySelector('.register');
 let bodyWrapper = document.querySelector('.body-wrapper');
