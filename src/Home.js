import React, { useEffect, useState } from 'react'
import { getUserData } from './Api'
import { Box, Container, Skeleton, Typography } from '@mui/material'
import Navbar from './Services/Navbar'
import { logOut } from './Services/Storage'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from './Services/Auth'
import { Navigate } from 'react-router-dom'


function Home() {
    const hello = useNavigate()
    const [Data, setData] = useState({ Name: "", Email: "", LocalId: "" })
    useEffect(() => {
        getUserData()
            .then(res => {
                setData({
                    Name: res.data.users[0].displayName, Email: res.data.users[0].email, LocalId: res.data.users[0].localId
                })
            })
            .catch(res => console.log(res))

    }, [])
    const logOutUserData = () => {
        logOut()
    }
    if (!isAuthenticated()) {
        return <Navigate to="/Login" />
    }
    return (
        <>

            <Box height="100vh" width="100vw" display='flex' justifyContent="center" backgroundColor="#eeeeee">
                < Navbar logOutUserData={logOutUserData} />
                {
                    Data.Name && Data.Email && Data.LocalId ?
                        (<Container maxWidth="xs" sx={{
                            backgroundColor: "#f5f5f5", padding: "30px 20px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            marginTop: "130px", maxHeight: "400px", display: "flex", flexDirection: "column", gap: "20px"
                        }}>
                            <Box>
                                <Typography variant='h1' sx={{ fontSize: "2.5rem" }}>Hello {Data.Name}</Typography>
                            </Box>
                            <Box>
                                <Typography variant='h4' sx={{ fontFamily: "sans-serif", fontSize: "1.5rem", marginTop: "30px" }}>Your Dashboard Details</Typography>
                            </Box>
                            <Box>
                                <Typography>Name : {Data.Name}</Typography>
                                <Typography>Email : {Data.Email}</Typography>
                                <Typography>LocalId : {Data.LocalId}</Typography>
                            </Box>

                        </Container>) : (<Box marginTop="130px">
                            <Skeleton variant="text" width={400} height={70} />
                            <Skeleton variant="text" width={400} height={70} />
                            <Skeleton variant="text" width={400} height={70} />
                            <Skeleton variant="text" width={400} height={70} />
                        </Box>)
                }
            </Box >
        </>

    )

}

export default Home