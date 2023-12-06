/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import { loginSchema } from '../validation/validationSchema.js';
import useAuth from '../hooks/auth.js';
import loginImg from '../assets/login.jpg';
import routes from '../routes.js';

const LoginPage = () => {
  const inputNameRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      validationSchema: loginSchema(t('errors.required')),
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), {
          username: values.username,
          password: values.password,
        });

        localStorage.setItem('userdata', JSON.stringify(response.data));
        auth.logIn();
        setAuthFailed(false);
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);

        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          navigate('/login');
          inputNameRef.current.select();
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
                <img src={loginImg} className="rounded-circle" alt={t('entry')} />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('entry')}</h1>

                <Form.Floating className="mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('placeholders.login')}
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={inputNameRef}
                  />
                  <Form.Label htmlFor="username">{t('placeholders.login')}</Form.Label>
                </Form.Floating>

                <Form.Floating className="mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('placeholders.password')}
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                  />
                  <Form.Label htmlFor="password">{t('placeholders.password')}</Form.Label>
                  <div className="invalid-tooltip">{t('errors.invalidFeedback')}</div>
                </Form.Floating>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                  disabled={formik.isSubmitting}
                >
                  {t('entry')}
                </Button>

              </Form>
            </Card.Body>

            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-2">
                  {t('noAccount')}
                </span>
                <Card.Link as={Link} to="/signup">{t('registration')}</Card.Link>
              </div>
            </Card.Footer>

          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
