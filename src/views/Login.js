import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@mui/material';
import { Avatar, Alert, CssBaseline, FormControlLabel, Checkbox, Grid, Box, Typography, Container } from "@mui/material";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { CRow, CCol } from "@coreui/react";
import {createTheme} from "@mui/material/styles";
import { LockOutlined } from '@mui/icons-material';

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
        margin:0,
    },
}));
function doSubmit(data){

}
function Login() {
    const classes = useStyles();
    const [state, setState] = useState({ username: '', password: '' })
    return (
        //     <div className='container'>
        //         {/* <Card>

        // </Card> */}
        //         <div className="image flex flex-col justify-center items-center w-[100%]">
        //             <img className="image md:auto rounded-2xl w-[70%]" src={"../assets/Flood2.png"} />
        //             <div className="top-left md:absolute top-15 left-[12rem] md:basline">
        //                 <h1 className="text-2xl md:text-4xl md:items-left md:w-10 mx-2 text-white font-bold">Let's Rebuild Pakistan</h1>
        //                 <div className="button mx-[10px] my-5">
        //                     <Button
        //                         style={{ background: "#38848c", color: "white", fontWeight: "medium", borderRadius: "10" }}>
        //                         Donate Now
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>
        //         <Formik
        //             initialValues={{ email: '', password: '' }}
        //             onSubmit={(values, { setSubmitting }) => {
        //                 // handle form submission here
        //             }}
        //         >

        //             {({ isSubmitting, handleChange, values }) => (
        //                 <Form>
        //                     <TextField
        //                         type="text"
        //                         name="userName"
        //                         placeholder="User Name*"
        //                         onChange={handleChange}
        //                         value={values.username}
        //                         variant="outlined"
        //                         margin="normal"
        //                         fullWidth
        //                     />
        //                     <TextField
        //                         type="password"
        //                         name="password"
        //                         placeholder="Password"
        //                         onChange={handleChange}
        //                         value={values.password}
        //                         variant="outlined"
        //                         margin="normal"
        //                         fullWidth
        //                     />
        //                     <Button
        //                         type="submit"
        //                         variant="contained"
        //                         color="primary"
        //                         disabled={isSubmitting}
        //                         fullWidth
        //                     >
        //                         Log in
        //                     </Button>
        //                 </Form>
        //             )}
        //         </Formik>
        //     </div>



        <div>
            <CssBaseline />
            <CRow>
                <CCol md={4}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                value={state.username}
                                onChange={(e) => setState({ ...state, username: e.target.value })}
                                label="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            {
                                state.status === 'success' ? <Alert severity="success">Login Successfull!</Alert>
                                    : state.status === 'failed' ?
                                        <Alert severity="error">Username or Password is wrong!</Alert> : null
                            }
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={state.password}
                                onChange={(e) => setState({ ...state, password: e.target.value })}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="button"
                                fullWidth
                                onClick={() => doSubmit(state)}
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </CCol>
                <CCol md={4} ></CCol>
            </CRow>
        </div>
    );

}
export default Login;