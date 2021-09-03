/* eslint-disable */
import React, { PureComponent } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';

class TextEditor extends PureComponent {
  render() {
    const { value, onChange } = this.props;
    const editorConfiguration = {
      toolbar: [
        'heading',
        'bold',
        'italic',
        'bulletedList',
        'numberedList', 
        'undo',
        'redo',
      ]
    };
    return (
      <CKEditor
        editor={ClassicEditor}
        config={ editorConfiguration }
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    );
  }
}

export default TextEditor;