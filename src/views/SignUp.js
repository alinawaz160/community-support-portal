import React, { useState } from 'react';
import { useFormik, Form, Field } from 'formik';
import { TextField, Button, Card, CardContent, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from "@mui/material/styles";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUp() {

    const history = useNavigate ();

    var formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async(values) => {
            try{
                const res = await axios.fetch('/register' ,{
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        fullname: values.fullname,
                        email: values.email,
                        password: values.password,
                        phone: values.phone,
                        address: values.address,
                        confirmPassword: values.confirmPasswordvalues
                    })
                })

                if(res.status === 400 || !res){
                    window.alert("Already Used Details");
                }else {
                    window.alert("Registered Successfully");
                    history.pushState("/login");
                }
            }
            catch(error){
                console.log(error);
            }
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string()
                .max(25, 'Must be 25 characters or less')
                .required('Required'),
            address: Yup.string()
                .required('Required'),
            phone: Yup.string()
                .max(11, 'Must be 11 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Password is required')
                .min(8, 'Must be 8 characters or greater')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "One Uppercase, One Lowercase, One Number and one special case Character"
                )
            ,
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
        }),
    });

    var [showPassword, setShowPassword] = useState(false);
    var handleClickShowPassword = () => setShowPassword(!showPassword);
    var handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <div className='p-4 h-[100vh] w-[100%] flex flex-col justify-center items-center'
        >
            <Card className='card w-[80%] text-center md:w-[30%]'>
                <CardContent>
                    <div>
                        <p className='para font-bold'>Sign Up</p>
                    </div>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleRoundedIcon />
                                </InputAdornment>
                            ),
                        }}
                        size='small'
                        type="text"
                        name="fullname"
                        label="FullName / NGO_Name*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fullname}
                        error={formik.touched.fullname && formik.errors.fullname}
                        helperText={formik.touched.fullname && formik.errors.fullname}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocalPhoneRoundedIcon />
                                </InputAdornment>
                            ),
                        }}
                        size='small'
                        type="number"
                        name="phone"
                        label="Phone*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        error={formik.touched.phone && formik.errors.phone}
                        helperText={formik.touched.phone && formik.errors.phone}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOnRoundedIcon />
                                </InputAdornment>
                            ),
                        }}
                        size='small'
                        type="text"
                        name="address"
                        label="Address*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        error={formik.touched.address && formik.errors.address}
                        helperText={formik.touched.address && formik.errors.address}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailRoundedIcon />
                                </InputAdornment>
                            ),
                        }}
                        size='small'
                        type="email"
                        name="email"
                        label="Email*"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockRoundedIcon />
                                </InputAdornment>
                            ),
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
                        label="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockRoundedIcon />
                                </InputAdornment>
                            ),
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
                        name="confirmPassword"
                        label="Confirm Password*"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        size='small'
                        style={{ width: "50%", backgroundColor: "#1e2950" }}
                        type="submit"
                        onClick={formik.submitForm}
                        variant="contained"
                        fullWidth
                    >
                        Sign Up
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

}

export default SignUp;