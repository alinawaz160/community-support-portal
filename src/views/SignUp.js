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
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

function SignUp() {

    const history = useNavigate();

    var [showPassword, setShowPassword] = useState(false);
    const [ngoFields, setngoFields] = useState(null);
    var handleClickShowPassword = () => setShowPassword(!showPassword);
    var handleMouseDownPassword = () => setShowPassword(!showPassword);

    var formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: async (values, { resetForm }) => {
            if (!ngoFields) {
                console.log(values);
                try {
                    const res = await fetch('/register', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            fullname: values.fullname,
                            email: values.email,
                            password: values.password,
                            phone: values.phone,
                            address: values.address,
                            activeStatus:false,
                            confirmPassword: values.confirmPassword,
                            requestCertification :false
                        })
                    })

                    if (res.status === 400 || !res) {
                        message.error("Already used Credentials")

                    } else {
                        message.success("Registered Successfully");
                        resetForm({});
                    }
                }
                catch (error) {
                    console.log(error);
                }
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

    var formik2 = useFormik({
        initialValues: {
            ngoName: "",
            email: "",
            phone: "",
            branches: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await fetch('/registerNgo', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ngoName: values.ngoName,
                        email: values.email,
                        password: values.password,
                        phone: values.phone,
                        branches: values.branches,
                        activeStatus:false,
                        confirmPassword: values.confirmPassword,
                    })
                })

                if (res.status === 400 || !res) {
                    message.error("Already used Credentials")

                } else {
                    message.success("Registered Successfully");
                    resetForm({});
                }
            }
            catch (error) {
                console.log(error);
            }
        },
        validationSchema: Yup.object().shape({
            ngoName: Yup.string()
                .max(25, 'Must be 25 characters or less')
                .required('Required'),
            branches: Yup.string()
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

    return (
        <div className='p-4 h-[100vh] w-[100%] flex flex-col justify-center items-center'
        >
            <Card className='card w-[80%] text-center md:w-[30%]'>
                <CardContent>
                    <div>
                        <p className='para font-bold'>Sign Up</p>
                    </div>
                    <div className='btns flex flex-row items-center justify-center'>
                        <div>
                            <Button
                                onClick={() => { setngoFields(null) }}
                                size={"large"}
                                color={"primary"}
                            > Volunteer</Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => { setngoFields(true) }}
                                size={"large"}
                                color={"error"}
                            > NGO</Button>
                        </div>
                    </div>



                {!ngoFields && ngoFields == null? (    
                    <div>
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
                        label="FullName"
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
                    </div>
                    ):(
                        <div>
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
                        name="ngoName"
                        label="NGO Name"
                        onBlur={formik2.handleBlur}
                        onChange={formik2.handleChange}
                        value={formik2.values.ngoName}
                        error={formik2.touched.ngoName && formik2.errors.ngoName}
                        helperText={formik2.touched.ngoName && formik2.errors.ngoName}
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
                        onBlur={formik2.handleBlur}
                        onChange={formik2.handleChange}
                        value={formik2.values.phone}
                        error={formik2.touched.phone && formik2.errors.phone}
                        helperText={formik2.touched.phone && formik2.errors.phone}
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
                        type="number"
                        name="branches"
                        label="No of Branches*"
                        onBlur={formik2.handleBlur}
                        onChange={formik2.handleChange}
                        value={formik2.values.address}
                        error={formik2.touched.address && formik2.errors.address}
                        helperText={formik2.touched.address && formik2.errors.address}
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
                        onBlur={formik2.handleBlur}
                        onChange={formik2.handleChange}
                        value={formik2.values.email}
                        error={formik2.touched.email && formik2.errors.email}
                        helperText={formik2.touched.email && formik2.errors.email}
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
                        onChange={formik2.handleChange}
                        value={formik2.values.password}
                        error={formik2.touched.password && formik2.errors.password}
                        helperText={formik2.touched.password && formik2.errors.password}
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
                        onChange={formik2.handleChange}
                        value={formik2.values.confirmPassword}
                        error={formik2.touched.confirmPassword && formik2.errors.confirmPassword}
                        helperText={formik2.touched.confirmPassword && formik2.errors.confirmPassword}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button
                        size='small'
                        style={{ width: "50%", backgroundColor: "#1e2950" }}
                        type="submit"
                        onClick={formik2.submitForm}
                        variant="contained"
                        fullWidth
                    >
                        Sign Up
                    </Button>
                    </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );

}

export default SignUp;