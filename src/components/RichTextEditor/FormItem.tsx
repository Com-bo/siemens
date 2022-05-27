import { Form } from 'antd';
import styled from 'styled-components';
import React, { useContext } from 'react';
import RichText from '@/components/RichTextEditor';
import { FormatLanguageService } from '@/tools/formatLanguage';
import JumpSVG from '@/assets/images/jump.svg';
import { FormItemProps } from '@ant-design/pro-form';
import sanitizeHtml from 'sanitize-html';
const WebPagePreview = styled.div`
  padding-top: 4px;
`;

const WebPageContentLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  img {
    margin: 1px;
    height: 100%;
    padding: 2px;
  }
`;

const RichTextFromItem = styled(Form.Item)`
  .ant-form-item-control {
    width: calc(100% - 160px);
  }
  .ant-form-item-control-input-content {
    z-index: 0;
  }
`;

interface IProps extends FormItemProps {
  formItemStatus: string;
  form: any;
  setMenus?: {
    show: boolean;
    items: Array<string>;
  };
  customUploadImgFun?: Function;
  previewRichText?: Function;
}

const RTEditorFormItem = (props: IProps) => {
  const { formatMessage } = useContext(FormatLanguageService);

  return (
    <RichTextFromItem
      label={
        <WebPageContentLabel>
          {props.label}
          <img
            src={JumpSVG}
            onClick={() => {
              props.previewRichText && props.previewRichText();
            }}
          ></img>
        </WebPageContentLabel>
      }
      valuePropName="content"
      rules={[
        {
          required: true,
          message: formatMessage('INPUT_PLACEHOLER'),
        },
      ]}
      {...props}
    >
      {props.formItemStatus === 'Preview' ? (
        <WebPagePreview
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(props.form.getFieldValue('WebPageContent')),
          }}
        ></WebPagePreview>
      ) : (
        <RichText
          id={'content'}
          setMenus={props.setMenus}
          customUploadImgFun={props.customUploadImgFun}
        />
      )}
    </RichTextFromItem>
  );
};
export default RTEditorFormItem;
