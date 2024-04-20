import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './BoardTable.css';

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70
    },
    {
        field: 'patientName',
        headerName: 'Patient Name',
        width: 130
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        type: 'singleSelect',
        valueOptions: ['Done', 'In progress', 'Active'],
//         valueGetter: (value, row) => `${row.status}`,
    },
];

const rows = [
    { id: 1, patientName: 'Snow Jon', age: 35, status: 'active'},
    { id: 2, patientName: 'Lannister Cersei', age: 42, status: 'in progress'},
    { id: 3, patientName: 'Lannister Jaime', age: 45, status: 'active'},
    { id: 4, patientName: 'Stark Arya', age: 16, status: 'done'},
    { id: 5, patientName: 'Targaryen Daenerys', age: null, status: 'active'},
    { id: 6, patientName: 'Melisandre', age: 150, status: 'released'},
    { id: 7, patientName: 'Clifford Ferrara', age: 44, status: 'active'},
    { id: 8, patientName: 'Frances Rossini', age: 36, status: 'done'},
    { id: 9, patientName: 'Roxie Harvey', age: 65, status: 'active'},
];

const DataTable = () => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                className='table'
            />
        </div>
    );
}

export default DataTable;