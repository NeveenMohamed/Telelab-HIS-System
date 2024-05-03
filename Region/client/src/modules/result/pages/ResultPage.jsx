import React from 'react'
import ResultForm from '../components/ResultForm'
import NavBar from '../../../core/components/navbar/NavBar'
import PatientInfo from '../../../core/components/patientInfo/PatientInfo'
import { Row, Col } from 'react-bootstrap'


const ResultPage = () => {
    return (
        <>
            <NavBar />
            <Row style={{height: "80vh"}}>
                <Col xs={5} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <PatientInfo />
                </Col>
                <Col xs={7} style={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
                <ResultForm />
                </Col>
            </Row>
        </>
    )
}

export default ResultPage