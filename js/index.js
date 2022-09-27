showCards();

//reset
let btnReset = document.getElementById('btnReset');
btnReset.addEventListener('click', function Reset() {
    let txt = document.getElementById('inputText');

    // console.log("js enabled.")
    txt.value = "";
})

//add
let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', AddNote);

//func to add new note
function AddNote() {
    let notes = localStorage.getItem("notes");
    let txt = document.getElementById('inputText');
    let title = document.getElementById('inputTitle');
    let savedNotesArea = document.getElementById('savedNotes');
    if (txt.value == "" || txt.value == " ") {
        console.log("empty");

    } else {
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        //console.log(txt.value);
        let newNoteObj = {
            "ntitle": title.value,
            "ntxt": txt.value
        }
        //notesObj.push(txt.value);
        notesObj.push(newNoteObj);

        localStorage.setItem("notes", JSON.stringify(notesObj))
        txt.value = "";
        title.value = "";
        // console.log(notesObj);
        showCards();
    }
}

//func to show saved notes  
function showCards() {
    let notes = localStorage.getItem("notes");
    //console.log(`notes value: ` +notes)
    //console.log(`JSPnotes value: ` +JSON.parse(notes))
    if (notes == null) {
        let emptytext = document.createElement('label');
        emptytext.innerText = "No Notes added!!";
        emptytext.style.textAlign = 'center';
        document.getElementById("savedNotes").appendChild(emptytext);
    } else {
        let html = "";

        JSON.parse(notes).forEach(function (element, index) {
            html += `
             <div class="card mx-2 my-2" style="width: 18rem;">
            <div class="card-body">
                <h3 class="fs-6" >Note No. ${index+1}</h3>
                <h5 class="card-title fs-3">${element.ntitle}</h5>
                <p class="card-text">${element.ntxt}</p>
                <button id="${index+1}" onclick="deleteNote(this.id)" class="btn btn-primary">Remove</button>
            </div>
        </div> 

            `
        });

        document.getElementById('savedNotes').innerHTML = `<h4 class="">Saved Notes</h4><hr>` + html;
    }

}

//func to delete note
function deleteNote(idNote) {

    //tried delelting through DOM manipulation
    // let btn=document.getElementById(idNote);
    // console.log('div. '+  btn.parentElement.parentElement);

    notesObj = JSON.parse(localStorage.getItem('notes'));
    notesObj.splice(idNote - 1, 1);
    //  console.log('notesObj length: ' + notesObj.length)
    localStorage.setItem("notes", JSON.stringify(notesObj))

    showCards();
    if (localStorage.getItem('notes') == "[]") {
        window.localStorage.clear();
        showCards();
    }
}

function search(text) {
    // console.log(text);
    localStorage.setItem('search', localStorage.getItem('notes'));

    //org
    //let notesDefault = localStorage.getItem('notes');

    // let notesNow=notesDefault;
    notesObj = JSON.parse(localStorage.getItem('search'));
    console.log("full: " + notesObj);

    for (let index = 0; index < notesObj.length; index++) {
        const element = notesObj[index];
        console.log("element: " + element + "index:  " + index);

        if (!String(element.ntitle).includes(text) && !String(element.ntxt).includes(text)) {
            notesObj.splice(index, 1);
            console.log("truncated: " + notesObj);
            index--;

        }

    }

    // notesObj.forEach(function (element,index) {
    // console.log("element: " + element + "index:  " + index);

    //     if (!String(element).includes(text)) {
    //         notesObj.splice(index,1);
    // console.log("truncated: "+ notesObj);

    //     }
    // });     


    localStorage.setItem('search', JSON.stringify(notesObj))
    showSearchCards();

}

function showSearchCards() {
    let search = localStorage.getItem("search");
    //console.log(`notes value: ` +notes)
    //console.log(`JSPnotes value: ` +JSON.parse(notes))
    if (search == "[]") {
        let html = "";

        JSON.parse(search).forEach(function (element, index) {
            html += `
            <div class="card mx-2 my-2" style="width: 18rem;">
           <div class="card-body">
               <h3 class="fs-6" >Note No. ${index+1}</h3>
               <h5 class="card-title fs-3">${element.ntitle}</h5>
               <p class="card-text">${element.ntxt}</p>
               <button id="${index+1}" onclick="deleteNote(this.id)" class="btn btn-primary">Remove</button>
           </div>
       </div> 

           `
        });

        document.getElementById('savedNotes').innerHTML = `<h4 class="">Saved Notes</h4><hr>` + html;


        let emptytext = document.createElement('label');
        emptytext.innerText = "No Notes found!!";
        emptytext.style.textAlign = 'center';
        document.getElementById("savedNotes").appendChild(emptytext);
    } else {
        let html = "";

        JSON.parse(search).forEach(function (element, index) {
            html += `
            <div class="card mx-2 my-2" style="width: 18rem;">
           <div class="card-body">
               <h3 class="fs-6" >Note No. ${index+1}</h3>
               <h5 class="card-title fs-3">${element.ntitle}</h5>
               <p class="card-text">${element.ntxt}</p>
               <button id="${index+1}" onclick="deleteNote(this.id)" class="btn btn-primary">Remove</button>
           </div>
       </div> 

           `
        });

        document.getElementById('savedNotes').innerHTML = `<h4 class="">Saved Notes</h4><hr>` + html;
    }

}