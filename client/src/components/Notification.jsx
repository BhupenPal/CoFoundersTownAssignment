// DEPENDENCIES
import React from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../redux/actions/snackbarActions';

function Notification() {
	const dispatch = useDispatch();

	const {
		open, severity, message, action,
	} = useSelector(
		(state) => state.snackBar,
	);

	const handleClose = () => {
		dispatch(closeSnackbar());
	};

	const renderAction = () => {
		if (action) {
			return (
				<Button onClick={action.task} size="small">
					{action.message}
				</Button>
			);
		}
		return null;
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<Alert
				onClose={handleClose}
				action={renderAction()}
				severity={severity || 'success'}
			>
				{message}
			</Alert>
		</Snackbar>
	);
}

export default Notification;
