import React, { Component } from "react";

import CVTitleWidget from "../Widgets/CVTitleWidget/CVTitleWidget";
import CVImageWidget from "../Widgets/CVImageWidget/CVImageWidget";
import CVForm from "../Widgets/CVForm/CVForm";
import { PDFViewer } from "@react-pdf/renderer";

import Doc1 from "../../components/Templates/cvBuilderPdf2";
import Doc2 from "../../components/Templates/cvBuilderPdf";
import Doc3 from "../../components/Templates/cvBuilderPdf3";

import classes from "./CVBuilder.css";

class CVBuilder extends Component {
  state = {
    template: this.props.match.params.id,
    defaultDocTitle: "Untitled Document",
    counter: 0,
    counterLimit: 10,
    docTitle: null,
    cvData: {},
    cvDataCopy: {},
    cvConfig: {
      formConfig: {
        forms: [
          {
            type: "paper-form",
            displayLimit: 5,
            formTitle: "Personal Details",
            inputFields: [
              {
                type: "text",
                label: "First Name",
                name: "first-name"
              },
              {
                type: "text",
                label: "Last Name",
                name: "last-name"
              },
              {
                type: "text",
                label: "Job Title",
                name: "job-title"
              },
              {
                type: "email",
                label: "Email",
                name: "e-mail"
              },
              {
                type: "text",
                label: "Phone",
                name: "phone"
              },
              {
                type: "text",
                label: "Country",
                name: "country"
              },
              {
                type: "text",
                label: "City",
                name: "city"
              },
              {
                type: "text",
                label: "Address",
                name: "address"
              },
              {
                type: "text",
                label: "Postal Code",
                name: "postal-code"
              },
              {
                type: "text",
                label: "Driving License",
                name: "driving-license"
              },
              {
                type: "text",
                label: "Nationality",
                name: "nationality"
              },
              {
                type: "text",
                label: "Place of Birth",
                name: "place-of-birth"
              },
              {
                type: "date",
                label: "Date of Birth",
                name: "date-of-birth"
              }
            ]
          },
          {
            type: "paper-form",
            displayLimit: 1,
            formTitle: "Personal Statement",
            description:
              "Include 2-3 clear sentences about your overall experience",
            inputFields: [
              {
                type: "description",
                label:
                  "e.g. Experienced Web Developer with 3+ years of experience and ...",
                name: "personal-statement"
              }
            ]
          },
          {
            formTitle: "Employment History",
            icon: "fas fa-briefcase",
            type: "modal-form",
            action: "Add Employment",
            name: "employment-history",
            description:
              "Include your last 10 years of relevant experience and dates in this section. List your most recent position first.",
            primaryFieldName: "job-title",
            secondaryFieldName: "employer",
            tertiaryFieldName: "duration",
            inputFields: [
              {
                type: "text",
                label: "Job Title",
                name: "job-title",
                value: "(Unspecified)"
              },
              {
                type: "text",
                label: "Employer",
                name: "employer"
              },
              {
                type: "duration",
                label: "Start & End Date",
                name: "duration",
                tillPresent: true
              },
              {
                type: "text",
                label: "City",
                name: "city"
              },
              {
                type: "description",
                label: "Description",
                name: "description"
              }
            ]
          },
          {
            formTitle: "Education History",
            icon: "fas fa-book-open",
            type: "modal-form",
            action: "Add Education",
            name: "education-history",
            description:
              "If relevant, include your most recent educational achievements and the dates here",
            primaryFieldName: "degree",
            secondaryFieldName: "school",
            tertiaryFieldName: "duration",
            inputFields: [
              {
                type: "text",
                label: "School",
                name: "school",
                value: "(Not specified)"
              },
              {
                type: "text",
                label: "Degree",
                name: "degree"
              },
              {
                type: "duration",
                label: "Start & End Date",
                name: "duration"
              },
              {
                type: "text",
                label: "City",
                name: "city"
              },
              {
                type: "description",
                label: "Description",
                placeholder: "Description",
                name: "description"
              }
            ]
          },
          {
            formTitle: "Websites & Social Links",
            icon: "fas fa-link",
            type: "modal-form",
            action: "Add Link",
            description:
              "You can add links to websites you want hiring managers to see! Perhaps It will be  a link to your portfolio, LinkedIn profile, or personal website",
            name: "links",
            inputFields: [
              {
                type: "text",
                label: "Label",
                name: "label",
                value: "(Unspecified)"
              },
              {
                type: "text",
                label: "Link",
                name: "link",
                value: "(Unspecified)"
              }
            ]
          },
          {
            formTitle: "Skills",
            icon: "fas fa-braille",
            type: "modal-form",
            action: "Add Skill",
            name: "skills",
            description: "Add a skill you want to showcase",
            inputFields: [
              {
                type: "text",
                label: "Skill",
                name: "skill",
                value: "(Unspecified)"
              },
              {
                type: "skill",
                label: "Level",
                name: "level",
                value: "(Unspecified)"
              }
            ]
          }
        ]
      }
    }
  };

  provideData = () => {
    console.log({ ...this.state.cvData });

    return { ...this.state.cvData };
  };
  handleDocTitleChange = newDocTitle => {
    this.setState({ docTitle: newDocTitle });
  };

  handleInputChange = (name, newValue, type) => {
    let updatedData = { ...this.state.cvData };
    if (type === "paper-form") {
      updatedData[name] = newValue;
    } else if (type === "modal-form") {
      updatedData[name] = [...newValue];
    }
    this.setState({ cvData: { ...updatedData } });
  };

  downloadFile = e => {
    var blob = document.querySelector("iframe").src;
    const link = document.createElement("a");
    link.href = blob;
    link.download = this.state.docTitle
      ? this.state.docTitle
      : this.state.defaultDocTitle;
    document.body.append(link);
    link.click();
    link.remove();
    window.addEventListener("focus", e => URL.revokeObjectURL(link.href), {
      once: true
    });
  };
  redirectToTemplates = () => {
    let redirectConfirmation = window.confirm(
      "Are you sure you want to leave this page? All the input data will be lost."
    );

    if (redirectConfirmation) {
      this.props.history.replace("/templates");
    }
  };
  render() {
    let Document = (
      <PDFViewer
        className={classes["pdf-viewer-org"]}
        style={{
          width: "50%",
          height: "100vh",
          position: "fixed",
          top: "0",
          right: "0"
        }}
      >
        {<Doc1 cvData={{ ...this.state.cvData }} />}
      </PDFViewer>
    );
    const templateId = +this.state.template;
    if (templateId === 1) {
      Document = (
        <PDFViewer
          className={classes["pdf-viewer-org"]}
          style={{
            width: "50%",
            height: "100vh",
            position: "fixed",
            top: "0",
            right: "0"
          }}
        >
          {<Doc1 cvData={{ ...this.state.cvData }} />}
        </PDFViewer>
      );
    } else if (templateId === 2) {
      Document = (
        <PDFViewer
          className={classes["pdf-viewer-org"]}
          style={{
            width: "50%",
            height: "100vh",
            position: "fixed",
            top: "0",
            right: "0"
          }}
        >
          {<Doc2 cvData={{ ...this.state.cvData }} />}
        </PDFViewer>
      );
    } else if (templateId === 3) {
      Document = (
        <PDFViewer
          className={classes["pdf-viewer-org"]}
          style={{
            width: "50%",
            height: "100vh",
            position: "fixed",
            top: "0",
            right: "0"
          }}
        >
          {<Doc3 cvData={{ ...this.state.cvData }} />}
        </PDFViewer>
      );
    }
    console.log("cvbuilder rendering");
    let forms = [...this.state.cvConfig.formConfig.forms];
    forms = forms.map(formConfig => (
      <CVForm
        cvData={{ ...this.state.cvData }}
        key={formConfig.formTitle}
        type={formConfig.type}
        config={{ ...formConfig }}
        changed={(name, newValue, formType) =>
          this.handleInputChange(name, newValue, formType)
        }
      />
    ));
    return (
      <div
        style={{ ...this.props.style }}
        className={classes["cv-builder-root"]}
      >
        <div id="cvBuilder" className={classes["cv-builder"]}>
          <CVTitleWidget
            defaultDocTitle={this.state.defaultDocTitle}
            onDocTitleChange={newDocTitle =>
              this.handleDocTitleChange(newDocTitle)
            }
          />
          <CVImageWidget
            changed={(name, val) =>
              this.handleInputChange(name, val, "paper-form")
            }
            value={this.state.cvData.image}
          />
          {forms}

          <a
            href="#"
            download={this.state.docTitle}
            className={classes["mobile-preview-btn"]}
            onClick={this.downloadFile}
          >
            <i className="far fa-eye"></i>
          </a>

          <div className={classes["pdf-viewer-btns"]}>
            <div
              className={classes["btn-change-template"]}
              onClick={this.redirectToTemplates}
            >
              <i className="fas fa-file-download"></i>&nbsp; Change Template
            </div>
            <div
              className={classes["btn-change-template"]}
              onClick={this.downloadFile}
            >
              Download PDF
            </div>
          </div>
        </div>
        {Document}
      </div>
    );
  }
}

export default CVBuilder;
