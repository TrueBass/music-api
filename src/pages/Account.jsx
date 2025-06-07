import "../css/Account.css";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Button, TextField } from "@mui/material";
import { IconMail, IconUserHeart, IconCoins, IconPlaylist, IconMusic } from '@tabler/icons-react';
import { validateEmail, validateUsername, validatePassword } from "../validators/validations";
import PasswordTextField from "../components/PasswordTextField";
import { updateEmail, updateUsername, updatePassword } from "../api/user-api";
import PopUpMessage from "../components/PopUpMessage";

export default function Account() {
  const {user, updateUser} = useUserContext();

  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [changePasswdModalIsOpen, setChangePasswdModalIsOpen] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdateEmail = async () => {
    setLoading(true);

    const trimmedEmail = email.trim();
    const newErrors = {};
    setErrors({});

    if(trimmedEmail.length === 0) {
      newErrors.email = "Email field can't be empty.";
    }
    else if(!validateEmail(trimmedEmail)) {
      newErrors.email = "Please enter a valid email. eg. example@email.eg";
    }

    if(Object.keys(newErrors).length !== 0){
      setErrors(newErrors);
      return;
    }

    const res = await updateEmail(trimmedEmail);
    if(res) {
      const updateRes = await updateUser();
      console.log(updateRes);
      if(!updateRes) {
        setGlobalError(
          "Something went wrong when retrieving user.\nTry to reload and retry if necesarry."
        );
        return;
      }
    }
    setSuccessMessage("Email changed successfully!");
    setLoading(false);
    setIsSuccessMsgVisible(true);
  };

  const handleUpdateUsername = async () => {
    setLoading(true);

    const trimmedUsername = username.trim();
    const newErrors = {};
    setErrors({});

    if(trimmedUsername.length === 0) {
      newErrors.username = "Username field can't be empty.";
    }
    else if(!validateUsername(trimmedUsername)) {
      newErrors.username = "Username can contain only letters, digits and underscores.";
    }

    if(Object.keys(newErrors).length !== 0){
      setErrors(newErrors);
      return;
    }

    const res = await updateUsername(trimmedUsername);
    if(res) {
      const updateRes = await updateUser(trimmedUsername);
      console.log(updateRes);
      if(!updateRes) {
        setGlobalError(
          "Something went wrong when retrieving user.\nTry to reload and retry if necesarry."
        );
        return;
      }
    }
    setSuccessMessage("Username changed successfully!");
    setLoading(false);
    setIsSuccessMsgVisible(true);
  };

  const handleUpdatePassword = async () => {
    setErrors({});
    const trimmedOldPasswd = oldPassword.trim();
    const trimmedNewPasswd = newPassword.trim();
    const trimmedRepeatPasswd = repeatNewPassword.trim();
    if (!(trimmedNewPasswd && trimmedOldPasswd && trimmedRepeatPasswd)) {
      setErrors({password: "Please, fill all fields."});
      return;
    }
    
    const res = await updatePassword({
      oldPassword: trimmedOldPasswd,
      newPassword: trimmedNewPasswd,
      confirmPassword: trimmedRepeatPasswd
    });

    if (res) {
      setErrors({password: res});
      return;
    }

    setChangePasswdModalIsOpen(false);
  }
  
  return (
    globalError.length > 0?
    <div className="account-errors-contaier">{globalError}</div>:
    <div className="account-container">
      <div className="personal-info-container">
        <h1 className="personal-info-title">
          Personal Information
        </h1>
        <div className="personal-info-items">

          <div className="personal-info-user-creds">
            <div className="personal-info-username">
              <div className="personal-info-item-title">
                <h2>Username</h2>
                <IconUserHeart stroke={2} />
              </div>
              <div className="personal-info-item-edit-row">
                <TextField fullWidth value={username} onChange={e=>setUsername(e.target.value)} />
                <Button variant="contained" sx={{marginLeft: "10px"}}
                  disabled={user?.username == username}
                  loading={loading && user?.username !== username}
                  onClick={handleUpdateUsername}>Edit</Button>
              </div>
            </div>
            <div className="personal-info-email">
              <div className="personal-info-item-title">
                <h2>Email</h2>
                <IconMail stroke={2} />
              </div>
              <div className="personal-info-item-edit-row">
                <TextField fullWidth value={email} onChange={e=>setEmail(e.target.value)}/>
                <Button variant="contained" sx={{marginLeft: "10px"}}
                  disabled={user?.email == email}
                  loading={loading && user?.email !== email}
                  onClick={handleUpdateEmail}>Edit</Button>
              </div>
            </div>
            <div className="personal-info-password">
              <div className="personal-info-item-title">
                <Button variant="contained" style={{display: (!changePasswdModalIsOpen)?"flex": "none"}}
                onClick={()=>setChangePasswdModalIsOpen(true)}>
                  Change Password</Button>
              </div>
              <div className="personal-info-change-passwd-modal" style={{display: changePasswdModalIsOpen?"flex": "none"}}>
                <div className="personal-info-item-edit-row personal-info-password-modal-edit-row">
                  <PasswordTextField value={oldPassword} onChange={e=>setOldPassword(e.target.value)} label="Old password"/>
                </div>
                <div className="personal-info-item-edit-row personal-info-password-modal-edit-row">
                  <PasswordTextField value={newPassword} onChange={e=>setNewPassword(e.target.value)} label="New password"/>
                </div>
                <div className="personal-info-item-edit-row personal-info-password-modal-edit-row">
                  <PasswordTextField value={repeatNewPassword} onChange={e=>setRepeatNewPassword(e.target.value)} label="Repeat new password"/>
                </div>
                {Object.keys(errors).length &&
                <div className="personal-info-item-edit-row personal-info-password-modal-edit-row">
                  <p style={{ textAlign: "center", color: "#d32f2f", width: "50%"}}>{errors.password}</p>
                </div>}
                <div style={{width: "50%", display: "flex"}}>
                  <Button variant="contained" fullWidth sx={{marginRight: "10px"}}
                  onClick={handleUpdatePassword}>Change</Button>
                  <Button variant="contained" fullWidth color="error"
                  onClick={()=>setChangePasswdModalIsOpen(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          </div>

         
          <div className="personal-info-user-creds">
            <div className="personal-info-item">
              <div className="personal-info-item-title">
                <h2>Social Credits</h2>
                <IconCoins stroke={2} />
              </div>
              <p>{user?.socialCredit}</p>
            </div>
            
            <div className="personal-info-item">
              <div className="personal-info-item-title">
                <h2>Songs</h2>
                <IconMusic stroke={2} />
              </div>
            </div>
            <div className="personal-info-item">
              <div className="personal-info-item-title">
                <h2>Playlists</h2>
                <IconPlaylist stroke={2} />
              </div>
            </div>
          </div>
        
        </div>
      </div>

      <div className="account-danger-zone-container">
        <Button className="account-danger-zone-item gi-delete-account"
          variant="outlined" color="error" sx={{borderWidth: 2}} fullWidth>
          Delete account
        </Button>
      </div>
      <PopUpMessage isVisible={isSuccessMsgVisible} onClose={()=>setIsSuccessMsgVisible(false)} message={successMessage}/>
    </div>
  );
}