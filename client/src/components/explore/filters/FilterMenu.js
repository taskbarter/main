import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterItem from './FilterItem';
import { Input } from 'reactstrap';

const FilterMenu = props => {
  const item1 = {
    title: 'Skills',
    id: 1,
    options: [
      { name: 'ReactJS' },
      { name: 'Wordpress' },
      { name: 'VueJS' },
      { name: 'NodeJS' },
      { name: 'MongoDB' },
      { name: 'Firebase' },
      { name: 'Angular' },
      { name: 'Redux' }
    ]
  };

  const item2 = {
    title: 'Location',
    id: 2,
    options: [
      { name: 'Lahore, Pakistan' },
      { name: 'New York, US' },
      { name: 'Mumbai, India' },
      { name: 'Karachi, Pakistan' },
      { name: 'Rome, Italy' },
      { name: 'Paris, France' },
      { name: 'Washington DC, US' },
      { name: 'London, UK' }
    ]
  };
  return (
    <React.Fragment>
      <div className='filter-bar'>
        <div className='filter-container'>
          <FilterItem item={item1} />
          <FilterItem item={item2} />

          <Input type='select' className='sort-dropdown'>
            <option>Recommended</option>
            <option>Newest</option>
            <option>Saved</option>
            <option>Applied</option>
          </Input>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterMenu;
