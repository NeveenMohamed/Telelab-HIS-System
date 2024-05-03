import React from "react";
import "./PatientInfo.css";
import { useState, useEffect } from "react";
import axios from "../../../core/api/api";
import { AiOutlineFileDone } from "react-icons/ai";

const PatientInfo = () => {
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("appointmentId"));
    axios
      .get(`http://localhost:4000/appointments/appointment/${id}`)
      .then((response) => {
        console.log(response.data);
        setPatientInfo(response.data[0]["patient"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="patient-data-container">
        <div className="article">
          <div className="info-header">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2>{patientInfo.name}</h2>
            </div>
          </div>
          {/* <hr> */}
          <div className="record-info">
            <span>Weight</span>
            <span>{patientInfo.weight} kg</span>
          </div>
          <div className="record-info">
            <span>Age</span>
            <span>{patientInfo.age} yrs</span>
          </div>
          <div className="record-info">
            <span>Height</span>
            <span>{patientInfo.height} cm</span>
          </div>
          <div className="record-info">
            <span>Address</span>
            <span>{patientInfo.address}</span>
          </div>
          <div className="record-info">
            <span>Phone</span>
            <span>{patientInfo.phone}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientInfo;
