/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

import SignupCard from './SignupCard.jsx';

import useAuth from '../hooks/auth.js';
import routes from '../routes.js';
import { registrationSchema } from '../validation/validationSchema.js';

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputNameRef = useRef();
  const [registrationFailed, setRegistrationFailed] = useState(false);

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },

    validationSchema: registrationSchema(
      t('registrationRules.name'),
      t('registrationRules.password'),
      t('registrationRules.passwordEquality'),
      t('errors.required'),
    ),

    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), {
          username: values.username,
          password: values.password,
        });

        localStorage.setItem('userdatas', JSON.stringify(res.data));
        auth.logIn();
        setRegistrationFailed(false);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError) {
          if (err.response.status === 409) {
            setRegistrationFailed(true);
            navigate(routes.signupPagePath());
            inputNameRef.current.select();
          } else {
            toast.error(t('errors.network'));
          }
        } else {
          toast.error(err.message);
        }
      }
    },
  });

  const values = {
    formik,
    title: t('registration'),
    placeholderName: t('placeholders.username'),
    placeholderPassword: t('placeholders.password'),
    placeholderPasswordConfirmation: t('placeholders.passwordConfirmation'),
    userExists: t('errors.userExist'),
    makedRegistration: t('makeRegistration'),
    registrationFailed,
    inputNameRef,
  };

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <SignupCard values={values} />
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
