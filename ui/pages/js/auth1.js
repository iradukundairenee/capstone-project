const signInForm=document.querySelector('#signup-form');
signInForm.addEventListener('submit', (e) => {

   e.preventDefault();

    //get info
    var answer =document.getElementById("answer");
    const email=signInForm['signup-email'].value;
    const password=signInForm['signup-password'].value;

    firebase.auth().signInWithEmailAndPassword(email,password).then(cred => {
      alert("signin success");
      window.location="admin/blog2.html";
      signInForm.reset();
  });
  
})

