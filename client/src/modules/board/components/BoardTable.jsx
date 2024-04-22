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
    function createData(patientID, labID, status, testType, date, time) {
        return { patientID, labID, status, testType, date, time };
    }

    const patients = [
        createData('Frozen yoghurt', 1, 1, 24, 4.0, 0),
        createData('Ice cream sandwich', 2, 2, 37, 4.3, 0),
        createData('Eclair', 1, 1, 24, 6.0, 0),
        createData('Cupcake', 2, 2, 67, 4.3, 0),
        createData('Gingerbread', 2, 2, 49, 30, 0),]

    useEffect(() => {
        axios.get(`http://localhost:4000/appointments/lab/${1}`).then((response) => {
            console.log(response)
            const labsData = response.data
            setLabs(labsData??[])
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const [labs, setLabs] = useState([])
        
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
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {labs.map((patient) => (
                        <TableRow className='TableRowCss'
                            key={patient.patientID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {patient.patientID}
                            </TableCell>
                            <TableCell align="center">{patient.labID}</TableCell>
                            <TableCell align="center">{patient.status == 2 ? <AiOutlineFileDone className='DoneIcon' size={28}/> :  <GrInProgress className='GrInProgressIcon' size={28}/>} </TableCell>
                            <TableCell align="center">{patient.testType}</TableCell>
                            <TableCell align="center">{patient.date}</TableCell>
                            <TableCell align="center">{patient.time}</TableCell>
                            <TableCell align="center">
                                <button className='buttonCss'>Result</button>
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