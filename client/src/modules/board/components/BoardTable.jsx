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



const BoardTable = () => {
    function createData(name, status, fat, carbs, protein) {
        return { name, status, fat, carbs, protein };
    }

    const patients = [
        createData('Frozen yoghurt', 1, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 2, 9.0, 37, 4.3),
        createData('Eclair', 1, 16.0, 24, 6.0),
        createData('Cupcake', 3, 3.7, 67, 4.3),
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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">status</TableCell>
                        <TableCell align="right">Fat</TableCell>
                        <TableCell align="right">Carbs</TableCell>
                        <TableCell align="right">Protein</TableCell>
                        <TableCell align="right">Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient) => (
                        <TableRow
                            key={patient.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {patient.name}
                            </TableCell>
                            <TableCell align="right">{patient.status == 1 ? <CiAirportSign1 size={20} /> : patient.status == 2 ? <CiAirportSign1 /> : <CiAirportSign1 />} </TableCell>
                            <TableCell align="right">{patient.fat}</TableCell>
                            <TableCell align="right">{patient.carbs}</TableCell>
                            <TableCell align="right">{patient.protein}</TableCell>
                            <TableCell align="right">
                                <button>View Result</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BoardTable