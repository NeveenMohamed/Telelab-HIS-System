import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from '../../../core/api/api';


const ResultSchema = Yup.object().shape({
    // WBC: Yup.string()
    //     .min(8, 'Username should be minimum 8 characters length')
    //     .required('Required'),
    // RBC: Yup.string()
    //     .min(8, 'Password should be minimum 8 characters length')
    //     .required('Password is required'),
});

const ResultForm = () => {

    const [labTest, setLabTest] = useState({})

    const data =  JSON.parse(localStorage.getItem("userData"))

    useEffect(() => {
        const id =  JSON.parse(localStorage.getItem("appointmentId"))
        axios.get(`http://localhost:4000/record/appointment/${id}`).then((response) => {
            setLabTest(response.data[0]["labTest"])
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            WBC: "",
            RBC: "",
            HGB: "",
            HCT: "",
            MCV: "",
            MCH: "",
            MCHC: "",
            PLT: "",
        },
        validationSchema: ResultSchema,
        onSubmit: values => {
            JSON.stringify(values, null, 2);
            console.log(values)

            const id =  JSON.parse(localStorage.getItem("appointmentId"))
            axios.put(`http://localhost:4000/appointment/${id}`, {"status":2})
        },
    });

    return (
        <Row className='justify-content-md-center' style={{ padding: '5%' }} >
            <Col xs={6}>
                <h1 className='text-center'>Fill up the Result...</h1>
                <Form onSubmit={formik.handleSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>WBC</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled = {data["user"]["role"] != "Doctor"}
                            name='WBC'
                            value={data["user"]["role"] == "Doctor" ?formik.values.WBC : labTest["WBC"]} />

                        <Form.Label>RBC</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled = {data["user"]["role"] != "Doctor"}
                            name='RBC'
                            value={data["user"]["role"] == "Doctor" ?formik.values.RBC : labTest["RBC"]} />
                            
                        <Form.Label>HGB</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled = {data["user"]["role"] != "Doctor"}
                            name='HGB'
                            value={data["user"]["role"] == "Doctor" ?formik.values.HGB : labTest["HGB"]} />

                        <Form.Label>HCT</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled = {data["user"]["role"] != "Doctor"}
                            name='HCT'
                            value={data["user"]["role"] == "Doctor" ?formik.values.HCT : labTest["HCT"]} />

                        {/* <div style={{ color: 'red' }}>
                            {formik.touched.username && formik.errors.username ?
                                formik.errors.username
                                : null}
                        </div> */}
                    </Form.Group>



                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>MCV</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled = {data["user"]["role"] != "Doctor"}
                            name='MCV'
                            value={data["user"]["role"] == "Doctor" ?formik.values.MCV : labTest["MCV"]} />

                        <Form.Label>MCH</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled = {data["user"]["role"] != "Doctor"}
                            name='MCH'
                            value={data["user"]["role"] == "Doctor" ?formik.values.MCH : labTest["MCH"]} />

                        <Form.Label>MCHC</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled = {data["user"]["role"] != "Doctor"}
                            name='MCHC'
                            value={data["user"]["role"] == "Doctor" ?formik.values.MCHC : labTest["MCHC"]} />

                        <Form.Label>PLT</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled = {data["user"]["role"] != "Doctor"}
                            name='PLT'
                            value={data["user"]["role"] == "Doctor" ?formik.values.PLT : labTest["PLT"]} />

                        {/* <div style={{ color: 'red' }}>
                            {formik.touched.password && formik.errors.password ?
                                formik.errors.password
                                : null}
                        </div> */}
                    </Form.Group>

                    {data["user"]["role"] == "Doctor" ?<Button variant="primary" type="submit">
                        Submit
                    </Button>:<></>}
                </Form>
            </Col>
        </Row>
    )
}

export default ResultForm