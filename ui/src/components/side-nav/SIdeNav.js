// SideNavBar.js
import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { AiOutlineUser, AiOutlineUserSwitch, AiOutlineAlert, AiOutlineHome, AiOutlineNotification, AiFillHome, AiOutlineBarChart, AiFillBackward, AiOutlineFastBackward, AiOutlineStepBackward, AiOutlineDotChart, AiOutlineCalendar, AiOutlineEdit } from 'react-icons/ai'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Link } from "react-router-dom";

const SideNavBar = ({onToggle}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onToggle(newVisibility); // Call the callback function to notify Dashboard
  };

  return (
    <SideNav expanded={isVisible} style={{ background: 'var(--primary-bg)', position: 'fixed' }}>
      <SideNav.Toggle
        onClick={() => {
          handleToggle();
        }}
      />
      <SideNav.Nav defaultSelected="profile">
        <NavItem eventKey="profile">
          <NavIcon>
            <Link to={'/dashboard/profile'}><AiOutlineUser style={{ fontSize: "1.75em" }} /></Link>
          </NavIcon>
          <NavText><Link to={'/dashboard/profile'}>Profile</Link></NavText>
        </NavItem>
        <NavItem eventKey="issues">
          <NavIcon>
            <Link to={'/dashboard/curve'}><AiOutlineDotChart style={{ fontSize: "1.75em" }} /></Link>
          </NavIcon>
          <NavText><Link to={'/dashboard/curve'}>Settings</Link></NavText>
        </NavItem>
        
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideNavBar;
