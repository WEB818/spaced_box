import React, { Component } from "react";
import "./Word.css";
class Word extends Component {
  createCorrectTally = () => {
    const { correct } = this.props;

    let table = [];
    for (let i = 1; i <= correct; i++) {
      table.push(
        <span key={i} className="tally1">
          |
        </span>
      );
    }
    return table;
  };
  formatCorrectScore() {
    const { correct, word } = this.props;
    if (correct === 0) {
      return (
        <li
          aria-label={"No correct guesses for " + word}
          tabIndex="1"
          className="Word__correct"
        >
          -
        </li>
      );
    } else {
      return (
        <li
          aria-label={correct + "correct guesses for" + word}
          tabIndex="1"
          className="Word__correct"
        >
          {correct}
        </li>
      );
    }
  }

  formatIncorrectScore() {
    const { incorrect, word } = this.props;
    if (incorrect === 0) {
      return (
        <li
          aria-label={"No incorrect guesses for " + word}
          tabIndex="2"
          className="Word__correct"
        >
          -
        </li>
      );
    } else {
      return (
        <li
          aria-label={incorrect + "incorrect guesses for" + word}
          tabIndex="2"
          className="Word__correct"
        >
          {incorrect}
        </li>
      );
    }
  }
  render() {
    const { word } = this.props;

    return (
      <div className="Word__word-container">
        <li aria-label={word} tabIndex="0" className="Word__word">
          {word}
        </li>
        {this.formatCorrectScore()}
        {this.formatIncorrectScore()}
      </div>
    );
  }
}

export default Word;
