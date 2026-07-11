// ==========================================
// BEST FRIEND QUIZ
// Part 1
// ==========================================

// ---------- ELEMENTS ----------

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const playerNameInput = document.getElementById("playerName");
const startQuizBtn = document.getElementById("startQuiz");

const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");

const submitBtn = document.getElementById("submitAnswer");

const feedbackMessage = document.getElementById("feedbackMessage");

const progressFill = document.getElementById("progressFill");

const questionNumber = document.getElementById("questionNumber");
const totalQuestions = document.getElementById("totalQuestions");

const scoreDisplay = document.getElementById("scoreDisplay");

const finalScore = document.getElementById("finalScore");
const playerGreeting = document.getElementById("playerGreeting");

const scoreMessage = document.getElementById("scoreMessage");
const scoreDescription = document.getElementById("scoreDescription");

const highestScoreResult = document.getElementById("highestScoreResult");
const percentageResult = document.getElementById("percentageResult");

const playAgainBtn = document.getElementById("playAgain");

const certificateName = document.getElementById("certificateName");
const certificateScore = document.getElementById("certificateScore");

const bestScore = document.getElementById("bestScore");

const downloadCertificate =
document.getElementById("downloadCertificate");

const themeBtn = document.getElementById("themeBtn");

// ==========================================
// QUESTIONS
// ==========================================

const quiz = [

{
question:"1. What is my favourite colour?",
answer:"Orange"
},

{
question:"2. Which subject do I like the most?",
answer:"Maths"
},

{
question:"3. My favourite food?",
answer:"Aloo ki Sabzi"
},

{
question:"4. What is my favourite drink?",
answer:"Water"
},

{
question:"5. What game do I play the most?",
answer:"Math Incremental"
},

{
question:"6. My favourite animal?",
answer:"Cat"
},

{
question:"7. My favourite hobby?",
answer:"Playing Roblox"
},

{
question:"8. Favourite season?",
answer:"Summer"
},

{
question:"9. Favourite festival?",
answer:"Holi"
},

{
question:"10. Favourite place?",
answer:"Home"
},

{
question:"11. Favourite street food?",
answer:"Momos"
},

{
question:"12. What do I talk the most?",
answer:"Nonsense"
},

{
question:"13. What do I overthink?",
answer:"Everything"
},

{
question:"14. Which superpower would I choose?",
answer:"Time Manipulation"
},

{
question:"15. Complete the sentence: I always ____.",
answer:"I always top in class"
}

];

// ==========================================
// VARIABLES
// ==========================================

let currentQuestion = 0;

let score = 0;

let playerName = "";

totalQuestions.textContent = quiz.length;

// ==========================================
// FUNNY MESSAGES
// ==========================================

const correctMessages = [

"🔥 You're reading my mind!",

"😎 Bro knows me too well!",

"🎉 Perfect!",

"🧠 500 IQ Answer!",

"😂 Suspiciously correct!",

"🚀 Amazing!",

"⭐ Legendary Guess!",

"🏆 Friendship Level +100"

];

const wrongMessages = [

"😂 Nice try!",

"🙈 Not even close!",

"💀 Oops!",

"🤣 That was creative... but wrong.",

"😭 I expected better.",

"😆 Friendship loading...",

"🤦 Nope!",

"☠ Better luck next question!"

];

// ==========================================
// HIGH SCORE
// ==========================================

function loadHighScore(){

const saved = localStorage.getItem("bestFriendHighScore");

if(saved===null){

bestScore.textContent="0 / 15";

}else{

bestScore.textContent=saved+" / 15";

}

}

loadHighScore();

// ==========================================
// START QUIZ
// ==========================================

startQuizBtn.addEventListener("click",()=>{

playerName = playerNameInput.value.trim();

if(playerName===""){

alert("Please enter your name!");

return;

}

currentQuestion=0;

score=0;

scoreDisplay.textContent=0;

welcomeScreen.classList.remove("active");

resultScreen.classList.remove("active");

quizScreen.classList.add("active");

loadQuestion();

});

// Press Enter to submit

answerInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

submitBtn.click();

}

});// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    const q = quiz[currentQuestion];

    questionText.textContent = q.question;

    questionNumber.textContent = currentQuestion + 1;

    answerInput.value = "";

    answerInput.focus();

    feedbackMessage.textContent = "";

    const progress =
        ((currentQuestion) / quiz.length) * 100;

    progressFill.style.width = progress + "%";

}

// ==========================================
// NORMALIZE TEXT
// ==========================================

function normalize(text){

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g," ")
        .replace(/\s+/g," ")
        .trim();

}

// ==========================================
// LEVENSHTEIN DISTANCE
// (Typos Allowed)
// ==========================================

function levenshtein(a,b){

    const matrix=[];

    for(let i=0;i<=b.length;i++){

        matrix[i]=[i];

    }

    for(let j=0;j<=a.length;j++){

        matrix[0][j]=j;

    }

    for(let i=1;i<=b.length;i++){

        for(let j=1;j<=a.length;j++){

            if(b.charAt(i-1)==a.charAt(j-1)){

                matrix[i][j]=matrix[i-1][j-1];

            }else{

                matrix[i][j]=Math.min(

                    matrix[i-1][j-1]+1,

                    matrix[i][j-1]+1,

                    matrix[i-1][j]+1

                );

            }

        }

    }

    return matrix[b.length][a.length];

}

// ==========================================
// ACCEPTED ANSWERS
// ==========================================

const aliases={

    "orange":[
        "orange"
    ],

    "maths":[
        "maths",
        "math",
        "mathematics"
    ],

    "aloo ki sabzi":[
        "aloo ki sabzi",
        "aloo sabzi",
        "aloo curry",
        "potato curry"
    ],

    "water":[
        "water"
    ],

    "rivals":[
        "rivals"
    ],

    "cat":[
        "cat",
        "cats"
    ],

    "playing roblox":[
        "playing roblox",
        "roblox",
        "play roblox"
    ],

    "summer":[
        "summer"
    ],

    "holi":[
        "holi"
    ],

    "home":[
        "home",
        "my home",
        "house"
    ],

    "momos":[
        "momos",
        "momo"
    ],

    "nonsense":[
        "nonsense",
        "random things",
        "random"
    ],

    "everything":[
        "everything",
        "all",
        "everything lol"
    ],

    "time manipulation":[
        "time manipulation",
        "control time",
        "time control",
        "manipulate time"
    ],

    "i always top in class":[
        "i always top in class",
        "top in class",
        "always top in class"
    ]

};

// ==========================================
// SMART ANSWER CHECK
// ==========================================

function isCorrect(userAnswer, correctAnswer){

    const user = normalize(userAnswer);

    const correct = normalize(correctAnswer);

    // Exact

    if(user===correct){

        return true;

    }

    // Contains answer

    if(user.includes(correct)){

        return true;

    }

    // Aliases

    if(aliases[correct]){

        for(const item of aliases[correct]){

            const alias=normalize(item);

            if(user===alias){

                return true;

            }

            if(user.includes(alias)){

                return true;

            }

            if(levenshtein(user,alias)<=2){

                return true;

            }

        }

    }

    // Typo tolerance

    if(levenshtein(user,correct)<=2){

        return true;

    }

    return false;

}// ==========================================
// SUBMIT ANSWER
// ==========================================

submitBtn.addEventListener("click", () => {

    const userAnswer = answerInput.value.trim();

    if (userAnswer === "") {

        alert("Please enter an answer!");

        return;

    }

    const correctAnswer = quiz[currentQuestion].answer;

    const correct = isCorrect(userAnswer, correctAnswer);

    if (correct) {

        score++;

        scoreDisplay.textContent = score;

        feedbackMessage.style.color = "#7CFF7C";

        feedbackMessage.textContent =
            correctMessages[
                Math.floor(Math.random() * correctMessages.length)
            ];

    } else {

        feedbackMessage.style.color = "#FF9B9B";

        feedbackMessage.textContent =
            wrongMessages[
                Math.floor(Math.random() * wrongMessages.length)
            ] +
            " Correct answer: " +
            correctAnswer;

    }

    submitBtn.disabled = true;

    answerInput.disabled = true;

    setTimeout(() => {

        currentQuestion++;

        submitBtn.disabled = false;

        answerInput.disabled = false;

        if (currentQuestion >= quiz.length) {

            finishQuiz();

        } else {

            loadQuestion();

        }

    }, 1400);

});

// ==========================================
// FINISH QUIZ
// ==========================================

function finishQuiz() {

    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");

    finalScore.textContent = score;

    playerGreeting.textContent =
        `Great job, ${playerName}!`;

    certificateName.textContent = playerName;

    certificateScore.textContent =
        `${score} / ${quiz.length}`;

    const percentage =
        Math.round((score / quiz.length) * 100);

    percentageResult.textContent =
        percentage + "%";

    progressFill.style.width = "100%";

    if (score === 15) {

        scoreMessage.textContent =
            "👑 PERFECT SCORE!";

        scoreDescription.textContent =
            "You officially know me better than anyone!";

    }

    else if (score >= 14) {

        scoreMessage.textContent =
            "🏆 Best Friend Confirmed!";

        scoreDescription.textContent =
            "That was seriously impressive!";

        launchConfetti();

    }

    else if (score >= 10) {

        scoreMessage.textContent =
            "😎 Awesome!";

        scoreDescription.textContent =
            "You're definitely a close friend.";

    }

    else if (score >= 7) {

        scoreMessage.textContent =
            "🙂 Not Bad!";

        scoreDescription.textContent =
            "You know me fairly well.";

    }

    else {

        scoreMessage.textContent =
            "😂 We need to hang out more.";

        scoreDescription.textContent =
            "Looks like you need another try.";

    }

    saveHighScore();

}// ==========================================
// SAVE HIGH SCORE
// ==========================================

function saveHighScore() {

    let highest =
        Number(localStorage.getItem("bestFriendHighScore")) || 0;

    if (score > highest) {

        highest = score;

        localStorage.setItem(
            "bestFriendHighScore",
            highest
        );

    }

    bestScore.textContent =
        highest + " / " + quiz.length;

    highestScoreResult.textContent =
        highest + " / " + quiz.length;

}

// ==========================================
// CONFETTI
// ==========================================

function launchConfetti() {

    const container =
        document.getElementById("confettiContainer");

    const colors = [
        "#ff4d6d",
        "#00d2ff",
        "#00ff87",
        "#ffd93d",
        "#ffffff",
        "#9b5cff",
        "#ff914d"
    ];

    for (let i = 0; i < 180; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.top = "-20px";

        piece.style.background =
            colors[
                Math.floor(Math.random() * colors.length)
            ];

        piece.style.width =
            (6 + Math.random() * 8) + "px";

        piece.style.height =
            (10 + Math.random() * 12) + "px";

        piece.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 5000);

    }

}

// ==========================================
// DOWNLOAD CERTIFICATE
// ==========================================

downloadCertificate.addEventListener("click", () => {

    html2canvas(
        document.getElementById("certificate")
    ).then(canvas => {

        const link =
            document.createElement("a");

        link.download =
            `${playerName}-certificate.png`;

        link.href =
            canvas.toDataURL("image/png");

        link.click();

    });

});

// ==========================================
// PLAY AGAIN
// ==========================================

playAgainBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    playerNameInput.value = "";

    scoreDisplay.textContent = "0";

    progressFill.style.width = "0%";

    resultScreen.classList.remove("active");

    quizScreen.classList.remove("active");

    welcomeScreen.classList.add("active");

    loadHighScore();

});

// ==========================================
// DARK MODE
// ==========================================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon =
        themeBtn.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.className =
            "fa-solid fa-sun";

        localStorage.setItem(
            "quizTheme",
            "dark"
        );

    } else {

        icon.className =
            "fa-solid fa-moon";

        localStorage.setItem(
            "quizTheme",
            "light"
        );

    }

});

// Restore saved theme

const savedTheme =
    localStorage.getItem("quizTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.querySelector("i").className =
        "fa-solid fa-sun";

}

// ==========================================
// INITIALIZE
// ==========================================

loadQuestion();

loadHighScore();