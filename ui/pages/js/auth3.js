
function submit(){
    const Form=document.querySelector('#form');
    db.collection('a_insert').add({

        images:Form.images.value,
    
        art_title:Form.art_title.value,
    
        article:Form.article.value
        
    
    });
    Form.images.value='';
    Form.art_title.value='';
    Form.article.value='';
    alert('sent');  
}




function comment2(){
    const Form2=document.querySelector('#form2');
    db.collection('comment').add({

        commentor:Form2.commentor.value,
    
        commentt:Form2.commentt.value
    });
    Form2.commentor.value='';
    Form2.commentt.value='';
    
    alert('comment sent');  
}

function comment3(){
    const Form3=document.querySelector('#form3');
    db.collection('comment').add({

        commentor:Form3.commentor.value,
    
        commentt:Form3.commentt.value
    });
    Form3.commentor.value='';
    Form3.commentt.value='';
    
    alert('comment sent');  
}
function comment4(){
    const Form4=document.querySelector('#form4');
    db.collection('comment').add({

        commentor:Form4.commentor.value,
    
        commentt:Form4.commentt.value
    });
    Form4.commentor.value='';
    Form4.commentt.value='';
    
    alert('comment sent');  
}





