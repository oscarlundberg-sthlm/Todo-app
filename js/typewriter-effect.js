function TypewriterBlueprint(textString, target) {
    this.erase = function() {
        let shorterText;
        let speed = (60 / textString.length) ** 1.8;
            async function timeOut(shorterText, textString, target, speed) {
                for (let i = textString.length - 1; i >= 0; i--) {
                    let myPromise = new Promise(function(myResolve, myReject) {
                        setTimeout(function() {
                            shorterText = textString.slice(0, i);
                            myResolve(shorterText);
                        }, speed, i, shorterText, textString);
                    });
                    document.getElementById("textField-" + target).value = await myPromise;
                }
                document.getElementById("span-" + target).remove();
            }
            timeOut(shorterText, textString, target, speed);
    }
}