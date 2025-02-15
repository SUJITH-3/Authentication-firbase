import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import Register from '../Register';
import { isAuthenticated } from './Auth';

function Navbar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="absolute" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {!isAuthenticated() ? (<MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center"> <Link to="/" style={{ textDecoration: "none", color: "black" }} > Register</Link></Typography>
                            </MenuItem>) : null}
                            {!isAuthenticated() ? (<MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center"> <Link to="/Login" style={{ textDecoration: "none", color: "black" }} > Login</Link></Typography>
                            </MenuItem>) : null}
                            {isAuthenticated() ? (<MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center"> <Link to="/Home" style={{ textDecoration: "none", color: "black" }} >Home</Link></Typography>
                            </MenuItem>) : null}
                            {isAuthenticated() ? (<MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center"> <Link to="/Login" style={{ textDecoration: "none", color: "black" }} onClick={props.logOutUserData} > Logout</Link></Typography>
                            </MenuItem>) : null}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {!isAuthenticated() ? (<Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to="/" style={{ textDecoration: "none", color: "white" }} > Register</Link>

                        </Button>) : null}
                        {!isAuthenticated() ? (<Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to="/Login" style={{ textDecoration: "none", color: "white" }} > login</Link>

                        </Button>) : null}
                        {isAuthenticated() ? (<Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to="/Home" style={{ textDecoration: "none", color: "white" }} > Home</Link>

                        </Button>) : null}
                        {isAuthenticated() ? (<Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to="/Login" onClick={props.logOutUserData} style={{ textDecoration: "none", color: "white" }} > Logout</Link>

                        </Button>) : null}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;
