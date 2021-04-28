import React, { Component } from "react";

import classes from "./CVTitleWidget.css";

class CVTitleWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docTitle: props.defaultDocTitle
        ? props.defaultDocTitle
        : "Untitled Document",
      docTitleFocused: false
    };
    this.cvTitleInputRef = React.createRef();
  }

  handleDocTitleChange = e => {
    let newDocTitle = e.target.value;
    this.setState({ docTitle: newDocTitle });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.docTitle === this.state.docTitle) {
      return false;
    } else {
      this.props.onDocTitleChange(nextState.docTitle);
      return true;
    }
  }
  componentDidUpdate() {
    console.log("CVTitleWidget Updated");
  }

  focusCVTitle = () => {
    this.cvTitleInputRef.current.focus();
    this.setState({ docTitleFocused: true });
    this.cvTitleInputRef.current.addEventListener(
      "blur",
      this.checkForResetDocTitle
    );
  };
  checkForResetDocTitle = () => {
    if (this.state.docTitle === "") {
      this.setState({ docTitle: "Untitled Document" });
      this.cvTitleInputRef.current.removeEventListener(
        "blur",
        this.checkForResetDocTitle
      );
    }
    this.setState({ docTitleFocused: false });
  };
  render() {
    return (
      <div className={classes["cv-title-container"]}>
        <i className={"far fa-file-alt " + classes["cv-file-icon"]}></i>
        <div className={classes["cv-title-widget"]}>
          <input
            ref={this.cvTitleInputRef}
            className={classes["cv-title-input"]}
            type="text"
            name="doc-title"
            value={this.state.docTitle}
            onChange={event => this.handleDocTitleChange(event)}
          />
          <div
            className={classes["cv-title-input-label"]}
            onClick={this.focusCVTitle}
          >
            <span>{this.state.docTitle}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CVTitleWidget;
