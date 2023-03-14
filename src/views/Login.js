import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Card, CardContent,InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from "@mui/material/styles";
import { LockOutlined } from '@mui/icons-material';
import { message } from 'antd';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
    const [user, setUser] = useState("vol");
    var [showPassword, setShowPassword] = useState(false);
    var handleClickShowPassword = () => setShowPassword(!showPassword);
    var handleMouseDownPassword = () => setShowPassword(!showPassword);
    return (
        <div className='p-4 h-[70vh] w-[100%] flex flex-col justify-center items-center'
        >
            <Card className='card w-[80%] text-center md:w-[30%]'>
                <CardContent>
                    <div>
                        <LockOutlined color="primary" fontSize='large' />
                    </div>
                    <div className='btns flex flex-row items-center justify-center'>
                        <div>
                            <Button
                                onClick={() => { setUser("vol"); window.localStorage.setItem("user", "Volunteer") }}
                                size={"large"}
                                color={"primary"}
                            > As Volunteer</Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => { setUser("ngo"); window.localStorage.setItem("user", "Ngo") }}
                                size={"large"}
                                color={"secondary"}
                            > As NGO</Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => { setUser("admin"); window.localStorage.setItem("user", "Admin") }}
                                size={"large"}
                                color={"error"}
                            > As Admin</Button>
                        </div>
                    </div>



                    <Formik className="mx-auto sm:mx-0 sm:my-0"
                        initialValues={{ email: '', password: '' }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                let endPoint = null
                                if (user && user === "vol") {
                                    endPoint = "login"
                                }
                                if (user && user === "ngo") {
                                    endPoint = "ngoLogin"
                                }
                                if (user === "admin") {
                                    endPoint = "adminLogin"
                                }
                                const responce = await fetch('/' + endPoint, {
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
                                    message.error("Invalid Credentials");
                                    message.info("Or your account creation request is in pending ");
                                }
                                else {
                                    console.log("res", responce)
                                    message.success("Login Successfull");
                                    window.location.replace('/Dashboard');
                                    window.localStorage.setItem("email", values.email);
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
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    size='small'
                                    type={showPassword ? "text" : "password"}
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