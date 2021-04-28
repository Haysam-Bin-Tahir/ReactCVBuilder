import React, { Component } from "react";

import classes from "./Homepage.css";

import cvImage from '../../cv.png';

class Homepage extends Component {
    handleBuild = () => {
        this.props.history.push({
            pathname: "/templates"
        })
    }
  render() {
    return (
      <div className={classes["home"]}>
      <header className={classes["header"]}>
      <h1 className={classes["heading-primary"]}>Welcome to CV Builder</h1>
      <p className={classes["text-primary"]}>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
      </p>
      <div className={classes["btn-primary"]} onClick={this.handleBuild}>Build Now</div>
      <img src={cvImage} alt="CV Made with this CV Builder" className={classes["cv-image"]} />
      </header>

      </div>
    );
  }
}

export default Homepage;
