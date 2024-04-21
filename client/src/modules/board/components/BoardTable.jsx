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
    function createData(name, status, fat, carbs, protein) {
        return { name, status, fat, carbs, protein };
    }

    const patients = [
        createData('Frozen yoghurt', 1, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 2, 9.0, 37, 4.3),
        createData('Eclair', 1, 16.0, 24, 6.0),
        createData('Cupcake', 2, 3.7, 67, 4.3),
        createData('Gingerbread', 2, 16.0, 49, 3.9),]

    useEffect(() => {
        axios.get('/lab').then((response) => {
            console.log(response)
            setLabs(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const [labs, setLabs] = useState()
        
    return (
    <div className='table-container'>
        <TableContainer component={Paper}>
            <Table className='table' sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className='TableHeadCss'>
                    <TableRow>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"left"}}>Dessert (100g serving)</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">status</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Fat</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Carbs</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Protein</TableCell>
                        <TableCell sx={{ color: 'white' , fontWeight: 'bold' , fontSize: 16 , textAlign:"center"}} align="right">Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow className='TableRowCss'
                            key={patient.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {patient.name}
                            </TableCell>
                            <TableCell align="center">{patient.status == 2 ? <AiOutlineFileDone className='DoneIcon' size={28}/> :  <GrInProgress className='GrInProgressIcon' size={28}/>} </TableCell>
                            <TableCell align="center">{patient.fat}</TableCell>
                            <TableCell align="center">{patient.carbs}</TableCell>
                            <TableCell align="center">{patient.protein}</TableCell>
                            <TableCell align="center">
                                <button className='buttonCss'>View Result</button>
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