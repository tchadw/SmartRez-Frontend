import React, { useState, useEffect } from "react";

import Layout from "../core/Layout";
import axios from "axios";
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";

import avatar from "../img/placeholders/profile.jpg";
import workExp from "../img/color_icons/resume-240.png";
import edu from "../img/color_icons/education-100.png";
import cert from "../img/color_icons/certificate-100.png";
import internship from "../img/color_icons/internship-100.png";
import volunteer from "../img/color_icons/volunteering-100.png";
import projects from "../img/color_icons/create-100.png";
import edit from "../img/white_icons/edit-50.png";

import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

import "../nav.css";
import "../sidebar.css";

const Dashboard = ({ history }) => {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
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
        const { role, name, email } = response.data;
        setValues({ ...values, role, name, email });
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

  const { role, name, email, password, buttonText } = values;

  const dashboardOptions = () => (
    <div className="container-fluid">
      {/*Row 1 */}
      <div class="row dashboard-options-row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <img src={workExp} alt="edit" className="dashboard-icon" />
              <h5 class="card-title">Work Experience</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="/user/work-experience" class="btn btn-primary edit-btn">
                <span class="edit-btn-text">Edit</span>{" "}
                <img src={edit} alt="edit" className="edit-icon" />
              </a>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <img src={edu} alt="edit" className="dashboard-icon" />
              <h5 class="card-title">Education</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary edit-btn">
                <span class="edit-btn-text">Edit</span>{" "}
                <img src={edit} alt="edit" className="edit-icon" />
              </a>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <img src={cert} alt="edit" className="dashboard-icon" />
              <h5 class="card-title">Certifications</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary edit-btn">
                <span class="edit-btn-text">Edit</span>{" "}
                <img src={edit} alt="edit" className="edit-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*Row 2 */}
      <div class="row dashboard-options-row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <img src={internship} alt="edit" className="dashboard-icon" />
              <h5 class="card-title">Internships</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary edit-btn">
                <span class="edit-btn-text">Edit</span>{" "}
                <img src={edit} alt="edit" className="edit-icon" />
              </a>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <img src={volunteer} alt="edit" className="dashboard-icon" />
              <h5 class="card-title">Volunteer Work</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary edit-btn">
                <span class="edit-btn-text">Edit</span>{" "}
                <img src={edit} alt="edit" className="edit-icon" />
              </a>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <img src={projects} alt="edit" className="dashboard-icon" />
              <h5 class="card-title">Projects</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary edit-btn">
                <span class="edit-btn-text">Edit</span>{" "}
                <img src={edit} alt="edit" className="edit-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="dashboard-container">
        <ToastContainer />
        <div className="row dashboard-welcomer">
          <div className="col-md-2 avatar-container">
            <img
              src={avatar}
              class="img-fluid"
              id="avatar"
              alt="Responsive image"
            />
          </div>
          <div className="col-md-10">
            <h1>{name}</h1>
            <p>{email}</p>

            <a href="#" class="btn btn-primary dashboard-btn" role="button">
              View Resume
            </a>
          </div>
        </div>

        {dashboardOptions()}
      </div>
    </Layout>
  );
};

export default Dashboard;
