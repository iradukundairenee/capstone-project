const Form=document.querySelector('#form');
Form.addEventListener('submit',(e) => {

e.preventDefault();

db.collection('contact').add({

    fullnames:Form.fullnames.value,

    email:Form.email.value,

    message:Form.message.value
    

});
Form.fullnames.value='';
Form.email.value='';
Form.message.value='';
alert('message sent');
});

