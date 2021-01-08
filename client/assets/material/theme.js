import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
	shadows: Array(25).fill('none'),
	palette: {
		primary: {
			main: '#7E7E7E',
		},
		secondary: {
			main: '#FFB6C1',
		},
		textSecondary: {
			main: '#FFFFFF',
		},
	},
	typography: {
		fontFamily: 'Poppins',
		h2: {
			fontSize: '2.00rem', // 32px
		},
		h3: {
			fontSize: '1.75rem', // 28px
		},
		h4: {
			fontSize: '1.50rem', // 24px
		},
		h5: {
			fontSize: '1.25rem', // 20px
		},
		h6: {
			fontSize: '1.00rem', // 16px
		},
		body1: {

		},
		body2: {

		},
	},
	overrides: {
		MuiButton: {
			root: {
				transform: 'none',
				textTransform: 'none',
				color: '#E85513',
			},
			outlined: {
				border: '1px solid #E85513',
				'&:hover': {
					backgroundColor: '#E8551310',
				},
			},
		},
		MuiCardHeader: {
			root: {
				padding: '0.5rem 1rem',
			},
			title: {
				fontWeight: 900,
			},
			subheader: {
				fontWeight: 900,
			},
		},
		MuiSlider: {
			root: {
				color: '#E85513',
			},
			rail: {
				color: '#707070',
			},
			track: {
				height: 3,
			},
		},
	},
	props: {
		MuiButton: {
			disableRipple: true,
			variant: 'contained',
			fullWidth: true,
		},
		MuiCheckbox: {
			disableRipple: true,
		},
		MuiTextField: {
			variant: 'outlined',
			fullWidth: true,
			margin: 'normal',
			InputProps: {
				style: {
					backgroundColor: '#fff',
				},
			},
		},
		MuiTab: {
			disableRipple: true,
		},
		MuiFormControl: {
			variant: 'outlined',
			fullWidth: true,
		},
	},
});

export default theme;
