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
    this.skipAnswers = [];
    this.swapsArr = [];
    this.inputValue = "";
  }
  digitalRandom(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
  giveResult() {
    const result = `
    <div class='result-block'>
      <h2>Ну повезет еще в чем нибудь! ^_=</h2>
      <div class='result-score'>
        <p>Правильных ответов - ${this.rightAnswers.length}</p>
        <p>Неправильных ответов - ${this.loseAnswers.length}</p>
        <p>Пропущенных ответов - ${this.skipAnswers.length}</p>
      </div>
      <div class='result-buttons'>
        <button id='try-again'>Пройти заново</button>
        <button id='show-result'>Посмотреть результаты</button>
        <button id='go-to-menu'>Перейти в меню</button>
      </div>
    </div>`;
    app.innerHTML = result;
  }
  askQuestion(question) {
    if (!this.swapsArr[0]) {
      this.giveResult();
    } else {
      const questionBlock = `
      <div class='question-block'>
        <h2>${question.word}</h2>
        <input id='field-for-answer' type='text'>
        <div class='question-buttons'>
          <button id='give'>Give answer</button>
          <button id='skip'>Skip question</button>
        </div>
      </div>`;
      app.innerHTML = questionBlock;
    }
  }
  startTask() {
    this.loseAnswers = [];
    this.skipAnswers = [];
    this.rightAnswers = [];

    const cloneArr = [...this.listQuestions];
    this.listQuestions.forEach(() => {
      this.swapsArr.push(
        ...cloneArr.splice(this.digitalRandom(0, cloneArr.length - 1), 1)
      );
    });
    this.askQuestion(this.swapsArr[0]);
  }
  giveAnswer() {
    if (this.inputValue.trim() === this.swapsArr[0].translation) {
      this.rightAnswers.push(this.swapsArr[0]);
    } else if (!this.inputValue.trim()) {
      alert("Write something");
      // !!! this.inputValue <- empty field !!!
      return;
    } else {
      this.loseAnswers.push({
        ...this.swapsArr[0],
        userAnswer: this.inputValue,
      });
    }

    this.inputValue = "";
    this.swapsArr.splice(0, 1);
    this.askQuestion(this.swapsArr[0]);
  }
  skipQuestion() {
    this.skipAnswers.push(this.swapsArr[0]);
    this.swapsArr.splice(0, 1);
    this.askQuestion(this.swapsArr[0]);
  }
  getListContent(answers) {
    const fragment = new DocumentFragment();
    answers.forEach((answer) => {
      const li = document.createElement("li");
      li.append(answer.translation);
      fragment.append(li);
    });
    return fragment;
  }
  showResults() {
    // Block wrapper
    const results = document.createElement("div");
    results.classList.add("extended-results");
    // Close button
    const closeBtn = document.createElement("div");
    closeBtn.classList.add("closeBtn");
    // Lists wrappers
    const resultsTrue = document.createElement("div");
    resultsTrue.classList.add("result-list");
    const resultsLose = document.createElement("div");
    resultsLose.classList.add("result-list");
    const resultsSkip = document.createElement("div");
    resultsSkip.classList.add("result-list");
    // Titles
    const h3Right = document.createElement("h3");
    const h3Lose = document.createElement("h3");
    const h3Skip = document.createElement("h3");
    h3Right.textContent = "Правильно";
    h3Lose.textContent = "Неправильно";
    h3Skip.textContent = "Пропущено";
    // Lists answers
    const ulRight = document.createElement("ul");
    ulRight.append(this.getListContent(this.rightAnswers));
    const ulLose = document.createElement("ul");
    ulLose.append(this.getListContent(this.loseAnswers));
    const ulSkip = document.createElement("ul");
    ulSkip.append(this.getListContent(this.skipAnswers));
    // Insert titles
    resultsTrue.append(h3Right);
    resultsLose.append(h3Lose);
    resultsSkip.append(h3Skip);
    // insert lists
    h3Right.after(ulRight);
    h3Lose.after(ulLose);
    h3Skip.after(ulSkip);
    // insert lists wrappers
    results.append(resultsTrue);
    results.append(resultsLose);
    results.append(resultsSkip);
    // insert close button
    results.append(closeBtn);
    // insert block wrapper
    app.append(results);
  }
  eventsListener() {
    document.addEventListener("click", (e) => {
      if (e.target.closest("#start") || e.target.closest("#try-again")) {
        this.startTask();
      }
      if (e.target.closest("#skip")) {
        this.skipQuestion();
      }
      if (e.target.closest("#give")) {
        this.giveAnswer();
      }
      if (e.target.closest("#show-result")) {
        this.showResults();
      }
    });

    document.addEventListener("input", (e) => {
      if (e.target.closest("#field-for-answer")) {
        e.target.value = e.target.value.replace(/[\d]/g, "");
        this.inputValue = e.target.value;
      }
    });
  }
}

const task = new TasksGenerate();
task.eventsListener();
