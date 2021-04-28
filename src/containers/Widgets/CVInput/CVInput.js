import React, { Component } from "react";

import CVPaperInput from "./CVPaperInput/CVPaperInput";
import SkillDropdown from "./SkillDropdown/SkillDropdown";
import Duration from "./Duration/Duration";

class CVInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: props.config ? {...props.config} : null
    };
  }
  render() {
    let input = null;
    const inputType = this.state.config.type;
    if (
      inputType !== "image" &&
      inputType !== "duration" &&
      inputType !== "editor" &&
      inputType !== "skill"
    ) {
      input = (<CVPaperInput {...this.props} />);
    } else if(inputType === "skill") {
      input =(<SkillDropdown {...this.props} />)
    } else if (inputType === "duration") {
      input = (<Duration {...this.props} />);
    }
    return input;
  }
}

export default CVInput;
