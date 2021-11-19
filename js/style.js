let content = document.getElementById("content");
let windowheight = window.innerHeight;
let bottomFiller = document.getElementById("bottomfiller");
let extraRows;

document.body.style.overflowX = "hidden";

while (windowheight == document.body.offsetHeight) {
    extraRows = document.createElement("span");
    extraRows.setAttribute("class", "underline");
    extraRows.style.overflowY = "hidden";
    bottomFiller.appendChild(extraRows);
}
bottomFiller.lastElementChild.remove();

(function () {
    document.addEventListener("click", function() {
        compareHeight()
    });
    document.addEventListener("keydown", function() {
        compareHeight()
    });
})();

function compareHeight() {
    if (windowheight < document.body.offsetHeight) {
        content.style.height = "fit-content";
    } else if (windowheight >= document.body.offsetHeight) {
        content.style.height = "100vh";
    };

    if ((content.offsetHeight - bottomFiller.offsetHeight) < windowheight) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "visible";
    }
}