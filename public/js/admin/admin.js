let errorMsg= document.querySelector('.error-msg');

function dismissMessages(event){
  event.preventDefault();
  let target = event.currentTarget;
  target.style.animation = "shake 2s infinite";
  let msg = JSON.parse(target.dataset.msg);

  axios.post('/admin/dismissMessages', {msgId : msg._id}).then(res => {
    let error = res.data.error;
    target.style.animation = "none";
    if(error) {
      errorMsg.innerText = "Sorry, something went wrong.";
      target.style.color = 'red';
      return;
    }
    target.style.color = '#4BB543';
    errorMsg.innerText = "";
    target.parentElement.style.opacity = '0';
    setTimeout(() => target.parentElement.remove(), 1500);
  });
}

function dismissHires(event){
  event.preventDefault();
  let target = event.currentTarget;
  target.style.animation = "shake 2s infinite";
  let hire = JSON.parse(target.dataset.hire);

  axios.post('/admin/dismissHires', {hireId : hire._id}).then(res => {
    let error = res.data.error;
    target.style.animation = "none";
    if(error) {
      errorMsg.innerText = "Sorry, something went wrong.";
      target.style.color = 'red';
      return;
    }
    target.style.color = '#4BB543';
    errorMsg.innerText = "";
     let hireNum = document.querySelector('.newHires span').innerText -= 1;
     if(!hireNum) {
       document.querySelector('.newHires').style.background = 'red';
       document.querySelector('.newHires p').innerText = "Sad."
     };
    target.parentElement.style.transform = "translateX(100px)";
    target.parentElement.style.opacity = '0';
    setTimeout(() => target.parentElement.remove(), 1500);
  });
}
