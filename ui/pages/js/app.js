const cafeList=document.querySelector('#cafe-list');

//create element and render cafe

function renderCafe(doc){

let li=document.createElement('li');
let art_title=document.createElement('span');
let article=document.createElement('span');
let images=document.createElement('span');
let delete=document.createElement('<td>');

li.setAttribute('data-id', doc.id);
art_title.textContent = doc.data().art_title;
article.textContent = doc.data().article;
images.textContent = doc.data().images;
delete.textContent='delete';

li.appendChild(art_title);
li.appendChild(article);
li.appendChild(images);
li.appendChild(delete);


}
db.collection('a_insert').get().then((snapshot) => {

 snapshot.docs.forEach(doc => {
    renderCafe(doc);
 })

})