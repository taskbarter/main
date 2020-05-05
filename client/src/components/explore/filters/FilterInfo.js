import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FilterItem from './FilterItem';
import { Input } from 'reactstrap';

const FilterInfo = (props) => {
  if (!props.filter_info) {
    return <React.Fragment></React.Fragment>;
  }
  const search_term = (
    <React.Fragment>
      {' '}
      {props.filter_info.sq !== ''
        ? ` with term: '${props.filter_info.sq}'`
        : ''}
    </React.Fragment>
  );
  if (
    (props.filter_info.cf && props.filter_info.cf.length) ||
    (props.filter_info.sf && props.filter_info.sf.length) ||
    props.filter_info.sq !== ''
  ) {
    return (
      <React.Fragment>
        <div className='mb-3'>
          Searching tasks
          {search_term}{' '}
          {props.filter_info.cf && props.filter_info.cf.length > 0 ? (
            <span>
              {' '}
              in categories:{' '}
              {props.filter_info.cf.map((cat, i) => {
                return <span key={i}>'{cat}', </span>;
              })}
            </span>
          ) : (
            ''
          )}
          {props.filter_info.sf && props.filter_info.sf.length > 0 ? (
            <span>
              {' '}
              with skills:{' '}
              {props.filter_info.sf.map((skl, i) => {
                return <span key={i}>'{skl}', </span>;
              })}
            </span>
          ) : (
            ''
          )}
        </div>
      </React.Fragment>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export default FilterInfo;
