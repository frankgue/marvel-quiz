import React, { Component, Fragment } from "react";
import Levels from "../Levels";
import { QuizMarvel } from "../quizMarvel";
import ProgressBar from "../ProgressBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  score: 0,
  userAnswer: "",
  btnDisabled: true,
  showWelcomeMsg: false,
  quizEnd: false,
  percent: 0,
};

const levelNames = ["debutant", "confirme", "expert"];
class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.storedDataRef = React.createRef();
  }

  loadQuestions = (level) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level];
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz;

      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );

      this.setState({ storedQuestions: newArray });
    } else {
      console.log("Pas assez de questions!!!.");
    }
  };

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }

  showToastMsg = (pseudo) => {
    if (!this.state.showWelcomeMsg) {
      this.setState({ showWelcomeMsg: true });
      toast.warn(`Bienvenue ${pseudo} et bonne chance!!`, {
        position: "top-right",
        autoClose: 2000,
        icon: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "colored",
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      maxQuestions,
      storedQuestions,
      idQuestion,
      score,
      quizEnd,
    } = this.state;

    if (
      prevState.storedQuestions !== storedQuestions &&
      storedQuestions.length
    ) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      });
    }

    if (prevState.idQuestion !== idQuestion && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(maxQuestions, score);

      this.gameOver(gradePercent);
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  getPercentage = (maxQuestion, playerScore) =>
    (playerScore / maxQuestion) * 100;

  gameOver = (gradePercent) => {
    if (gradePercent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: gradePercent,
      });
    } else {
      this.setState({
        percent: gradePercent,
      });
    }
  };

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({
        quizEnd: true,
      });
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
      // this.loadQuestions(prevState.idQuestion);
    }

    // score + 1
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));

      toast.success("Bravo +1", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        bodyClassName: "toastify-color",
      });
    } else {
      toast.error("Raté 0", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        bodyClassName: "toastify-color",
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...initialState, quizLevel: param });
    this.loadQuestions(levelNames[param]);
  };

  render() {
    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      score,
      userAnswer,
      btnDisabled,
      quizEnd,
      percent,
    } = this.state;

    const displayOptions = options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            option === userAnswer ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
          <FaChevronRight /> {option}
        </p>
      );
    });
    //TODO - remove ! at end
    return quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <Fragment>
        <Levels levelNames={levelNames} quizLevel={quizLevel} />
        <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
        <h2>{question}</h2>
        {displayOptions}
        <button
          className="btnSubmit"
          disabled={btnDisabled}
          onClick={this.nextQuestion}
        >
          {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
        </button>
        <ToastContainer />
      </Fragment>
    );
  }
}

export default Quiz;
