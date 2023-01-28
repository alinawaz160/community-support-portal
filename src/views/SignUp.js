import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Card, CardContent, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from "@mui/material/styles";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

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
class SignUp extends React.Component {

    // const [state, setState] = useState({ username: '', password: '' })
    constructor() {
        super();
        this.state = {
            formChange: "volunteer",
            username: "",
            password: "",
        }
    }
    render() {
        const { classes } = useStyles;
        return (
            <div className='p-4 h-[100vh] w-[100%] flex flex-col justify-center items-center'
            >
                <Card className='card w-[80%] text-center md:w-[30%]'>
                    <CardContent>
                        <div>
                            <p className='para font-bold'>Sign Up</p>
                        </div>
                        <Formik className="mx-auto sm:mx-0 sm:my-0"
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                // handle form submission here
                            }}
                        >
                            {
                                ({ isSubmitting, handleChange, values }) => (
                                    <Form>
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
                                            name="name"
                                            placeholder="FullName / NGO_Name*"
                                            onChange={handleChange}
                                            value={values.name}
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
                                            type="text"
                                            name="phone"
                                            placeholder="Phone*"
                                            onChange={handleChange}
                                            value={values.phone}
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
                                            placeholder="Address*"
                                            onChange={handleChange}
                                            value={values.address}
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
                                            placeholder="Email*"
                                            onChange={handleChange}
                                            value={values.email}
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
                                            }}
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
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size='small'
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password*"
                                            onChange={handleChange}
                                            value={values.confirmPassword}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                        <Button
                                            size='small'
                                            style={{ width: "50%" ,backgroundColor:"#1e2950"}}
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting}
                                            fullWidth
                                        >
                                            Sign Up
                                        </Button>
                                    </Form>

                                )
                            }
                        </Formik>
                    </CardContent>
                </Card>
            </div>
        );

    }
}
export default SignUp;