import { useFormik } from 'formik';
import { Form, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';


const ResultSchema = Yup.object().shape({
    // WBC: Yup.string()
    //     .min(8, 'Username should be minimum 8 characters length')
    //     .required('Required'),
    // RBC: Yup.string()
    //     .min(8, 'Password should be minimum 8 characters length')
    //     .required('Password is required'),
});

const ResultForm = () => {
    const formik = useFormik({
        initialValues: {
            WBC: '',
            RBC: '',
            HGB: '',
            HCT: '',

            MCV: '',
            MCH: '',
            MCHC: '',
            PLT: '',
        },
        validationSchema: ResultSchema,
        onSubmit: values => {
            JSON.stringify(values, null, 2);
            console.log(values)
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
                            name='WBC'
                            value={formik.values.WBC} />

                        <Form.Label>RBC</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='RBC'
                            value={formik.values.RBC} />
                            
                        <Form.Label>HGB</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='HGB'
                            value={formik.values.HGB} />

                        <Form.Label>HCT</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='HCT'
                            value={formik.values.HCT} />

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
                            name='MCV'
                            value={formik.values.MCV} />

                        <Form.Label>MCH</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='MCH'
                            value={formik.values.MCH} />

                        <Form.Label>MCHC</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='MCHC'
                            value={formik.values.MCHC} />

                        <Form.Label>PLT</Form.Label>
                        <Form.Control type="number" step="0.01" placeholder=""
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='PLT'
                            value={formik.values.PLT} />

                        {/* <div style={{ color: 'red' }}>
                            {formik.touched.password && formik.errors.password ?
                                formik.errors.password
                                : null}
                        </div> */}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default ResultForm