import React from 'react';
import MetaTags from 'react-meta-tags';
import Taskbarter_DP from '../../style/inc/Tasbarter_DP.jpg';

const TaskMetaTags = (props) => {
  var div = document.createElement('div');
  div.className = 'd-none';
  div.innerHTML = props.task.description;
  var text = div.textContent || div.innerText || '';
  return (
    <React.Fragment>
      <MetaTags>
        <title>{props.task.headline} | Taskbarter</title>
        <meta
          name='description'
          content={`${props.from} posted a task in ${props.task.category} category. ${text}`}
        />

        <meta
          property='og:title'
          content={`${props.task.headline} | Taskbarter`}
        />

        <meta property='og:image' content={Taskbarter_DP} />
      </MetaTags>
    </React.Fragment>
  );
};

export default TaskMetaTags;
