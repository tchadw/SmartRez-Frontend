import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Scrapper = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/scrapper/listing`,
    })
      .then((response) => {
        console.log("Indeed Job Scrapper", response);

        const scrappedTitle = response.data.jobTitle;
        const scrappedDescription = response.data.jobDescriptionHTML;

        setTitle(scrappedTitle);
        setDescription(scrappedDescription);
      })
      .catch((error) => {
        console.log("SCRAPE ERROR", error.response.data.error);
        if (error.response.status === 401) {
          console.log("Scrapping");
        }
      });
  };

  //Set job description state as HTML
  const jobDescMarkup = { __html: `${description}` };

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="pt-5 text-center">Job Scrapper</h1>
        <p className="lead text-center">You are applying for:</p>
        <p className="lead text-center">{title}</p>

        <div dangerouslySetInnerHTML={jobDescMarkup}></div>
      </div>
    </Layout>
  );
};

export default Scrapper;
