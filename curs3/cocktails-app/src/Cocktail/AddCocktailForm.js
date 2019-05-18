import React from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import Thumb from "./Thumb";
import "../App.css";

class AddCocktailForm extends React.Component {
  state = { thumb: null };
  handleSubmit = (values, { props = this.props, setSubmitting }) => {
    //process form submission here
    console.log("Submitted Values:", values);

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({ thumb: reader.result }, () => {
        this.props.history.push("/alcoholic-drinks", {
          cocktail_name: values.cocktail_name,
          file: this.state.thumb
        });
      });
    };

    reader.readAsDataURL(values.file);

    //done submitting, set submitting to false
    setSubmitting(false);
    return;
  };

  render() {
    return (
      <Formik
        initialValues={{
          cocktail_name: "",
          ingredient1: "",
          ingredient2: "",
          quantity: 0,
          file: null
        }}
        validate={values => {
          let errors = [];
          if (!values.cocktail_name) errors.cocktail_name = "Required";
          if (!/^[0-9]*$/i.test(values.quantity)) {
            errors.quantity = "You must supply a number for the quantity";
          }
          //check if my values have errors
          return errors;
        }}
        onSubmit={this.handleSubmit.bind(this)}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <div class="cocktailImageDiv">
              <label htmlFor="file">File upload</label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={event => {
                  props.setFieldValue("file", event.currentTarget.files[0]);
                }}
                className="form-control"
              />
              <Thumb file={props.values.file} />
            </div>
            <div class="cocktailInputs">
              <div>
                <input
                  type="text"
                  onChange={event => {
                    props.setFieldValue("cocktail_name", event.target.value);
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.cocktail_name}
                  name="name"
                  class="cocktailFirstInput"
                />
                {props.errors.cocktail_name && props.touched.cocktail_name && (
                  <div style={{ color: "red" }}>
                    {props.errors.cocktail_name}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  onChange={event => {
                    props.setFieldValue("ingredient1", event.target.value);
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.ingredient1}
                  name="name"
                  class="cocktailInput"
                />
              </div>
              <div>
                <input
                  type="text"
                  onChange={event => {
                    props.setFieldValue("ingredient2", event.target.value);
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.ingredient2}
                  name="name"
                  class="cocktailInput"
                />
              </div>
              <div>
                <input
                  type="text"
                  onChange={event => {
                    props.setFieldValue("quantity", event.target.value);
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.quantity}
                  name="name"
                  class="cocktailLastInput"
                />
                {props.errors.quantity && props.touched.quantity && (
                  <div style={{ color: "red" }}>{props.errors.quantity}</div>
                )}
              </div>
              <div>
                <div style={{ marginRight: "2px" }}>
                  <input
                    type="submit"
                    value="Add Cocktail"
                    disabled={props.isSubmitting}
                  />
                </div>
                <div>
                  <input
                    type="reset"
                    value="Reset"
                    onClick={props.handleReset}
                    disabled={!props.dirty || props.isSubmitting}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      />
    );
  }
}

export default AddCocktailForm;
