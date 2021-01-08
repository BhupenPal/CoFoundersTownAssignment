import { InputAdornment, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

function SearchBox() {
	const history = useHistory();

	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(`/tag?search=${searchValue}`);
	};

	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit} style={{ position: 'relative' }}>
			<TextField
				value={searchValue}
				onChange={handleChange}
				InputProps={{
					endAdornment: (
						<InputAdornment
							position="start"
							onClick={handleSubmit}
							style={{ cursor: 'pointer' }}
						>
							<SearchIcon />
						</InputAdornment>
					),
				}}
				placeholder="Search Title or Tags"
			/>
		</form>
	);
}

export default SearchBox;
