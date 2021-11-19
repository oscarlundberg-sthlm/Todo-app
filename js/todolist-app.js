let newChoreField = document.getElementById("textField-chore0");
let addChoreBtn = document.getElementById("addchore");
let toDoContainer = document.getElementById("todocontainer");
let doneContainer = document.getElementById("donecontainer");
let choresToDo = document.getElementById("chores-todo");
let doneChores = document.getElementById("done-chores");
let underlineSpan, chore, thisChore, choreTextField, appendButtons, 
editBtn, doneBtn, eraseBtn;
let choreNumber = 0;
var errorMessage = "Du behöver skriva något här först";

newChoreField.focus();

choresToDo.innerHTML = localStorage.getItem("choresToDo");
doneChores.innerHTML = localStorage.getItem("doneChores");
setInterval("saveSections()", 20);
function saveSections() {
    localStorage.setItem("choresToDo", choresToDo.innerHTML);
    localStorage.setItem("doneChores", doneChores.innerHTML);
}
choreNumber = document.querySelectorAll(".chore").length;

(function () {
    document.addEventListener("click", function(e) {
        let activeClick = e.target;
        let clickedChore = activeClick.classList[0];
        let activeTextfield = document.getElementById("textField-" + clickedChore);
        let charsPresent;
        let typeWriterClick = new TypewriterBlueprint(activeTextfield.value, clickedChore);

        if (!activeTextfield) {
            return;
        } else {
            charsPresent = /\S/g.test(activeTextfield.value);
        }

        if (activeClick === activeTextfield && activeTextfield.placeholder === errorMessage) {
            removeError(activeTextfield);
        } else if (activeClick === addChoreBtn) {
            
            if (!charsPresent) {
                displayError(newChoreField, errorMessage);
                newChoreField.focus();
            
            } else {
                generateChore();
                newChoreField.placeholder = "Ny syssla...";
                newChoreField.focus();
            }
        } else if (activeClick.id === "editBtn-" + clickedChore) {
            editBtnClicked(activeClick, activeTextfield, charsPresent);

        } else if (activeClick.id === "doneBtn-" + clickedChore) {
            doneBtnClicked(activeTextfield, clickedChore, charsPresent);

        } else if (activeClick.id === "eraseBtn-" + clickedChore) {
            typeWriterClick.erase();

        }
    });
    document.addEventListener("keydown", function(e) {
        let activeTarget = e.target;
        let targetChore = activeTarget.classList[0];
        let activeTextfield = document.getElementById("textField-" + targetChore);
        let charsPresent;

        if (!activeTextfield) {
            return;
        } else {
            charsPresent = /\S/g.test(activeTextfield.value);
        }

        if (targetChore === "chore0") {
            if (e.key === "Enter" && !charsPresent) {
                displayError(activeTarget, errorMessage);
            } else if (e.key === "Enter" && charsPresent) {
                generateChore(); 
                removeError(activeTarget);
                activeTarget.placeholder = "Ny syssla...";
            } else {
                return;
            }
        } else {
            if (e.key === "Enter" && !charsPresent) {
                displayError(activeTarget, errorMessage);
            } else if (e.key === "Enter" && charsPresent) { 
                removeError(activeTarget);
                activeTextfield.setAttribute("value", activeTextfield.value);
                activeTarget.setAttribute("readonly", "readonly");
                document.getElementById("editBtn-" + targetChore).value = "Ändra";
            } else {
                return;
            }
        }
    });
    document.addEventListener("input", function(e) {
        removeError(e.target);
    });
})();

function generateChore() {
    let choreValue;
    choreNumber++;
    while (document.querySelector(".chore" + choreNumber)) {
        choreNumber++;
    };
    thisChore = "chore" + choreNumber;

    choreValue = newChoreField.value; 
    newChoreField.value = "";

    chore = document.createElement("div");
    chore.setAttribute("class", `${thisChore} chore input-group input-group-sm left-margin`);
    chore.innerHTML = `<div class='input-group-prepend'>
    <span class='input-group-text'>●</span>
    </div>`;

    choreTextField = document.createElement("input");
    choreTextField.setAttribute("type", "text");
    choreTextField.setAttribute("class", `${thisChore} form-control`);
    choreTextField.setAttribute("id", "textField-" + thisChore);
    choreTextField.style.backgroundColor = "#FFFFFF00";
    choreTextField.style.paddingLeft = "40px";
    choreTextField.setAttribute("value", choreValue);
    choreTextField.setAttribute("readonly", "readonly");
    chore.appendChild(choreTextField);

    appendButtons = document.createElement("div");
    appendButtons.setAttribute("class", "input-group-append");
    chore.appendChild(appendButtons);

    editBtn = new Button("editBtn", "Ändra", "btn-outline-secondary");
    appendButtons.appendChild(editBtn.createButton());

    doneBtn = new Button("doneBtn", "Färdig", "btn-outline-success");
    appendButtons.appendChild(doneBtn.createButton());

    eraseBtn = new Button("eraseBtn", "Radera", "btn-outline-danger");
    appendButtons.appendChild(eraseBtn.createButton());

    underlineSpan = document.createElement("span");
    underlineSpan.setAttribute("class", "underline");
    underlineSpan.setAttribute("id", "span-" + thisChore);
    
    underlineSpan.appendChild(chore);
    choresToDo.appendChild(underlineSpan);
}

function editBtnClicked(activeClick, activeTextfield, charsPresent) {
    if (activeClick.value === "Ändra") {
        activeTextfield.removeAttribute("readonly");
        activeTextfield.focus();
        activeTextfield.setSelectionRange(activeTextfield.value.length, activeTextfield.value.length);
        activeClick.value = "Spara";
    } else if (activeClick.value === "Spara") {
        
        if (!charsPresent) {
            displayError(activeTextfield, errorMessage);
            activeTextfield.focus();
        } else {
            removeError(activeTextfield);
            activeTextfield.setAttribute("value", activeTextfield.value);
            activeTextfield.setAttribute("readonly", "readonly");
            activeClick.value = "Ändra";
        }
    };
}

function doneBtnClicked(activeTextfield, clickedChore, charsPresent) {
    if (!charsPresent) {
        displayError(activeTextfield, errorMessage);
        activeTextfield.focus();
    } else if (document.getElementById("editBtn-" + clickedChore).value === "Spara") {
        return;
    } else {
        removeError(activeTextfield);
        doneChores.appendChild(document.getElementById("span-" + clickedChore));
        document.getElementById("doneBtn-" + clickedChore).remove();
    }
}

function displayError(activeTextfield, errorMessage) {
    activeTextfield.placeholder = errorMessage;

    activeTextfield.parentNode.parentNode.style.animationName = "errorMessage";
    activeTextfield.parentNode.parentNode.style.animationDuration = "0.5s";
    activeTextfield.parentNode.parentNode.style.animationIterationCount = "infinite";
    activeTextfield.parentNode.parentNode.style.animationDirection= "alternate";
}
function removeError(activeTextfield) {
    activeTextfield.placeholder = "";
   
    activeTextfield.parentNode.parentNode.style.animationName = "";
    activeTextfield.parentNode.parentNode.style.animationDuration = "";
    activeTextfield.parentNode.parentNode.style.animationIterationCount = "";
    activeTextfield.parentNode.parentNode.style.animationDirection= "";
}