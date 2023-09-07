const cafeList = document.querySelector('#cafe-list');
const form = document.getElementById('add-cafe-form');
// create and render cafe
const renderCafe = (doc) => {
    let li = document.createElement('li');
    let title = document.createElement('span');
    let des = document.createElement('span');
    let cross = document.createElement('div');
    cross.classList.add('crossSign');

    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().Title;
    des.textContent = doc.data().Descrip;
    cross.textContent = "x";

    li.appendChild(title);
    li.appendChild(des);
    li.appendChild(cross);
    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}
//getting data
// db.collection("cafes").orderBy('Title').get().then((snapshot) => {
//     console.log("testing..");
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data());
//         renderCafe(doc);
//     })
// })

//saving data
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    db.collection('cafes').add({
        Title: form.title.value,
        Descrip: form.des.value,
    });
    form.title.value = "";
    form.des.value = "";
})
//updating 
// db.collection('cafes').doc("zN5JfcWKV6iKbFEskSLg").update({
//     Title: "Updating..."
// });
// db.collection('cafes').doc("saR0Pp4CecEveTLIunOk").set({
//     Title: "Updating... Testing...",
//     Descrip: "hello from console"
// });

// real-Time listener
db.collection('cafes').orderBy('Title').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    console.log(changes); 
    changes.forEach(change => {
        console.log(changes);
        if(change.type == 'added'){
            renderCafe(change.doc);
        }else if(change.type == 'removed'){
           let li = cafeList.querySelector('[data-id=' + change.doc.id + ']') 
        }
    })
})