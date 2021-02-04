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
  createCloseBtn() {
    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close-btn");
    return closeBtn;
  }
  openMenu() {
    app.innerHTML = "";
    const menu = document.createElement("div");
    menu.classList.add("block", "menu");

    const h1 = document.createElement("h1");
    h1.classList.add("menu-title");
    h1.textContent = "Welcome!";

    const menuButtons = document.createElement("div");
    menuButtons.classList.add("menu-buttons");

    const startBtn = document.createElement("button");
    startBtn.classList.add("menu-btn");
    startBtn.id = "start";
    startBtn.textContent = "Start learning";

    const vocabularyBtn = document.createElement("button");
    vocabularyBtn.classList.add("menu-btn");
    vocabularyBtn.id = "vocabulary";
    vocabularyBtn.textContent = "Vocabulary";

    menuButtons.append(startBtn);
    menuButtons.append(vocabularyBtn);
    menu.append(h1);
    menu.append(menuButtons);
    menu.append(this.createCloseBtn());
    app.append(menu);
  }
  openVocabulary() {
    app.innerHTML = "";

    const vocabularyBlock = document.createElement("div");
    vocabularyBlock.classList.add(`block`, `vocabulary-block`);

    const addWordBlock = document.createElement("div");
    addWordBlock.classList.add("vocabulary-add");

    const h2 = document.createElement("h2");
    h2.textContent = "Write the word you would like to learn and add it";

    const input = document.createElement("input");
    input.id = "vocabulary-input";

    const button = document.createElement("button");
    button.id = "add-word";
    button.textContent = "Add word";

    const h2List = document.createElement("h2");
    h2List.textContent = "Added words";

    const ul = document.createElement("ul");
    ul.classList.add("vocabulary-list");

    ul.append(this.getListContent(this.listQuestions));
    ul.append(this.getListContent(this.listQuestions));
    ul.append(this.getListContent(this.listQuestions));
    ul.append(this.getListContent(this.listQuestions));

    addWordBlock.append(input);
    addWordBlock.append(button);

    vocabularyBlock.append(h2);
    vocabularyBlock.append(addWordBlock);
    vocabularyBlock.append(h2List);
    vocabularyBlock.append(ul);
    vocabularyBlock.append(this.createCloseBtn());
    app.append(vocabularyBlock);
  }
  giveResult() {
    app.innerHTML = "";

    const resultBlock = document.createElement("div");
    resultBlock.classList.add("block", "result-block");

    const h2 = document.createElement("h2");
    h2.textContent = "Decision result";

    const resultScore = document.createElement("div");
    resultScore.classList.add("result-score");

    const pRight = document.createElement("p");
    pRight.textContent = `Right - ${this.rightAnswers.length}`;

    const pWrong = document.createElement("p");
    pWrong.textContent = `Wrong - ${this.loseAnswers.length}`;

    const pPassed = document.createElement("p");
    pPassed.textContent = `Passed - ${this.skipAnswers.length}`;

    const resultButtons = document.createElement("div");
    resultButtons.classList.add("result-buttons");

    const tryAgainBtn = document.createElement("button");
    tryAgainBtn.id = "try-again";
    tryAgainBtn.textContent = "Try again";

    const showResultBtn = document.createElement("button");
    showResultBtn.id = "show-result";
    showResultBtn.textContent = "Show results";

    const goToMenuBtn = document.createElement("button");
    goToMenuBtn.id = "go-to-menu";
    goToMenuBtn.textContent = "Menu";

    resultButtons.append(tryAgainBtn);
    resultButtons.append(showResultBtn);
    resultButtons.append(goToMenuBtn);

    resultScore.append(pRight);
    resultScore.append(pWrong);
    resultScore.append(pPassed);

    resultBlock.append(h2);
    resultBlock.append(resultScore);
    resultBlock.append(resultButtons);

    resultBlock.append(this.createCloseBtn());
    app.append(resultBlock);
  }
  askQuestion(question) {
    if (!this.swapsArr[0]) {
      this.giveResult();
    } else {
      app.innerHTML = "";
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("block", "question-block");

      const h2 = document.createElement("h2");
      h2.textContent = `${question.word}`;

      const input = document.createElement("input");
      input.type = "text";
      input.id = "field-for-answer";

      const questionButtons = document.createElement("div");
      questionButtons.classList.add("question-buttons");

      const answerBtn = document.createElement("button");
      answerBtn.id = "give";
      answerBtn.textContent = "Give answer";

      const skipBtn = document.createElement("button");
      skipBtn.id = "skip";
      skipBtn.textContent = "Skip question";

      questionButtons.append(answerBtn);
      questionButtons.append(skipBtn);

      questionBlock.append(h2);
      questionBlock.append(input);
      questionBlock.append(questionButtons);

      questionBlock.append(this.createCloseBtn());
      app.append(questionBlock);
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
    const results = document.createElement("div");
    results.classList.add("block", "extended-results");

    const resultsTrue = document.createElement("div");
    resultsTrue.classList.add("result-list");
    const resultsLose = document.createElement("div");
    resultsLose.classList.add("result-list");
    const resultsSkip = document.createElement("div");
    resultsSkip.classList.add("result-list");

    const h3Right = document.createElement("h3");
    const h3Lose = document.createElement("h3");
    const h3Skip = document.createElement("h3");
    h3Right.textContent = "Right";
    h3Lose.textContent = "Wrong";
    h3Skip.textContent = "Passed";

    const ulRight = document.createElement("ul");
    ulRight.append(this.getListContent(this.rightAnswers));
    const ulLose = document.createElement("ul");
    ulLose.append(this.getListContent(this.loseAnswers));
    const ulSkip = document.createElement("ul");
    ulSkip.append(this.getListContent(this.skipAnswers));

    resultsTrue.append(h3Right);
    resultsLose.append(h3Lose);
    resultsSkip.append(h3Skip);

    h3Right.after(ulRight);
    h3Lose.after(ulLose);
    h3Skip.after(ulSkip);

    results.append(resultsTrue);
    results.append(resultsLose);
    results.append(resultsSkip);

    results.append(this.createCloseBtn());

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
      if (e.target.closest("#go-to-menu")) {
        this.openMenu();
      }
      if (e.target.closest("#vocabulary")) {
        this.openVocabulary();
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
