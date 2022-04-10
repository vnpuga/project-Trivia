import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getTrivia } from '../services/apiRequest';
import './Game.css';
import { sumAction } from '../redux/actions';
import gravatarUrl from '../services/gravatarUrl';
import NextButton from '../components/NextButton';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: [],
      foiRespondido: false,
      time: 30,
      timeBar: false,
      answerBtnDisable: false,
      questionIndex: 0,
    };
  }

  async componentDidMount() {
    const { token } = this.props;
    const questions = await getTrivia(token);
    const fiveSeconds = 5000;
    this.setState({
      questions,
    });
    this.answerShuffle();
    setTimeout(() => this.timer(), fiveSeconds);
  }

  componentDidUpdate(prevProps, prevState) {
    this.istimedOut(prevState);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  istimedOut = (prevState) => {
    if (prevState.time === 1) {
      this.setState({
        answerBtnDisable: true,
        foiRespondido: true,
        timeBar: false,
      });
      clearInterval(this.intervalID);
    }
  }

    answerShuffle = async () => {
      const { questions: { results }, questionIndex } = this.state;
      const answersArray = [];
      const correctAnswer = {
        answer: results[questionIndex].correct_answer,
        type: 'correct-answer' };
      answersArray.push(correctAnswer);

      results[questionIndex].incorrect_answers.forEach((wrongAnswer) => {
        answersArray.push({
          answer: wrongAnswer,
          type: 'wrong-answer',
        });
        const magicNumber = 0.5;
        answersArray.sort(() => Math.random() - magicNumber);
      });
      // https://flaviocopes.com/how-to-shuffle-array-javascript/
      this.setState({ answers: answersArray });
    }

  triggerColor = () => {
    this.setState({ foiRespondido: true });
  }

  handleAnswerClick = ({ target }) => {
    this.triggerColor();
    this.setState({ timeBar: false });
    clearInterval(this.intervalID);
    const { value } = target;
    const { scoreDispatch } = this.props;
    const { time, questions, questionIndex } = this.state;
    const numberTEN = 10;
    if (value === 'correct-answer') {
      const { difficulty } = questions.results[questionIndex];
      const numberDifficulty = this.handleDifficulty(difficulty);
      scoreDispatch(numberTEN + (time * numberDifficulty));
    }
    this.setState({ foiRespondido: true });
  }

  handleDifficulty = (difficulty) => {
    const numberOne = 1;
    const numberTwo = 2;
    const numberThree = 3;
    if (difficulty === 'easy') {
      return numberOne;
    } if (difficulty === 'medium') {
      return numberTwo;
    } if (difficulty === 'hard') {
      return numberThree;
    }
  }

  timer = () => {
    const oneSecond = 1000;
    const one = 1;
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - one }));
    }, oneSecond);
    this.setState({ timeBar: true });
  }

  nextBtnClick = () => {
    const { questionIndex } = this.state;
    const questionLimit = 4;
    if (questionIndex === questionLimit) {
      const { history } = this.props;
      history.push('/feedback');
      this.setLocalStorage();
    } else {
      this.setState((prev) => ({
        questionIndex: prev.questionIndex + 1,
        foiRespondido: false,
        time: 30,
        timeBar: true,
        answerBtnDisable: false,
      }));
      this.answerShuffle();
      this.timer();
    }
  }

  setLocalStorage = () => {
    const { name, email, placar: score } = this.props;
    const newPlayer = { name, score, picture: gravatarUrl(email) };
    const ranking = JSON.parse(localStorage.getItem('players'));
    if (ranking) {
      ranking.push(newPlayer);
      localStorage.setItem('players', JSON.stringify(ranking));
    } else {
      localStorage.setItem('players', JSON.stringify([newPlayer]));
    }
  }

  render() {
    const { placar, name, email } = this.props;
    const {
      questions: { results },
      answers,
      foiRespondido,
      time, answerBtnDisable, questionIndex, timeBar } = this.state;
    return (
      <div className="game-container bg">
        <Header placar={ placar } name={ name } email={ email } />
        <div className="question-box">
          <div className="question-container">
            <h1
              className="question-category"
              data-testid="question-category"
            >
              { (results) && results[questionIndex].category }
            </h1>
            <p data-testid="question-text" className="question-text">
              { (results) && results[questionIndex].question }
            </p>
          </div>
          <div data-testid="answer-options" className="answer-options">
            { answers.map((ans, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ ans.type }
                value={ ans.type }
                className={ foiRespondido ? ans.type : 'unanswered' }
                onClick={ this.handleAnswerClick }
                disabled={ answerBtnDisable }
              >
                {ans.answer}
              </button>
            ))}
          </div>
          <span style={ { display: 'none' } }>
            {'  '}
            { time }
          </span>
          { timeBar && (
            <div className="round-time-bar" data-style="smooth" data-color="yellow">
              <div />
            </div>)}
        </div>
        <div className="next-btn-container">
          <NextButton
            show={ foiRespondido ? { visibility: 'visible' } : { visibility: 'hidden' } }
            testid="btn-next"
            click={ this.nextBtnClick }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  placar: state.player.score,
  email: state.player.gravatarEmail,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (sum) => (dispatch(sumAction(sum))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  placar: PropTypes.number,
}.isRequired;
