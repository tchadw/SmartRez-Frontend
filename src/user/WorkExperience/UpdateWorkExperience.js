import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import Layout from "../../core/Layout";
import axios from "axios";
import { isAuth, getCookie, signout, updateUser } from "../../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const UpdateWorkExperience = ({ history }) => {
  const [values, setValues] = useState({
    experience: {},
    buttonText: "Submit",
  });

  const token = getCookie("token");

  let match = useRouteMatch("/user/:id/:experienceId");

  const expParamId = match.params.experienceId;

  useEffect(() => {
    loadProfile();
  }, []);

  let respToRender;

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("USER PROFILE:", response);
        const { experience } = response.data;

        const filterExpByParam = experience.filter(
          (exp) => exp._id === expParamId
        );

        //Refactor later... We have to grab the first item in the array because there should only be one item left after filter down to the parameter id
        const expToUpdate = filterExpByParam[0];

        setValues({
          ...values,
          experience: expToUpdate,
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

  const { experience, buttonText } = values;

  if (experience.responsibilities) {
    respToRender = experience.responsibilities.map((resp) => {
      return (
        <div>
          <ul>
            <li>{resp}</li>
          </ul>
        </div>
      );
    });
  }

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({
      ...values,
      experience: { ...values.experience, [name]: event.target.value },
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update-experience`,
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

  // const resume = () => (
  //   <div class="container">
  //     <div className="experienceBox">
  //       <h3 className="exp-title">Experience </h3>

  //       {`${experience.startDate}`}

  //       <div>
  //         <p className="start-end-dates">
  //           {experience.startDate} - {experience.endDate}
  //         </p>

  //         <p className="job-title">
  //           {experience.jobTitle},{" "}
  //           <span className="company-details">{experience.company}</span>
  //         </p>

  //         <ul>
  //           {experience.responsibilities.map((resp, index) => (
  //             <li key={index}>{resp}</li>
  //           ))}
  //         </ul>

  //         <hr className="exp-divider" />
  //       </div>
  //     </div>
  //   </div>
  // );

  const updateForm = () => (
    <div className="container">
      <div className="experienceBox">
        <form>
          <h3 className="exp-title">Experience </h3>

          <div className="form-group">
            <label className="text-muted">Company</label>
            <input
              onChange={handleChange("company")}
              value={experience.company}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Job Title</label>
            <input
              onChange={handleChange("jobTitle")}
              value={experience.jobTitle}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Start Date</label>
            <input
              onChange={handleChange("startDate")}
              value={experience.startDate}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">End Date</label>
            <input
              onChange={handleChange("endDate")}
              value={experience.endDate}
              type="text"
              className="form-control"
            />
          </div>

          {respToRender}

          {console.log("Responsibilities: ", experience.responsibilities)}

          <div>
            <button className="btn btn-primary" onClick={clickSubmit}>
              {buttonText}
            </button>
          </div>
        </form>
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
