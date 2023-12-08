import { Col, Card, Form } from 'react-bootstrap';

import registrationImg from '../assets/signup.jpg';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

const SignupCard = (props) => {
  const { values } = props;

  const {
    formik,
    title,
    placeholderName,
    placeholderPassword,
    placeholderPasswordConfirmation,
    userExists,
    makedRegistration,
    registrationFailed,
    inputNameRef,
  } = values;

  const userValues = {
    formik,
    field: 'username',
    type: 'text',
    placeholder: placeholderName,
    failed: (formik.errors.username && formik.touched.username)
    || registrationFailed,
    inputNameRef,
    error: formik.errors.username,
  };

  const passwordValues = {
    formik,
    field: 'password',
    type: 'password',
    placeholder: placeholderPassword,
    failed: (formik.errors.password && formik.touched.password)
    || registrationFailed,
    inputNameRef: null,
    error: formik.errors.password,
  };

  const passwordConfirmationValues = {
    formik,
    field: 'passwordConfirmation',
    type: 'password',
    placeholder: placeholderPasswordConfirmation,
    failed: (formik.errors.passwordConfirmation && formik.touched.passwordConfirmation)
    || registrationFailed,
    inputNameRef: null,
    error: registrationFailed ? userExists : formik.errors.passwordConfirmation,
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="row p-5">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <img src={registrationImg} className="rounded-circle" alt={title} />
        </Col>
        <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{title}</h1>
          <InputField values={userValues} />
          <InputField values={passwordValues} />
          <InputField values={passwordConfirmationValues} />
          <SubmitButton values={{ formik, title: makedRegistration }} />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignupCard;
