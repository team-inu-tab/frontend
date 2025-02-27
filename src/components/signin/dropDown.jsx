import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('직업');

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (option) => {
    if (option) {
      setSelectedOption(option);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleButtonClick}
        style={{ width: 240, textAlign: 'left', fontSize: 12 }}
      >
        {selectedOption}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose(null)}
      >
        <MenuItem onClick={() => handleMenuClose('학생')}>
          학생
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose('직장인')}>
          직장인
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;