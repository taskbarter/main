import React from 'react';

import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const DescriptionEditor = (props) => {
  const theme = 'snow';
  const modules = {
    toolbar: [
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
  };
  const formats = [
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
  ];
  const placeholder = !props.placeholder
    ? 'Write your requirements in detail...'
    : props.placeholder;
  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  React.useEffect(() => {
    if (quill) {
      props.onAssignQuillObj(quill);
    }
  }, [quill]);

  if (quill) {
    // quill.on('text-change', function(delta, oldDelta, source) {
    //   props.handleChange(quill.root.innerHTML, '');
    // });
  }

  //if (quill) console.log(quill.getText());
  //console.log(quillRef);
  return (
    <div className='form-control description-editor'>
      <div ref={quillRef} />
    </div>
  );
};

export default DescriptionEditor;
