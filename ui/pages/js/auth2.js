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

const Form2=document.querySelector('#form');
Form2.addEventListener('submit',(e) => {

e.preventDefault();

db.collection('contact').get({

    fullnames:Form2.fullnames.value,

    email:Form2.email.value,

    message:Form2.message.value
    

});
});



