var imaje="";
function submit(){
    
    const Form=document.querySelector('#form');
    var output1 =document.getElementById('output');

    const canvas = document.createElement('canvas');
   const ctx = canvas.getContext('2d');
   // Set width and height
   canvas.width =output1.width;
   canvas.height =output1.height;
   // Draw the image
   ctx.drawImage(output1, 0, 0);
   let blogImage =canvas.toDataURL('image/jpeg');
console.log(blogImage);
console.log(imaje);
    db.collection('a_insert').add({

        images:blogImage,
    
        art_title:Form.art_title.value,
    
        article:Form.article.value
        
    
    });
    
    alert('sent');  
}

function comment(){
    const Form1=document.querySelector('#form1');
    db.collection('comment').add({

        commentor:Form1.commentor.value,
    
        commentt:Form1.commentt.value
    });
    Form1.commentor.value='';
    Form1.commentt.value='';
    
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





