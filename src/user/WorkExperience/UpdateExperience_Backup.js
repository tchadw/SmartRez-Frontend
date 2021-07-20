import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import Layout from "../../core/Layout";
import axios from "axios";
import { isAuth, getCookie, signout, updateUser } from "../../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const UpdateWorkExperience = ({ history }) => {
  const [values, setValues] = useState({
    expId: "",
    experience: [],
    buttonText: "Submit",
  });

  const token = getCookie("token");

  let match = useRouteMatch("/user/:id/:experienceId");

  const expParamId = match.params.experienceId;

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

        const expToUpdate = experience.filter((exp) => exp._id === expParamId);

        console.log("SELECTED EXPERIENCE: ", expToUpdate);
        console.log("RESPONSIBILITIES: ", expToUpdate[0]);
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

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { experience },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE SUCCESS", response);
        updateUser(response, () => {
          setValues({ ...values, buttonText: "Submitted" });
          toast.success("Profile updated successfully");
        });
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

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

            <hr className="exp-divider" />
          </div>
        ))}
      </div>
    </div>
  );

  const updateForm = () => (
    <div className="container">
      <div className="experienceBox">
        {experience.map((exp, index) =>
          exp._id === expParamId ? (
            <form id={index}>
              <h3 className="exp-title">Experience </h3>

              <div className="form-group">
                <label className="text-muted">Company</label>
                <input
                  onChange={handleChange("company")}
                  value={exp.company}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Job Title</label>
                <input
                  onChange={handleChange("jobTitle")}
                  value={exp.jobTitle}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Start Date</label>
                <input
                  onChange={handleChange("startDate")}
                  value={exp.startDate}
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="text-muted">End Date</label>
                <input
                  onChange={handleChange("endDate")}
                  value={exp.endDate}
                  type="text"
                  className="form-control"
                />
              </div>

              <div>
                <ul>
                  {exp.responsibilities.map((resp, index) => (
                    <li>{resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                  {buttonText}
                </button>
              </div>
            </form>
          ) : (
            "NAH"
          )
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="col-md-12 ">
        <ToastContainer />

        {updateForm()}
      </div>
    </Layout>
  );
};

export default UpdateWorkExperience;
