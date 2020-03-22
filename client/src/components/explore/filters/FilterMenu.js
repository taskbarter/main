import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterItem from './FilterItem';

const FilterMenu = props => {
  const item1 = {
    title: 'Skills',
    options: ['ReactJS', 'Wordpress', 'VueJS', 'NodeJS', 'MongoDB']
  };
  return (
    <div className='filter-bar'>
      <div className='filter-container'>
        <FilterItem item={item1} />
      </div>
    </div>
  );
};

export default FilterMenu;
