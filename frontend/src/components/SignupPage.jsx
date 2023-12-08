/* eslint-disable max-len */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import routes from '../routes.js';
import useAuth from '../hooks/auth.js';
import registrationImg from '../assets/signup.jpg';
import { registrationSchema } from '../validation/validationSchema.js';

const SignupPage = () => {
  const auth = useAuth();
  const inputNameRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">

            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <img src={registrationImg} className="rounded-circle" alt={t('registration')} />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('registration')}</h1>

                <Form.Floating className="mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    placeholder={t('placeholders.login')}
                    id="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={(formik.errors.username && formik.touched.username) || registrationFailed}
                    ref={inputNameRef}
                  />
                  <Form.Label htmlFor="username">{t('placeholders.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                </Form.Floating>

                <Form.Floating className="mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    placeholder={t('placeholders.password')}
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={(formik.errors.password && formik.touched.password) || registrationFailed}
                  />
                  <Form.Label htmlFor="password">{t('placeholders.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                </Form.Floating>

                <Form.Floating className="mb-4">
                  <Form.Control
                    name="passwordConfirmation"
                    placeholder={t('placeholders.passwordConfirmation')}
                    type="password"
                    id="passwordConfirmation"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirmation}
                    isInvalid={(formik.errors.passwordConfirmation
                      && formik.touched.passwordConfirmation) || registrationFailed}
                  />
                  <Form.Label htmlFor="passwordConfirmation">{t('placeholders.passwordConfirmation')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed
                      ? t('errors.userExist')
                      : formik.errors.passwordConfirmation}
                  </Form.Control.Feedback>
                </Form.Floating>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('makeRegistration')}
                </Button>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
