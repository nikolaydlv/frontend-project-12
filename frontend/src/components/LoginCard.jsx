import { Link } from 'react-router-dom';
import { Col, Card, Form } from 'react-bootstrap';

import loginImg from '../assets/login.jpg';
import InputField from './InputField.jsx';
import SubmitButton from './SubmitButton';

const LoginCard = (props) => {
  const { values } = props;

  const {
    formik,
    title,
    placeholderName,
    placeholderPassword,
    noAccount,
    registration,
    error,
    authFailed,
    inputNameRef,
    path,
  } = values;

  const userValues = {
    formik,
    field: 'username',
    type: 'text',
    placeholder: placeholderName,
    authFailed,
    inputNameRef,
    error: '',
  };

  const passwordValues = {
    formik,
    field: 'password',
    type: 'password',
    placeholder: placeholderPassword,
    failed: authFailed,
    inputNameRef: null,
    error,
  };

  return (
    <Card className="shadow-sm">

      <Card.Body className="row p-5">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <img src={loginImg} className="rounded-circle" alt={title} />
        </Col>
        <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{title}</h1>
          <InputField values={userValues} />
          <InputField values={passwordValues} />
          <SubmitButton values={{ formik, title }} />
        </Form>
      </Card.Body>

      <Card.Footer className="p-4">
        <div className="text-center">
          <span className="me-2">
            {noAccount}
          </span>
          <Card.Link as={Link} to={path}>{registration}</Card.Link>
        </div>
      </Card.Footer>

    </Card>
  );
};

export default LoginCard;
