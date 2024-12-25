import React, { useState } from 'react';
import './ToggleSwitch.scss'; // Optional: for styling

const ToggleSwitch = ({ isChecked = false, toggleSwitch = () => {} }) => {
  const isLightMode = isChecked;

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        id="toggleSwitch"
        checked={!isChecked}
        onChange={toggleSwitch}
      />
      <label className="toggle-switch-label" htmlFor="toggleSwitch">
        <span className={`toggle-switch-inner ${isLightMode ? 'light-mode' : ''}`} />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
