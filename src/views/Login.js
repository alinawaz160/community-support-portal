import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@mui/material';
import { Avatar, Alert, CssBaseline, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from "@mui/material";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { CRow, CCol } from "@coreui/react";
import { createTheme } from "@mui/material/styles";
import { LockOutlined } from '@mui/icons-material';


function doSubmit(data) {

}
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
class Login extends React.Component {

    // const [state, setState] = useState({ username: '', password: '' })
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
    }
    render() {
        const { classes } = useStyles;
        return (
            <div className='p-4 h-[70vh] w-[100%] flex flex-col justify-center items-center'
            >
                <div>
                    <LockOutlined color="primary" fontSize='large'/>
                </div>
                <Formik className="mx-auto sm:mx-0 sm:my-0" 
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        // handle form submission here
                    }}
                >

                    {({ isSubmitting, handleChange, values }) => (
                        <Form>
                            <TextField
                                type="text"
                                name="userName"
                                placeholder="User Name*"
                                onChange={handleChange}
                                value={values.username}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <TextField
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
            </div>
        );

    }
}
export default Login;