import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
    message?: string;
}

export default function Loader({ message = 'Loading...' }: Props) {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display="flex" justifyContent="center" alignItems="center" height='100vh'>
                <CircularProgress size={100} color="secondary"></CircularProgress>
                <Typography variant="h5" sx={{ justifyContent: 'center', position: 'fixed', top: '60%' }}>{message}</Typography>
            </Box>
        </Backdrop>
    )
}