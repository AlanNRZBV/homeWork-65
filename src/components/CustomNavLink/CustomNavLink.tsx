import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ICustomNavLink } from '../../types';

const CustomNavLink: FC<ICustomNavLink> = ({ link }) => {
  const innerCapitalized = link.toUpperCase();
  return (
    <NavLink className="nav-link" to={`pages/${link}`}>
      {innerCapitalized}
    </NavLink>
  );
};

export default CustomNavLink;
