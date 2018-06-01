mouseVibration = function (mouse) {
    if (!mouse) {
        let allbuttons = document.getElementsByTagName("a");

        for (let i = 0; i < allbuttons.length; i++) {
            allbuttons[i].addEventListener("mouseenter", function () {

                let xhr = new XMLHttpRequest();
                xhr.open('GET', "http://localhost:3000/", true);
                xhr.send();
                console.log(xhr);

            });
        }
    } else {
        allbuttons[i].addEventListener("mouseenter", function () {
            console.log("do nothing");
        });
    }
}