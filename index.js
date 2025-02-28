const form = document.querySelector("form");
const textarea = form.querySelector("textarea");
const color = form.querySelector("input");
const notesContainer = document.querySelector(".notesContainer");


const createdNotes = [];
const deletedNotes = [];

form.addEventListener("submit", (e) =>{
    e.preventDefault();

 const newNote = {
    text: textarea.value,
    color: color.value,
 };

 createdNotes.push(newNote);
 console.log(createdNotes);
  
 displayNotes();
 textarea.value = "";
 textarea.focus();

});


function displayNotes(){
   notesContainer.innerHTML = "";
   if(createdNotes.length === 0){
    notesContainer.appendChild(notesPara);
   }
   else{
    const fragment = document.createDocumentFragment();//it does not add to the DOM and does not use any memory
   
    createdNotes.forEach((note) =>{
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.style.backgroundColor = `${note.color}`;

        const text = document.createElement("p");
        //TEMPLATE LITERAL
        text.innerText = `${note.text}`;//or text.innerText = note.text;
        text.classList.add("text");
        const close = document.createElement("span");
        close.classList.add("close");
        close.innerHTML = `&times;`;
      
        close.addEventListener("click", (e) => {
            const indexToDelete = createdNotes.findIndex((n)=>{
             return n.position === note.position;
            }) ;
          
            deletedNotes.push( ...createdNotes.splice( indexToDelete, 1));
         
            e.target.closest(".note").remove();
        });
        noteDiv.append(text , close); 
        fragment.append(noteDiv);
    });
    notesContainer.append(fragment);
}
}
