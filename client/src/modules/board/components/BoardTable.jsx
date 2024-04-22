import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CiAirportSign1 } from "react-icons/ci";
import { useEffect, useState } from 'react';
import axios from '../../../core/api/api';
import './BoardTable.css'
import { GrInProgress } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";

const BoardTable = () => {

    const [labs, setLabs] = useState([])

    const [userData, setUserData] = useState({})
    
    useEffect(() => {
        const data =  JSON.parse(localStorage.getItem("userData"))
        console.log(data);
        axios.get(`http://localhost:4000/appointments/lab/${1}`).then((response) => {
            console.log(response)
            const labsData = response.data
            setLabs(labsData)
            setUserData(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
    <div className='table-container'>
        <TableContainer component={Paper}>
            <Table className='table' sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className='TableHeadCss'>
                    <TableRow>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"left"}}>Patient ID</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Lab ID</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Status</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Test Type</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Date</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Time</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {labs.map((patient) => (
                        
                        <TableRow className='TableRowCss'
                            key={patient.patientId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {patient.patientId}
                            </TableCell>
                            <TableCell align="center">{patient.labId}</TableCell>
                            <TableCell align="center">{patient.status == 2 ? <AiOutlineFileDone className='DoneIcon' size={28}/> :  <GrInProgress className='GrInProgressIcon' size={28}/>} </TableCell>
                            <TableCell align="center">{patient.testType}</TableCell>
                            <TableCell align="center">{patient.date}</TableCell>
                            <TableCell align="center">{patient.time}</TableCell>
                            <TableCell align="center">
                            {userData["user"]["role"] == "Doctor"?
                                <button className='buttonCss' >Add Report</button>:<button className='buttonCss'>Show Report</button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

export default BoardTable