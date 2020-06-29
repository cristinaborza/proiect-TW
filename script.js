window.onload = makeChanges;

function makeChanges() {
    scrieMesaj();
    citesteNume();
    afisareTitlu();
    schimbaStil();
    submitForm();
    buildQuiz();
}

function scrieMesaj() {  
    let citate = ["<q>A journey of a thousand miles must begin with a single step.</q> - Lao Tzu", 
                  "<q>Travel is fatal to prejudice, bigotry and narrow-mindedness.</q> - Mark Twain", 
                  "<q>To travel is to take a journey into yourself.</q> - Danny Kaye", 
                  "<q>Not all those who wander are lost.</q> - J.R.R. Tolkien", 
                  "<q>Once a year, go someplace you’ve never been before.</q> - Dalai Lama", 
                  "<q>A ship in harbor is safe, but that is not what ships are built for.</q> - John A. Shedd", 
                  "<q>Travel, in the younger sort, is a part of education; in the elder, a part of experience.</q> - Francis Bacon", 
                  "<q>Not until we are lost do we begin to understand ourselves.</q> - Henry David Thoreau", 
                  "<q>The world is a book, and those who do not travel read only one page.</q> - Saint Augustine", 
                  "<q>To live is the rarest thing in the world. Most people just exist.</q> - Oscar Wilde"];
    let pos = Math.floor(Math.random() * 10);
    document.getElementById("p_citat").innerHTML = citate[pos];
}

function citesteNume() {
    var nume = prompt("Enter your name: ");
    document.title = "Salut, " + nume + "!";
    setTimeout(reseteazaTitlu, 2000);
}

function reseteazaTitlu() {
    document.title = "Travel blog";
}

function replace(str, pos, ch) {
    str = str.substring(0, pos) + ch + str.substring(pos + 1);
    return str;
}

let idx = 0;
let txt = "Travel blog";
let aux = "           "
function afisareTitlu() {
    let speed = 100;
    if(idx <= txt.length - idx - 1) {
        aux = replace(aux, idx, txt.charAt(idx));
        if(idx != txt.length - idx - 1) {
            aux = replace(aux, txt.length - idx - 1, txt.charAt(txt.length - idx - 1));
        }

        document.getElementById("titluPagina").innerHTML = aux;
        ++idx;
        setTimeout(afisareTitlu, speed);
    }
}

function getChar(sec) {
    let hour = Math.floor(sec / 3600);
    if(hour == 0) {
        hour = "00:"
    } else if(hour < 10){
        hour = "0" + hour + ":";
    } else {
        hour = hour + ":";
    }

    sec = sec % 3600;
    let min = Math.floor(sec / 60);
    if(min == 0) {
        min = "00:"
    } else if(min < 10){
        min = "0" + min + ":";
    } else {
        min = min + ":";
    }

    sec = sec % 60;
    if(sec == 0) {
        sec = "00"
    } else if(sec < 10){
        sec = "0" + sec;
    } 
    let ans = hour + min + sec;
    return ans;
}


var timer;
var timerStart;
var timeSpentOnSite = getTimeSpentOnSite();

function getTimeSpentOnSite(){
    let loc = window.location.href;

    timeSpentOnSite = parseInt(localStorage.getItem(loc));
    timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
    return timeSpentOnSite;
}

function startCounting(){
    timerStart = Date.now();
    timer = setInterval(function(){
        let loc = window.location.href;
        timeSpentOnSite = getTimeSpentOnSite()+(Date.now()-timerStart);
        localStorage.setItem(loc,timeSpentOnSite);
        timerStart = parseInt(Date.now());
        document.getElementById("p_footer").innerHTML = "(c) Cristina Borza. Timp petrecut pe aceasta pagina - " + getChar(parseInt(timeSpentOnSite/1000));
    },1000);
}

startCounting();

function schimbaStil() {
    let fontColor = localStorage.getItem("color");
    let font = localStorage.getItem("font");
    let fontSize = localStorage.getItem("fontSize");

    if (fontSize != null && fontSize.length > 2 && parseInt(fontSize) >= 10 && parseInt(fontSize) <= 25) {
        //dezactivez butoanele
        document.getElementById("font").disabled = true;
        document.getElementById("color").disabled = true;
        document.getElementById("size").disabled = true;

        //se nu mai apara butonul schimba
        document.getElementById("schimba").style.display = "none";

        //fac schimbarile
        document.getElementById("continut").style.color = fontColor;
        document.getElementById("continut").style.fontFamily = font;
        document.getElementById("continut").style.fontSize = fontSize;

        //sa apara butonul reset
        document.getElementById("reset").style.display = "initial";
    }
}

function retineStil() {
    localStorage.setItem("color", document.getElementById("color").value);
    localStorage.setItem("font", document.getElementById("font").value);
    localStorage.setItem("fontSize",  document.getElementById("size").value);
    schimbaStil();
}

function uitaStil() {
    localStorage.removeItem("color");
    localStorage.removeItem("font");
    localStorage.removeItem("fontSize");
    location.reload();
}

let myQuestions = [{
    intrebare: "Where are the Whitsunday Islands located?",
    raspunsuri: [["Malaysia", false], ["Vietnam", false], ["Philippines", false], ['Australia', true]]
}, {
    intrebare: "Which of these countries ISN’T landlocked?",
    raspunsuri: [["Turkey", true], ["Nepal", false], ["Austria", false], ["Romania", true]]
}, {
    intrebare: "Which is the largest US state?",
    raspunsuri: [["Alaska", true], ["Florida", false], ["Michigan", false], ["Wisconsin", false]]
}, {
    intrebare: "How many provinces are there in Canada?",
    raspunsuri: [["5", false], ["10", true], ["20", false], ["30", false]]
}, {
    intrebare: "Which two countries in South America are the Iguazu Falls part of?",
    raspunsuri: [["Keniya", false], ["Brazil", true], ["Tanzania", false], ["Argentina", true]]
}]

function buildQuiz() {
    if(window.location.href == "http://localhost:3000/quiz") {
        for(let i = 0; i < myQuestions.length; ++ i) {
            addItem(myQuestions[i], i + 1);
        }
    }
}

function addItem(myQuestion, noQuestion) {
    let quizContainer =  document.getElementById("quiz");
    let resultsContainer = document.getElementById('results');
    let submitButton = document.getElementById('submit');

    let myLi = document.createElement("li");
    myLi.innerText = myQuestion["intrebare"];

    let myOl = document.createElement("ol");
    myOl.setAttribute("id", "question");
    myOl.setAttribute("type", "a");

    for(let i = 0; i < myQuestion["raspunsuri"].length; ++ i) {
        myListItem = document.createElement("li");

        let myLabel = document.createElement("label");
        myLabel.setAttribute("for", "myCheck");
        myLabel.innerText = myQuestion["raspunsuri"][i][0];

        let myCheckButton = document.createElement("input");
        myCheckButton.setAttribute("type", "checkbox");
        myCheckButton.setAttribute("class", "myCheck");

        myListItem.appendChild(myLabel);
        myListItem.appendChild(myCheckButton);

        myOl.appendChild(myListItem);
    }
    
    myLi.appendChild(myOl);
    quizContainer.appendChild(myLi);
}

function showResults() {
    let results = document.getElementsByClassName("myCheck");
    let idx = 0;
    let finalResult = 0;
    for(let i = 0; i < myQuestions.length; ++ i) {
        let point = 1;
        for(let j = 0; j < myQuestions[i]["raspunsuri"].length; ++ j) {
            if(myQuestions[i]["raspunsuri"][j][1] != results[idx].checked) {
                point = 0;
            }

            results[idx].disabled = true;
            ++idx;
        }

        finalResult += point;
    }

    let msg = document.createElement("p");
    msg.innerText = "Your score:  " + finalResult + "/5!";
    document.getElementById("results").appendChild(msg);
    
    let submitButton = document.getElementById('submit');
    submitButton.disabled = true;
}

function submitForm() {
    let aux = document.getElementById("form");
    if (aux != null)
        document.getElementById("form").onsubmit = ValidateForm;
}

function ValidateForm() {
    document.getElementById("invalidFname").innerText = "";
    document.getElementById("invalidLname").innerText = "";
    document.getElementById("invalidEmail").innerText = "";
    document.getElementById("invalidPhone").innerText = "";

    var ok = true;

    //verificare nume
    var nume = document.getElementById("fname").value;
    console.log(nume);

    if (nume == "") {
        document.getElementById("invalidFname").innerText = "Invalid first name!";
        ok = false;
    }

    //verificare prenume
    var pren = document.getElementById("lname").value;
    if (pren == "") {
        document.getElementById("invalidLname").innerText = "Invalid last name!";
        ok = false;
    }

    // verificare adresa de e-mail
    var x = document.getElementById("email").value;
    console.log(x);
    if (x == "") {
        document.getElementById("invalidEmail").innerText = "Invalid e-mail!";
        ok = false;
    }

    if (x.includes("@") == false) {
        document.getElementById("invalidEmail").innerText = "Invalid e-mail!";
        ok = false;
    }

    else if (x.includes(".") == false) {
        document.getElementById("invalidEmail").innerText = "Invalid e-mail!";
        ok = false;
    }

    else if (x.lastIndexOf("@") != x.indexOf("@")) {
        document.getElementById("invalidEmail").innerText = "Invalid e-mail!";
        ok = false;
    }

    else if (x.lastIndexOf(".") < x.lastIndexOf("@") || x.lastIndexOf("@") == x.lastIndexOf(".") - 1) {
        document.getElementById("invalidEmail").innerText = "Invalid e-mail!";
        ok = false;
    }

    else if (x.lastIndexOf(".") == x.length - 1) {
        document.getElementById("invalidEmail").innerText = "Invalid e-mail!";
        ok = false;
    }

    //verificare numar telefon
    let nr_tel = document.getElementById("phone").value;
    console.log(nr_tel);
    if (nr_tel == "") {
        document.getElementById("invalidPhone").innerText = "Invalid phone number!";
        ok = false;

        console.log("cuv vid");
    }

    else if (nr_tel.length != 12 && nr_tel.length != 13) {
        document.getElementById("invalidPhone").innerText = "Invalid phone number!";
        ok = false;

        console.log("lg incorecta");
    } 

    else if ((nr_tel[0] != '0' || nr_tel[1] != '0' || nr_tel[2] != '4' || nr_tel[3] != '0' || nr_tel[4] != '7') && (nr_tel[0] != '+' || nr_tel[1] != '4' || nr_tel[2] != '0' || nr_tel[3] != '7')) {
        document.getElementById("invalidPhone").innerText = "Invalid phone number!";
        ok = false;

        console.log("prefix gresit 004");
    }

    if (ok == false) {
        return false;
    }

    //alert ("Multumim pentru mesaj!");
}

//galeria foto
var slideIndex = 1;
showSlides(slideIndex);

function plusSlide (x) {
    slideIndex = slideIndex + x;
    let slides = document.getElementsByClassName("mySlides");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    if (slideIndex > slides.length) {
        slideIndex = 1
    }

    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    
    slides[slideIndex-1].style.display = "block";  
}

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");

    if (typeof slides[0] != 'undefined') {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }

        if (slideIndex > slides.length) {
            slideIndex = 1
        }

        if (slideIndex < 1) {
            slideIndex = slides.length;
        }
        
        slides[slideIndex-1].style.display = "block";  
        slideIndex++;
        setTimeout(showSlides, 3000);
    }
}

function paginaQuiz() {
    location.href = "/quiz";
}

function afisComm() {
    location.href = "/comentarii";
}

function paginaLogIn() {
    location.href = "/login";
}

function paginaProfil() {
    location.href = "/profile";
}

function userLogOut() {
    fetch('http://localhost:3000/logout',{
        method: 'POST'
    }).then((response) => {
        if(response.status === 200){
            document.getElementById('logoutResponse').innerHTML = 'Ai iesit din cont';
            document.getElementsByClassName('info_login')[0].innerHTML = '';
        }
    })
}

function afiseazaComentariu() {
    url = 'http://localhost:3000/comentarii/BD'
    myDate = document.getElementById('commDate').value;
    console.log(myDate);

    let table = document.getElementById("tabelComentarii");
    let nr = table.rows.length;
    
    for(let i = 1; i < nr; ++ i) {
        table.deleteRow(1);
    }

    fetch(url)
    .then(response => {
        return response.json()
        })
    .then(function(date) {
        return date["comentarii"];
    })
    .then(function(res){
        for(let i = 0; i < res.length; ++ i) {
            if(res[i].date == myDate) {
                var row = table.insertRow(1);
                
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                cell1.innerHTML = res[i].lname;
                cell2.innerHTML = res[i].fname;
                cell3.innerHTML = res[i].date;
                cell4.innerHTML = res[i].message;
            }
        }
    });    
}

function sorteazaComentarii() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tabelComentarii");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;
        for(i = 1; i < (rows.length - 1); ++ i) {
            shouldSwitch = false;
            nume_x = rows[i].getElementsByTagName("td")[0];
            nume_y = rows[i + 1].getElementsByTagName("td")[0];

            pren_x = rows[i].getElementsByTagName("td")[1];
            pren_y = rows[i + 1].getElementsByTagName("td")[1];

            comm_x = rows[i].getElementsByTagName("td")[3];
            comm_y = rows[i + 1].getElementsByTagName("td")[3];

            if (nume_x.innerHTML.toLowerCase() > nume_y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            } else if(nume_x.innerHTML.toLowerCase() == nume_y.innerHTML.toLowerCase() && pren_x.innerHTML.toLowerCase() > pren_y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            } else if(nume_x.innerHTML.toLowerCase() == nume_y.innerHTML.toLowerCase() && pren_x.innerHTML.toLowerCase() == pren_y.innerHTML.toLowerCase() && comm_x.innerHTML.length > comm_y.innerHTML.length) {
                shouldSwitch = true;
                break;
            }
        }
        
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

