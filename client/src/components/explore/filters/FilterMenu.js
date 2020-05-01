import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterItem from './FilterItem';
import { Input } from 'reactstrap';

const FilterMenu = (props) => {
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
      { name: 'Redux' },
    ],
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
      { name: 'London, UK' },
    ],
  };

  const item3 = {
    title: 'Industry',
    id: 3,
    options: [
      { name: 'Marketing' },
      { name: 'Graphic Designing' },
      { name: 'Web Programming' },
      { name: 'Content Writing' },
      { name: 'Videography' },
      { name: 'Photo Editing' },
      { name: 'Voiceover Art' },
      { name: 'Sound Editing' },
      { name: 'Computer Programming' },
      { name: 'Virtual Assistant' },
    ],
  };
  return (
    <React.Fragment>
      <div className='filter-bar'>
        <div className='filter-container'>
          <FilterItem item={item1} />
          <FilterItem item={item3} />
          <FilterItem item={item2} />

          <Input disabled='true' type='select' className='sort-dropdown'>
            <option>Newest</option>
            <option>Recommended</option>
            <option>Saved</option>
            <option>Applied</option>
          </Input>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterMenu;
