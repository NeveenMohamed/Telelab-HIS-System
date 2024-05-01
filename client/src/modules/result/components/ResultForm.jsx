import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import axios from "../../../core/api/api";
import { useNavigate } from "react-router-dom";
import "./ResultForm.css";

const ResultSchema = Yup.object().shape({
  // WBC: Yup.string()
  //     .min(8, 'Username should be minimum 8 characters length')
  //     .required('Required'),
  // RBC: Yup.string()
  //     .min(8, 'Password should be minimum 8 characters length')
  //     .required('Password is required'),
});

const ResultForm = () => {
  const [labTest, setLabTest] = useState({});

  const data = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("appointmentId"));
    axios
      .get(`http://localhost:4000/record/appointment/${id}`)
      .then((response) => {
        setLabTest(response.data[0]["labTest"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

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
    onSubmit: (values) => {
      JSON.stringify(values, null, 2);
      console.log(values);

      const id = JSON.parse(localStorage.getItem("appointmentId"));
      axios.post(`http://localhost:4000/record/`, {
        appointmentId: id,
        labTest: values,
      });
      axios.put(`http://localhost:4000/appointments/${id}`, { status: 2 });

      navigate("/appointments");
    },
  });

  return (
    <Row>
      <Form onSubmit={formik.handleSubmit}>
        <h1 className="text-center">The Results</h1>
        <div className="two-columns-display">
          <Col xs={5}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>WBC</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
                name="WBC"
                value={labTest == {} ? formik.values.WBC : labTest["WBC"]}
              />

              <Form.Label>RBC</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
                name="RBC"
                value={labTest == {} ? formik.values.RBC : labTest["RBC"]}
              />

              <Form.Label>HGB</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
                name="HGB"
                value={labTest == {} ? formik.values.HGB : labTest["HGB"]}
              />

              <Form.Label>HCT</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
                name="HCT"
                value={labTest == {} ? formik.values.HCT : labTest["HCT"]}
              />

              {/* <div style={{ color: 'red' }}>
                            {formik.touched.username && formik.errors.username ?
                                formik.errors.username
                                : null}
                            </div> */}
            </Form.Group>
          </Col>

          <Col xs={5}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>MCV</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
                name="MCV"
                value={labTest == {} ? formik.values.MCV : labTest["MCV"]}
              />

              <Form.Label>MCH</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
                name="MCH"
                value={labTest == {} ? formik.values.MCH : labTest["MCH"]}
              />

              <Form.Label>MCHC</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
                name="MCHC"
                value={labTest == {} ? formik.values.MCHC : labTest["MCHC"]}
              />

              <Form.Label>PLT</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={true}
                name="PLT"
                value={labTest == {} ? formik.values.PLT : labTest["PLT"]}
              />

              {/* <div style={{ color: 'red' }}>
                            {formik.touched.password && formik.errors.password ?
                                formik.errors.password
                                : null}
                            </div> */}
            </Form.Group>
          </Col>
        </div>
      </Form>
    </Row>
  );
};

export default ResultForm;
