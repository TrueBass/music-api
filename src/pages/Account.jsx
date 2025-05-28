import "../css/Account.css";
import { useUserContext } from "../contexts/UserContext";
import { IconMail, IconUserHeart, IconCoins, IconPlaylist, IconMusic } from '@tabler/icons-react';
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { validateEmail, validateUsername } from "../validators/validations";
import { updateEmail, updateUsername, updatePassword } from "../api/user-api";
import PopUpMessage from "../components/PopUpMessage";

export default function Account() {
  const {user, updateUser} = useUserContext();

  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
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
      const updateRes = await updateUser();
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

  
  
  return (
    globalError.length > 0?
    <div className="account-errors-contaier">{globalError}</div>:
    <div className="account-container">
      <div className="personal-info-container">
        <h1 className="personal-info-title">
          Personal Information
        </h1>
        <div className="personal-info-items">
          <div className="personal-info-item">
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
          <div className="personal-info-item">
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