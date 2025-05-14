import "../css/NavBar.css";

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Box, Modal, Typography } from "@mui/material";
import { IconDeviceSpeaker, IconLogout2 } from '@tabler/icons-react';

import { mainScheme } from "../colors/schemes";
import { logoutUser } from "../api/user-api";

const pages = ['Home', 'Playlists', 'Account'];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: mainScheme.black,
  border: '2px solid '+mainScheme.white,
  boxShadow: 24,
  p: 4,
};

function NavBar() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function handleLogoutUser() {
    const res = await logoutUser();

    if(res) window.location.href = '/login';
  }

  return (
    <nav className="nav-bar">
      <ul>
        <Link to="/home">
          <IconDeviceSpeaker className="nav-bar-logo" color={mainScheme.blue} stroke={2} size={34}/>
        </Link>
        {pages.map((page, i) => <Link key={i} to={`/${page.toLowerCase()}`}>
          <li className="nav-bar-li">{page}</li>
        </Link>)}
      </ul>
      <Button variant="contained"
        color="error"
        sx={{margin: "0 10px 20px 10px"}}
        startIcon={<IconLogout2 stroke={2} />}
        onClick={()=>setModalIsOpen(true)}>
        Logout
      </Button>
      <Modal
        open={modalIsOpen}
        onClose={()=>setModalIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color={mainScheme.white}>
            Do You really want to logout?
          </Typography>
          <div className="modal-yes-cancel-btns">
            <Button variant="contained" onClick={handleLogoutUser} sx={{color: mainScheme.white, bgcolor: mainScheme.blue}}>YES</Button>
            <Button variant="contained" color="error" onClick={()=>setModalIsOpen(false)}>CANCEL</Button>
          </div>
        </Box>
      </Modal>
    </nav>
  );
}

export default NavBar;
