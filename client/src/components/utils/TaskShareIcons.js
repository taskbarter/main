import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const TaskShareIcons = (props) => {
  const category_text = props.task_category
    ? props.task_category.replace('/', '').replace(' ', '').replace('&', '')
    : '';
  const share_title = `${props.from} wants someone to ${props.task_headline} on Taskbarter. Barter now by applying on the task page at Taskbarter.com`;
  const hashtags = [
    `${category_text}`,
    'Taskbarter',
    'ExchangeTasks',
    'DoWhatYouLove',
  ];
  return (
    <React.Fragment>
      <div className='text-center mb-3'>Share on</div>
      <div>
        <TwitterShareButton
          url={props.task_url}
          hashtags={hashtags}
          title={share_title}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <FacebookShareButton
          url={props.task_url}
          hashtag={`#${hashtags[1]} `}
          quote={share_title}
          className='ml-2'
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton
          url={props.task_url}
          source='Taskbarter.com'
          title={props.task_headline}
          summary={share_title}
          className='ml-2'
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <WhatsappShareButton
          url={props.task_url}
          separator=' Apply Now: '
          title={share_title}
          className='ml-2'
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={props.task_url}
          subject={'Need Someone to ' + props.task_headline}
          body={`${share_title}`}
          separator=' Apply Now: '
          className='ml-2'
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </div>
    </React.Fragment>
  );
};

export default TaskShareIcons;
