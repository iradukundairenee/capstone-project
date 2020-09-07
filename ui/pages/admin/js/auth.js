const signupForm=document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {

   e.preventDefault();

    //get info
    const email=signupForm['signup-email'].value;
    const password=signupForm['signup-password'].value;

  auth.createUserWithEmailAndPassword(email,password).then(cred => {
      console.log(cred);
      alert('register successfully');
      window.location="signin.html";
      signupForm.reset();
  });
})
