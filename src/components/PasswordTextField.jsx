import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	IconButton,
	InputLabel,
	FormControl,
	OutlinedInput,
	InputAdornment
} from "@mui/material";

export default function PasswordTextField ({label, value, onChange}) {
	const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

	return (
		<FormControl sx={{width: '50%' }} variant="outlined">
			<InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
			<OutlinedInput value={value} onChange={onChange}
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label={
							showPassword ? 'hide the password' : 'display the password'
							}
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							onMouseUp={handleMouseUpPassword}
							edge="end"
						>
						{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label={label}
			/>
		</FormControl>
	);
}