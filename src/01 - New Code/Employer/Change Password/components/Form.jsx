import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { patchUpdatePassword } from '../../../../api/apiAxios';
import CustomizedSnackbar from '../../../Reusable Components/Snackbar/snackbar';
import { useSelector } from 'react-redux';

const Form = () => {

  const { errorMessages } = useSelector((state) => state.login);

  // Snackbar start ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // Snackbar Success

  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState("");

  const handleSuccessCloseSnackbar = () => {
    setSnackbarSuccessOpen(false);
  };

  // Snackbar Error

  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const [snackbarErrorMessage, setSnackbarErrorMessage] = useState("");

  const handleErrorCloseSnackbar = () => {
    setSnackbarErrorOpen(false);
  };

  // Snackbar end ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!(newPassword === confirmPassword)) {
      const onErrorMessage = await errorMessages.changePasswordNotMatch;
      await setSnackbarErrorMessage(onErrorMessage);
      setSnackbarErrorOpen(true);
      return
    }

    try {
      const res = await patchUpdatePassword(newPassword)
      if (res.data.status) {
        const onSuccessMessage = await res?.data?.message;
        await setSnackbarSuccessMessage(onSuccessMessage);
        setSnackbarSuccessOpen(true);
        setNewPassword('');
        setConfirmPassword('');

      } else {
        const onErrorMessage = await res?.data?.message;
        await setSnackbarErrorMessage(onErrorMessage);
        setSnackbarErrorOpen(true);
      }
    } catch (error) {
      console.log(error);
      const onErrorMessage = await error;
      await setSnackbarErrorMessage(onErrorMessage);
      setSnackbarErrorOpen(true);
    }


  }
  return (
    <div className='py-[50px]'>

      <CustomizedSnackbar
        open={snackbarSuccessOpen}
w        autoCloseDuration={4000} // milliseconds
        onClose={handleSuccessCloseSnackbar}
        message={snackbarSuccessMessage}
        severity="success" // or 'success', 'warning', 'info'
        backgroundColor="#344e41" // Custom background color
      />

      <CustomizedSnackbar
        open={snackbarErrorOpen}
        autoCloseDuration={4000} // milliseconds
        onClose={handleErrorCloseSnackbar}
        message={snackbarErrorMessage}
        severity="error" // or 'success', 'warning', 'info'
        backgroundColor="#9d0208" // Custom background color
      />

      <form onSubmit={(e) => onSubmit(e)} className=' flex flex-col gap-3'>
       

        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
          <InputLabel htmlFor="new-password">New Password</InputLabel>
          <OutlinedInput
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            required
            id="new-password"
            type={showPassword1 ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
          <InputLabel htmlFor="Confirm Password">Confirm Password</InputLabel>
          <OutlinedInput
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            id="Confirm Password"
            type={showPassword2 ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>

        <button className=' bg-mainBgColor px-[30px] py-[20px] w-[300px] text-white rounded-xl'>Change Password</button>

      </form>



    </div>



  );
};

export default Form;
