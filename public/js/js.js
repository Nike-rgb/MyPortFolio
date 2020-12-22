let logoLink = document.querySelector('.logoLink');
let profilePic = document.querySelector('.prof');

logoLink.onclick = event => {
  event.preventDefault();
  profilePic.classList.toggle("rickroll");
}

//setting up the client socket
const socket = io();
