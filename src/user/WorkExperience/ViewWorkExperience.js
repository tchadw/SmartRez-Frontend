import React, { useState, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";
import Layout from "../../core/Layout";
import axios from "axios";
import { isAuth, getCookie, signout, updateUser } from "../../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import edit from "../../img/white_icons/edit-50.png";

const ViewWorkExperience = ({ history }) => {
  const [values, setValues] = useState({
    expId: "",
    experience: [],
    buttonText: "Submit",
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE", response);
        const { experience } = response.data;
        setValues({
          ...values,
          experience,
        });
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        if (error.response.status === 401) {
          signout(() => {
            history.push("/");
          });
        }
      });
  };

  const { expId, experience, buttonText } = values;

  //const handleChange = (name) => (event) => {
  // console.log(event.target.value);
  //setValues({ ...values, [name]: event.target.value });
  //};

  /* Added 1
  const testSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, expId: event.currentTarget.id });
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}/${expId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("GET EXPERIENCE ID SUCCESSFUL", response);
        history.push(`/user/${isAuth()._id}/${expId}`);
      })
      .catch((error) => {
        console.log("GET EXPERIENCE ID ERROR", error.response.data.error);
      });
  }; */

  const resume = () => (
    <div class="container">
      <div className="experienceBox">
        <h3 className="exp-title">Experience </h3>

        {experience.map((exp, index) => (
          <div key={index}>
            <p className="start-end-dates">
              {exp.startDate} - {exp.endDate}
            </p>

            <p className="job-title">
              {exp.jobTitle},{" "}
              <span className="company-details">{exp.company}</span>
            </p>

            <ul>
              {exp.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>

            <a
              href={`/user/${isAuth()._id}/${exp._id}`}
              class="btn btn-primary edit-btn"
            >
              <span class="edit-exp-btn-text">Edit</span>{" "}
              <img src={edit} alt="edit" className="edit-exp-icon" />
            </a>

            <hr className="exp-divider" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="col-md-12 ">
        <ToastContainer />

        {resume()}
      </div>
    </Layout>
  );
};

export default ViewWorkExperience;
