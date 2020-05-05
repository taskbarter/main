import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

const FilterItem = (props) => {
  const getItemList = () => {
    return props.item.options.map((opt, i) => (
      <label className='checkbox__label' key={i}>
        {opt.name}
        <input
          data-v-68624b48=''
          type='checkbox'
          name='filter-dropdown-experience'
          value={opt.name}
          onChange={props.onItemSelect}
          checked={props.arr && props.arr.includes(opt.name)}
        />{' '}
        <span className='checkmark'></span>
      </label>
    ));
  };

  const itemHtml = <React.Fragment>{getItemList()}</React.Fragment>;
  return (
    <React.Fragment>
      <a
        className='filter-item'
        role='button'
        id={'PopoverFilter_' + props.item.id}
      >
        <div className='filter-title'>
          <div className='title-container'>
            <div className='title-item'>
              {' '}
              <span className='filter-title-text'>{props.item.title}</span>{' '}
              <span>
                <i className='fas fa-caret-down' />
              </span>
            </div>
          </div>
        </div>
      </a>

      <UncontrolledPopover
        trigger='legacy'
        placement='bottom'
        target={'PopoverFilter_' + props.item.id}
        className='popover-dropdown'
        style={{ minWidth: '220px' }}
      >
        <PopoverBody>
          <div className='filter-dropdown-container'>
            <div
              data-v-68624b48=''
              className='filter-dropdown__options filter-list'
            >
              {' '}
              {itemHtml}
            </div>{' '}
            <hr style={{ marginBottom: '5px' }} />
            <div className='dropdown-footer'>
              <button
                onClick={props.onClear}
                className='filter-dropdown__button filter-dropdown__button--destructive'
              >
                Clear filter
              </button>
              <button
                onClick={props.onApply}
                className='filter-dropdown__button filter-dropdown__button--apply'
              >
                Apply
              </button>
            </div>
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    </React.Fragment>
  );
};

export default FilterItem;
