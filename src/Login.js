import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FormHelperText, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import background from "./Assests/background.jpg"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import Storage from './Services/Storage';
import { isAuthenticated } from './Services/Auth';
import { loginData } from './Api';
import Navbar from './Services/Navbar';
import { Navigate } from 'react-router-dom';

const Login = () => {
    let [Inputs, setInputs] = useState({ Email: "", Password: "" })
    let [Display, setDisplay] = useState({ Email: false, Password: false })
    const [loader, setLoader] = useState(false)
    const [serverError, setServerError] = useState(false)
    const handleInput = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Inputs.Email === "") {
            setDisplay((prev) => ({ ...prev, Email: true }))
        }
        if (Inputs.Password === "") {
            setDisplay((prev) => ({ ...prev, Password: true }))
        }
        if (Inputs.Email) {
            setDisplay((prev) => ({ ...prev, Email: false }))
        }
        if (Inputs.Password) {
            setDisplay((prev) => ({ ...prev, Password: false }))
        }
        if (Inputs.Email && Inputs.Password) {
            setLoader(true)
            console.log(Inputs)
            loginData(Inputs)
                .then(res => {
                    Storage(res.data.idToken)
                    setInputs({ Email: "", Password: "" })
                })
                .catch(res => {
                    if (res.code === "ERR_BAD_REQUEST") {
                        setServerError(true)
                    }
                })
                .finally(() => { setLoader(false) })

            setServerError(false)
            setDisplay({ Email: false, Password: false })
        }

    }
    if (isAuthenticated()) {
        return <Navigate to="/Home" />
    }
    return (
        <>

            <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
                <Navbar />
                <h1 style={{ position: "absolute", top: "100px" }}>Login</h1>
                <form onSubmit={handleSubmit} style={{ width: "330px", height: "350px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backdropFilter: "blur(20px)", gap: "10px" }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} mb={2}>
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField type='email' id="Email" label="Email" onChange={handleInput} variant="standard" value={Inputs.Email} />
                        </Box>
                        {Display.Email && <FormHelperText id="component-error-text" sx={{ marginLeft: "30px", marginTop: "-15px", color: "red" }}>*Please fill the email field</FormHelperText>}
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} mb={2}>
                            <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="Password" label="Password" onChange={handleInput} variant="standard" type="password" value={Inputs.Password} />
                        </Box>
                        {Display.Password && <FormHelperText id="component-error-text" sx={{ marginLeft: "30px", marginTop: "-15px", color: "red" }}>*Please fill the password field</FormHelperText>}
                        {serverError && <FormHelperText id="component-error-text" sx={{ marginLeft: "30px", marginTop: "10px", color: "red" }}>Invalid login credentials</FormHelperText>}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "0px", width: "100%", height: "70px", position: "relative" }}>
                        {loader && <LoadingButton loading loadingPosition="center" startIcon={<SaveIcon />} sx={{}} />}
                        <Button variant="contained" color="info" type="submit" sx={{ padding: "5px,10px", position: "absolute", bottom: "0" }}>Submit</Button>
                    </Box>
                    <Typography sx={{ fontSize: "12px", marginTop: "10px" }}>Create new Account? <Link to="/">Please Register</Link></Typography>
                </form>
            </Box>
        </>
    )
}

export default Login