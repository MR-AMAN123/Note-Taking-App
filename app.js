// // CRUDS create read update delete search   
document.addEventListener('DOMContentLoaded', () => {

    //ADDING AND UPDATING NOTES-
    // Add Note Button
    let addNoteBtn = document.getElementById('addNote');
    let addNoteContainer = document.getElementById('addNoteContainer');

    
    addNoteContainer.style.display = 'none';     // initiallly hide notes

    addNoteBtn.addEventListener('click', () => {
        const userEmail = localStorage.getItem('email');
        
        if (!userEmail) {
            alert("User not logged in!");
            return;
        }

        let title = document.getElementById('title').value;
        let descp = document.getElementById('descp').value;

        if (!title || !descp) {
            alert("Please fill in all fields!");
            return;
        }

        let userNotes = JSON.parse(localStorage.getItem(`notes_${userEmail}`)) || [];
        let newNoteObj = { title: title, descp: descp };

        if (addNoteBtn.innerText === "Update Note") {
            let editIndex = document.querySelector('.card').getAttribute('editIndex');
            userNotes[editIndex] = newNoteObj;
        } else {
            userNotes.push(newNoteObj);
        }

        localStorage.setItem(`notes_${userEmail}`, JSON.stringify(userNotes));//UPDATE SAVED IN LOCAL

        document.getElementById('title').value = '';
        document.getElementById('descp').value = '';

        addNoteBtn.innerText = 'Save';

        addNoteContainer.style.display = 'none';

        showAllNotes(); 
    });

 
    //navbar
    let navAddNoteBtn = document.getElementById('navAddNote');
    
    navAddNoteBtn.addEventListener('click', () => {
        addNoteContainer.style.display = 'block'; 
        addNoteBtn.innerText = 'Save';  
    });

    // Show all notes
    function showAllNotes() {
        let notesContainer = document.getElementById('notes');
        notesContainer.innerHTML = ''; // Clear the notes first
        
        const userEmail = localStorage.getItem('email');
        let userNotes = JSON.parse(localStorage.getItem(`notes_${userEmail}`)) || [];
        
        if (userNotes.length === 0) {
            notesContainer.innerHTML = '<p>Start adding notes...</p>';
        } else {
            userNotes.forEach((note, index) => { 
                const noteHTML = `
                    <div class="card">
                        <div class="note-content">
                            <h5 class="note-title">${note.title}</h5>
                            <p class="note-text">${note.descp}</p>
                            <div class="note-buttons">
                                <button class="icon-button" onclick="editNote(${index})">
                                    <img src="pencil.png" alt="Edit" class="icon">
                                </button>
                                <button class="icon-button" onclick="deleteNote(${index})">
                                    <img src="delete.png" alt="Delete" class="icon">
                                </button>
                            </div>
                        </div>
                    </div>`;
                notesContainer.innerHTML += noteHTML;
            });
        }
    }

    // Edit a note
    window.editNote = function(noteIndex) {
        const userEmail = localStorage.getItem('email');
        let userNotes = JSON.parse(localStorage.getItem(`notes_${userEmail}`)) || [];

        let note = userNotes[noteIndex];
        let title = document.getElementById('title');
        let descp = document.getElementById('descp');

        title.value = note.title;
        descp.value = note.descp;

        let editCard = document.querySelector('.card');
        editCard.setAttribute('editIndex', noteIndex);

        addNoteBtn.innerText = 'Update Note'; 
        addNoteContainer.style.display = 'block'; 
    }

    // Delete a note
    window.deleteNote = function(noteIndex) {
        const userEmail = localStorage.getItem('email');
        let allNotes = JSON.parse(localStorage.getItem(`notes_${userEmail}`)) || [];

        allNotes.splice(noteIndex, 1); 
        localStorage.setItem(`notes_${userEmail}`, JSON.stringify(allNotes)); 

        showAllNotes(); 
    }

    // Search notes
    let Search = document.getElementById('search');
    Search.addEventListener('input', () => {
        let inputValue = Search.value.toLowerCase();
        let allCards = document.getElementsByClassName('card');      
        Array.from(allCards).forEach(card => {
            let cardText = card.getElementsByTagName('p')[0].innerText.toLowerCase();
            //console.log(cardText)
            if (cardText.includes(inputValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
 
    showAllNotes();
  
    window.logOut = function() {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        window.location.href = "index.html"; 
    }

});