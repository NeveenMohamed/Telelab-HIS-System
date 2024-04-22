// import React, { useEffect, useState } from 'react'
import axios from '../../../core/api/api';
import { useFormik } from 'formik';
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(8, 'Username should be minimum 8 characters length')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password should be minimum 8 characters length')
        .required('Password is required'),
});

const LoginForm = () => {

    // const [first, setfirst] = useState()
    // const firstList = [
    //     {
    //         id: 1,
    //         username: 'admin',
    //         password: 'admin'
    //     },
    //     {
    //         id: 2,
    //         username: 'admin',
    //         password: 'admin'
    //     },
    //     {
    //         id: 3,
    //         username: 'admin',
    //         password: 'admin'
    //     }
    // ]

    const navigate = useNavigate();


    const fire = (values) => {
        axios.post('http://localhost:4000/user', values).then((response) => {
            console.log(response.data)
            localStorage.setItem("userData", JSON.stringify(response.data))
            navigate("/appointments");
        }).catch((error) => {
            console.log(error)
        })
    }

    // axios.put(`/lab/${2}`, { username: 'admin', password: 'admin' }, { params: 1 }).then((response) => {
    //     console.log(response)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // axios.delete(`/lab/${2}`).then((response) => {
    //     console.log(response)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // axios.get('/login').then((response) => {
    //     console.log(response)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // useEffect(() => {
    //     fire()
    // }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            // JSON.stringify(values, null, 2);
            console.log(values)
            fire(values)
        },
    });

    return (
        // <div>{firstList.map((el) => {
        //     return (
        //         <>
        //             <div key={el.id}>{el.username}</div>
        //             <div key={el.id}>{el.password}</div>
        //         </>
        //     )
        // })}</div>
        <Row className='justify-content-md-center'  style={{padding:'5%'}} >
            <Col xs={6}>
                <h1 className='text-center'>Login</h1>
                <Form onSubmit={formik.handleSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='username'
                            value={formik.values.username} />

                        <div style={{color:'red'}}>
                            {formik.touched.username && formik.errors.username ?
                                formik.errors.username
                                : null}
                        </div>
                    </Form.Group>



                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='password'
                            value={formik.values.password} />

                        <div style={{color:'red'}}>
                            {formik.touched.password && formik.errors.password ?
                                formik.errors.password
                                : null}
                        </div>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default LoginForm