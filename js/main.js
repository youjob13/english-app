const app = document.querySelector(".app");

class TasksGenerate {
  constructor() {
    this.listQuestions = [
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
    this.rightAnswers = [];
    this.loseAnswers = [];
    this.currentQuestion = 0;
    this.swapsArr = [];
    this.inputValue = "";
  }
  digitalRandom(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
  askQuestion(question) {
    const questionBlock = `<div class='question-block'>
  <h2>${question.word}</h2>
    <input id='field-for-answer' type='text'>
  <div class='question-buttons'>
    <button id='give'>Give answer</button>
    <button id='skip' class='skip-answer'>Skip answer</button>
  </div>
  </div>`;
    app.innerHTML = questionBlock;
  }
  startTask() {
    const cloneArr = [...this.listQuestions];
    this.listQuestions.forEach(() => {
      this.swapsArr.push(
        ...cloneArr.splice(this.digitalRandom(0, cloneArr.length - 1), 1)
      );
    });
    this.askQuestion(this.swapsArr[this.currentQuestion]);
    this.currentQuestion++;
  }
  giveAnswer() {
    if (
      this.inputValue === this.swapsArr[this.currentQuestion - 1].translation
    ) {
      this.rightAnswers.push(this.swapsArr[this.currentQuestion - 1]);
    } else {
      this.loseAnswers.push(this.swapsArr[this.currentQuestion - 1]);
    }

    this.askQuestion(this.swapsArr[this.currentQuestion]);
    this.currentQuestion++;
  }
  skipQuestion() {
    this.askQuestion(this.swapsArr[this.currentQuestion]);
    this.currentQuestion++;
  }
  eventsListener() {
    document.addEventListener("click", (e) => {
      if (e.target.closest("#start")) {
        this.startTask();
      }
      if (e.target.closest("#skip")) {
        this.skipQuestion();
      }
      if (e.target.closest("#give")) {
        this.giveAnswer();
      }
    });
    document.addEventListener("input", (e) => {
      if (e.target.closest("#field-for-answer")) {
        this.inputValue = e.target.value;
      }
    });
  }
}

const task = new TasksGenerate();
task.eventsListener();
