
import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
    palette: {
        primary: {
            main: '#4272D7',
        },
        secondary: {
            main: '#FF4B5A',
        },
        background: {
            default: "#fff",
        },
    },
    typography: {
        // eslint-disable-next-line quotes
        fontFamily: '"Open Sans", sans-serif',
    },
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "0.875em",
            },
        },
        MuiDialog: {
            paper: {
                borderRadius: 16,
            },
        },
    },
    props: {
        MuiDialog: {
            disableScrollLock: true,
        },
        MuiMenu: {
            disableScrollLock: true,
        },
        MuiSelect: {
            MenuProps: {
                disableScrollLock: true,
            },
        },
    },
});
