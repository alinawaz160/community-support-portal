import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from "@mui/material/styles";
import { LockOutlined } from '@mui/icons-material';
import { message } from 'antd';
import {useNavigate} from "react-router-dom";

const useStyles = createTheme((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: 0,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 0,
    },
    submit: {
        margin: 0,
    },
}));

function Login() {

        const classes  = useStyles();
        const history = useNavigate();
        return (
            <div className='p-4 h-[70vh] w-[100%] flex flex-col justify-center items-center'
            >
                <Card className='card w-[80%] text-center md:w-[30%]'>
                    <CardContent>
                        <div>
                            <LockOutlined color="primary" fontSize='large' />
                        </div>
                        <Formik className="mx-auto sm:mx-0 sm:my-0"
                            initialValues={{ email: '', password: '' }}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const responce = await fetch('/login', {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            email: values.email,
                                            password: values.password
                                        })
                                    })
                                    if (responce.status === 400 || !responce) {
                                        message.error("Invalid Credentials")
                                    }
                                    else {
                                        message.success("Login Successfull");
                                        window.location.reload();
                                        history.pushState('/');
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                        >

                            {({ isSubmitting, handleChange, values }) => (
                                <Form>
                                    <TextField
                                        size='small'
                                        type="text"
                                        name="email"
                                        placeholder="Your email*"
                                        onChange={handleChange}
                                        value={values.email}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                    />
                                    <TextField
                                        size='small'
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={values.password}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                    />
                                    <Button
                                        type="submit"
                                        size='small'
                                        style={{ width: "50%", backgroundColor: "#1e2950" }}
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                    >
                                        Log in
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </div>
        );
}
export default Login;