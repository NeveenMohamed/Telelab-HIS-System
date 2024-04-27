import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CiAirportSign1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "../../../core/api/api";
import "./BoardTable.css";
import { GrInProgress } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BoardTable = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/appointments/`)
      .then((response) => {
        const appointmentsData = response.data;
        setAppointmentsData(appointmentsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  function navigateReport(id) {
    localStorage.setItem("appointmentId", JSON.stringify(id));
    navigate("/result");
  }

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table
          className="table"
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead className="TableHeadCss">
            <TableRow>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                Patient Name
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
                align="right"
              >
                Lab ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
                align="right"
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
                align="right"
              >
                Test Type
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
                align="right"
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
                align="right"
              >
                Time
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  textAlign: "center",
                }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentsData.map((appointment) => (
              <TableRow
                className="TableRowCss"
                key={appointment._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {appointment.patient.name}
                </TableCell>
                <TableCell align="center">{appointment.labId}</TableCell>
                <TableCell align="center">
                  {appointment.status == 2 ? (
                    <AiOutlineFileDone className="DoneIcon" size={28} />
                  ) : (
                    <GrInProgress className="GrInProgressIcon" size={28} />
                  )}{" "}
                </TableCell>
                <TableCell align="center">{appointment.testType}</TableCell>
                <TableCell align="center">{appointment.date}</TableCell>
                <TableCell align="center">{appointment.time}</TableCell>
                <TableCell align="center">
                  {appointment.status != 1 ? (
                    <button
                      className="buttonCss"
                      onClick={() => navigateReport(appointment._id)}
                    >
                      Show Report
                    </button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BoardTable;
