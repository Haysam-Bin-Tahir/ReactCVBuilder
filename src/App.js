import React, { Component, Suspense } from "react";

import "./App.css";
import { Route } from "react-router-dom";

const CVBuilder = React.lazy(() => import("./containers/CVBuilder/CVBuilder"));
const TemplatesProvider = React.lazy(() =>
  import("./containers/TemplatesProvider/TemplatesProvider")
);
const Homepage = React.lazy(() => import("./components/Homepage/Homepage"));
class App extends Component {
  state = {
    defaultTemplate: 1,
    showDynamic: true,
    showCVBuilder: false,
    showTemplatesProvider: true,
    selectedTemplate: null
  };

  handleTemplateSelected = value => {
    this.setState({
      selectedTemplate: value,
      showTemplatesProvider: false,
      showCVBuilder: true
    });
  };

  render() {
    let templateForBuilder =
      this.state.selectedTemplate !== null
        ? this.state.selectedTemplate
        : this.state.defaultTemplate;
    return (
      <div id="cvBuilderApp" className="app-wrap">
      <Route
        path="/"
        exact
        render={props => (
          <Suspense fallback={<div></div>}>
            <Homepage {...props} />
          </Suspense>
        )}
      />
        <Route
          path="/templates"
          exact
          render={props => (
            <Suspense fallback={<div>Loading...</div>}>
              <TemplatesProvider
                {...props}
                style={{
                  display: this.state.showTemplatesProvider ? "block" : "none"
                }}
                selected={value => this.handleTemplateSelected(value)}
              />
            </Suspense>
          )}
        />
        <Route
          path="/cv-builder/:id"
          render={props => (
            <Suspense fallback={<div>Loading...</div>}>
              <CVBuilder
                {...props}
                template={templateForBuilder}
              />
            </Suspense>
          )}
        />
      </div>
    );
  }
}

export default App;
