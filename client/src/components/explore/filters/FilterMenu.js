import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterItem from './FilterItem';
import { Input } from 'reactstrap';
import skills from '../../../config/skills';
import categories from '../../../config/categories';

const FilterMenu = (props) => {
  const item1 = {
    title: 'Skills',
    id: 1,
    options: skills,
  };

  const item3 = {
    title: 'Category',
    id: 3,
    options: categories,
  };

  return (
    <React.Fragment>
      <div className='filter-bar'>
        <div className='filter-container'>
          <FilterItem
            onItemSelect={props.onSkillsFilter}
            arr={props.skills_filter}
            item={item1}
            onClear={props.onSkillsFilterClear}
            onApply={props.onSkillsFilterApply}
          />
          <FilterItem
            onItemSelect={props.onCategoryFilter}
            arr={props.category_filter}
            item={item3}
            onClear={props.onCategoryFilterClear}
            onApply={props.onCategoryFilterApply}
          />

          <Input disabled={true} type='select' className='sort-dropdown'>
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
