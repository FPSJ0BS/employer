import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function CustomizedSnackbar({ open, autoCloseDuration, onClose, message, severity, backgroundColor }) {
    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
            className=' mt-[50px]'
                open={open}
                autoHideDuration={autoCloseDuration}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Alert onClose={onClose} severity={severity} sx={{color:'#fff', backgroundColor: backgroundColor }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
