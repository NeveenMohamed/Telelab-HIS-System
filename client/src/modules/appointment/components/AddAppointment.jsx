import React from 'react'
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import axios from "../../../core/api/api";
import { useNavigate } from "react-router-dom";


const AddAppointment = () => {

    const ResultSchema = Yup.object().shape({
        // WBC: Yup.string()
        //     .min(8, 'Username should be minimum 8 characters length')
        //     .required('Required'),
        // RBC: Yup.string()
        //     .min(8, 'Password should be minimum 8 characters length')
        //     .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            Name: "",
            Age: "",
            Weight: "",
            Height: "",
            TestType: "",
            Date: "",
            Time: "",
        },
        validationSchema: ResultSchema,
        onSubmit: (values) => {
            // JSON.stringify(values, null, 2);
            // console.log(values);

            // const id = JSON.parse(localStorage.getItem("appointmentId"));
            // axios.post(`http://localhost:4000/record/`, {
            //     appointmentId: id,
            //     labTest: values,
            // });
            // axios.put(`http://localhost:4000/appointments/${id}`, { status: 2 });

            // navigate("/appointments");
        },
    });
    return (
        <Row className="justify-content-md-center" style={{ padding: "5%" }}>
            <Col xs={6}>
                <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center">Reservation</h1>
                    <div className="two-columns-display">
                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Patient Name</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type="text"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // disabled={
                                    //     data["user"]["role"] != "Doctor" ||
                                    //     Object.keys(labTest).length != 0
                                    // }
                                    required={true}
                                    name="Name"
                                // value={labTest == {} ? formik.values.WBC : labTest["WBC"]}
                                />

                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type="number"
                                    step="1"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // disabled={
                                    //     data["user"]["role"] != "Doctor" ||
                                    //     Object.keys(labTest).length != 0
                                    // }
                                    name="Age"
                                // value={labTest == {} ? formik.values.RBC : labTest["RBC"]}
                                />

                                <Form.Label>Weight (kg)</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type="number"
                                    step="0.5"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // disabled={
                                    //     data["user"]["role"] != "Doctor" ||
                                    //     Object.keys(labTest).length != 0
                                    // }
                                    name="Weight"
                                // value={labTest == {} ? formik.values.HGB : labTest["HGB"]}
                                />

                                <Form.Label>Height (cm)</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type="number"
                                    step="1"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // disabled={
                                    //     data["user"]["role"] != "Doctor" ||
                                    //     Object.keys(labTest).length != 0
                                    // }
                                    name="Height"
                                // value={labTest == {} ? formik.values.HCT : labTest["HCT"]}
                                />

                                {/* <div style={{ color: 'red' }}>
                            {formik.touched.username && formik.errors.username ?
                                formik.errors.username
                                : null}
                            </div> */}
                            </Form.Group>
                        </Col>

                        <Col xs={4}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Test Type</Form.Label>
                                <Form.Select
                                    size='lg'
                                    placeholder=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // disabled={
                                    //     data["user"]["role"] != "Doctor" ||
                                    //     Object.keys(labTest).length != 0
                                    // }
                                    name="TestType"
                                // value={labTest == {} ? formik.values.MCV : labTest["MCV"]}
                                >
                                    <option>Complete Blood Count</option>
                                </Form.Select>

                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type="date"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // disabled={
                                    //     data["user"]["role"] != "Doctor" ||
                                    //     Object.keys(labTest).length != 0
                                    // }
                                    name="Date"
                                // value={labTest == {} ? formik.values.MCH : labTest["MCH"]}
                                />

                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    size='lg'
                                    type="time"
                                    placeholder=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    // disabled={
                                    //     data["user"]["role"] != "Doctor" ||
                                    //     Object.keys(labTest).length != 0
                                    // }
                                    name="Time"
                                // value={labTest == {} ? formik.values.MCHC : labTest["MCHC"]}
                                />
                                {/* <div style={{ color: 'red' }}>
                            {formik.touched.password && formik.errors.password ?
                                formik.errors.password
                                : null}
                            </div> */}
                            </Form.Group>
                        </Col>
                    </div>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{
                            width: "100%",
                            backgroundColor: "#C4DFDF",
                            color: "black",
                            border: "0",
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default AddAppointment