import "../css/Account.css";
import { useUserContext } from "../contexts/UserContext";
import { mainScheme } from "../colors/schemes";
import { IconMail, IconUserHeart, IconCoins, IconPlaylist, IconMusic } from '@tabler/icons-react';
import { Button } from "@mui/material";

export default function Account() {
  const {user} = useUserContext();
  
  return (
    <div className="account-container">

      <div className="personal-info-container">
        <h1 className="personal-info-title">
          Personal Information
        </h1>
        <div className="personal-info-items">
          <div className="personal-info-item">
            <div className="personal-info-item-title">
              <h3>Username</h3>
              <IconUserHeart stroke={2} />
            </div>
            <p>{user?.username}</p>
          </div>
          <div className="personal-info-item">
            <div className="personal-info-item-title">
              <h3>Email</h3>
              <IconMail stroke={2} />
            </div>
            <p>{user?.email}</p>
          </div>
          <div className="personal-info-item">
            <div className="personal-info-item-title">
              <h3>Social Credits</h3>
              <IconCoins stroke={2} />
            </div>
            <p>{user?.socialCredit}</p>
          </div>
          <div className="personal-info-item">
            <div className="personal-info-item-title">
              <h3>Songs</h3>
              <IconMusic stroke={2} />
            </div>
          </div>
          <div className="personal-info-item">
            <div className="personal-info-item-title">
              <h3>Playlists</h3>
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
    </div>
  );
}