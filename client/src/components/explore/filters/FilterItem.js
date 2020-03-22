import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const FilterItem = props => {
  return (
    <React.Fragment>
      <a
        className='filter-item'
        role='button'
        id='dropdown04'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <div className='filter-title'>
          <div className='title-container'>
            <div className='title-item'>
              {' '}
              <span>{props.item.title}</span>{' '}
              <span>
                <i className='fas fa-caret-down' />
              </span>
            </div>
          </div>
        </div>
      </a>

      <div
        aria-labelledby='dropdown04'
        className='dropdown-menu dropdown-menu-right tooltip popover popover--open vue-popover-theme open'
        style={{
          visibility: 'visible',
          position: 'absolute',
          willChange: 'transform',
          top: '0px',
          left: '0px',
          transform: 'translate3d(144px, 105px, 0px)'
        }}
      >
        <div className='wrapper'>
          <div className='popover-inner' style={{ position: 'relative' }}>
            <div>
              <div>
                <div className='popover-menu control-bar__menu popover-menu__filter'>
                  <div data-v-68624b48='' className='filter-dropdown'>
                    <div
                      data-v-68624b48=''
                      className='filter-dropdown__options'
                    >
                      {' '}
                      <label data-v-68624b48='' className='checkbox__label'>
                        Backend
                        <input
                          data-v-68624b48=''
                          type='checkbox'
                          name='filter-dropdown-experience'
                          value='d98c139f-5a36-4848-9230-02777a668e33'
                        />{' '}
                        <span data-v-68624b48='' className='checkmark'></span>
                      </label>
                    </div>{' '}
                    <hr data-v-68624b48='' className='filter__hr' />{' '}
                    <div data-v-68624b48='' className='filter-dropdown__footer'>
                      <span
                        data-v-68624b48=''
                        className='filter-dropdown__button filter-dropdown__button--destructive'
                      >
                        Clear filter
                      </span>{' '}
                      <span
                        data-v-68624b48=''
                        className='filter-dropdown__button'
                      >
                        Apply
                      </span>
                    </div>
                  </div>
                </div>
              </div>{' '}
              <div data-v-b329ee4c='' tabindex='-1' className='resize-observer'>
                <object
                  aria-hidden='true'
                  tabindex='-1'
                  type='text/html'
                  data='about:blank'
                ></object>
              </div>
            </div>{' '}
            <div
              className='tooltip-arrow popover-arrow'
              style={{ left: '46px' }}
            ></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterItem;
