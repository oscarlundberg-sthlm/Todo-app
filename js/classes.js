class Button
{
    constructor(name, btnText, stylingClass) {
        this.name = name;
        this.button = name;
        this.classes = `${thisChore} btn ${stylingClass}`;
        this.btnText = btnText;
    }

    createButton() {
        this.button = document.createElement("input");
        this.button.type = "button";
        this.button.setAttribute("class", this.classes);
        this.button.setAttribute("id", `${this.name}-${thisChore}`);
        this.button.value = this.btnText;
        return this.button;
    }
}