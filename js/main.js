const startBtn = document.getElementById("start");
const skipAnswerBtn = document.getElementById("skip");
const app = document.querySelector(".app");
let giveAnswerBtn;
const arr = [
  {
    id: 0,
    word: "Apple",
    translation: "Яблоко",
  },
  {
    id: 1,
    word: "Burn",
    translation: "Сжигать",
  },
  {
    id: 2,
    word: "Obviously",
    translation: "Очевидно",
  },
  {
    id: 3,
    word: "Cause",
    translation: "Причина",
  },
  {
    id: 4,
    word: "Exactly",
    translation: "Именно",
  },
];
const rightAnswer = [];
const loseAnswer = [];
// Returns a random number in a given range
function digitalRandom(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function giveAnswer(e) {
  e.preventDefault();
  //   const inputForAnswer = document.getElementById("field-for-answer");
  console.log(1);
  console.log(inputForAnswer.value);
}
function askQuestion(question) {
  const questionBlock = `<div class='question-block'>
<h2>${question.word}</h2>
  <p>${question.translation}</p>
    <input id='field-for-answer' type='text'>
  <div class='question-buttons'>
    <button id='give'>Give answer</button>
    <button id='skip' class='skip-answer'>Skip answer</button>
  </div>
  </div>`;
  app.innerHTML = questionBlock;
  giveAnswerBtn = document.getElementById("give");
}

function completeQuestion(answer, bool) {
  if (answer === bool) {
    rightAnswer.push(answer);
  } else {
    loseAnswer.push(answer);
  }
}

// Run the test
function startTest() {
  const swapsArr = [];
  const cloneArr = [...arr];
  arr.forEach(() => {
    swapsArr.push(...cloneArr.splice(digitalRandom(0, cloneArr.length - 1), 1));
  });
  console.table(swapsArr);
  askQuestion(swapsArr[0]);
}

startBtn.addEventListener("click", startTest);
// skipAnswerBtn.addEventListener("click", );
giveAnswerBtn.addEventListener("click", giveAnswer);
