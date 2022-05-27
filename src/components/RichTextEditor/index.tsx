import React from 'react';
import useRichTextEditor, {
  RichTextProps,
} from '@/components/RichTextEditor/useRichTextEditorService';

const RichText: React.FC<RichTextProps> = (props: RichTextProps) => {
  useRichTextEditor(props);

  return (
    <div
      id={props.id}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.stopPropagation();
        }
      }}
    ></div>
  );
};

export default RichText;
