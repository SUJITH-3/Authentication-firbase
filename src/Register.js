import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FormHelperText, Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import background from "./Assests/background.jpg"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import { registerData } from './Api';
import Storage from './Services/Storage';
import { isAuthenticated } from './Services/Auth';
import Navbar from './Services/Navbar';
import { Navigate } from 'react-router-dom';

function Register() {
    const [Inputs, setInputs] = useState({ Name: "", Email: "", Password: "" })
    const [Display, setDisplay] = useState({ Name: false, Email: false, Password: false })
    const [loader, setLoader] = useState(false)
    const [serverError, setServerError] = useState({ emailError: false, passwordError: false })

    const handleInput = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }))

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Inputs.Name === "") {
            setDisplay((prev) => ({ ...prev, Name: true }))
        }
        if (Inputs.Email === "") {
            setDisplay((prev) => ({ ...prev, Email: true }))
        }
        if (Inputs.Password === "") {
            setDisplay((prev) => ({ ...prev, Password: true }))
        }
        if (Inputs.Name) {
            setDisplay((prev) => ({ ...prev, Name: false }))
        }
        if (Inputs.Email) {
            setDisplay((prev) => ({ ...prev, Email: false }))
        }
        if (Inputs.Password) {
            setDisplay((prev) => ({ ...prev, Password: false }))
        }
        if (Inputs.Name && Inputs.Email && Inputs.Password) {
            setLoader(true)
            registerData(Inputs).then((res) => {
                Storage(res.data.idToken)
                setInputs({ Name: "", Email: "", Password: "" })

            }).catch(res => {
                if (res.response.data.error.message === "WEAK_PASSWORD : Password should be at least 6 characters") {
                    setServerError((prev) => ({ ...prev, passwordError: true }))
                }
                if (res.response.data.error.message === "EMAIL_EXISTS") {
                    setServerError((prev) => ({ ...prev, emailError: true }))
                }
                console.log(res)
            }).finally(() => { setLoader(false) })

        }

        setServerError({ emailError: false, passwordError: false })

    }

    if (isAuthenticated()) {
        return <Navigate to="/Home" />
    }


    return (
        <>

            <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
                <Navbar />
                <h1 style={{ position: "absolute", top: "100px" }}>Register</h1>
                <form onSubmit={handleSubmit} style={{ width: "330px", height: "350px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backdropFilter: "blur(20px)", gap: "10px" }}>

                    <Box>
                        <Box sx={{ display: 'flex', alignItems: "flex-end" }} mb={2}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="Name" label="Name" onChange={handleInput} variant="standard" value={Inputs.Name} />
                        </Box>
                        {Display.Name && <FormHelperText id="component-error-text" sx={{ marginLeft: "30px", marginTop: "-15px", color: "red" }}>*Please fill the name field</FormHelperText>}
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} mb={2}>
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField type='email' id="Email" label="Email" onChange={handleInput} variant="standard" value={Inputs.Email} />
                        </Box>
                        {Display.Email && <FormHelperText id="component-error-text" sx={{ marginLeft: "30px", marginTop: "-15px", color: "red" }}>*Please fill the email field</FormHelperText>}
                        {serverError.emailError && <FormHelperText id="component-error-text" sx={{ marginLeft: "30px", marginTop: "-10px", color: "red" }}>*Email Exists</FormHelperText>}
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} mb={2}>
                            <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="Password" label="Password" onChange={handleInput} variant="standard" type="password" value={Inputs.Password} />
                        </Box>
                        {Display.Password && <FormHelperText id="component-error-text" sx={{ marginLeft: "30px", marginTop: "-15px", color: "red" }}>*Please fill the password field</FormHelperText>}
                        {serverError.passwordError && <FormHelperText id="component-error-text" sx={{ marginLeft: "30px", marginTop: "-10px", color: "red" }}>*Password length should be atleast 6</FormHelperText>}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "0px", width: "100%", height: "70px", position: "relative" }}>
                        {loader && <LoadingButton loading loadingPosition="center" startIcon={<SaveIcon />} sx={{}} />}
                        <Button variant="contained" color="info" type="submit" sx={{ padding: "5px,10px", position: "absolute", bottom: "0" }}>Submit</Button>
                    </Box>
                    <Typography sx={{ fontSize: "12px", marginTop: "10px" }}>Already have account?<Link to="/Login">Please login</Link></Typography>
                </form>
            </Box>
        </>


    )
}

export default Register