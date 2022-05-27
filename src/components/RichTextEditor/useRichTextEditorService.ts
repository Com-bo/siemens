import { useEffect, useContext, useRef } from 'react';
import E from 'wangeditor';
import i18next from 'i18next';
import Validator from '@/tools/validator';
import { getLocale } from 'umi';
import deDE from './locales/de-DE';
import frFR from './locales/fr-FR';
import ruRU from './locales/ru-RU';
import ptPT from './locales/pt-PT';
import esES from './locales/es-ES';
export interface RichTextProps {
  id: string;
  value?: any;
  onChange?: (value) => void;
  setMenus?: {
    show: boolean; // 设置items为显示的菜单icon还是剪除的菜单icon
    items: Array<string>;
  };
  customUploadImgFun?: Function;
}
export default function useRichTextEditorService(props: RichTextProps) {
  const editor = useRef<E>();
  useEffect(() => {
    editor.current = new E(`#${props.id}`);
    editor.current.config.onchange = props.onChange;

    // 选择语言
    editor.current.config.lang = getLocale() === 'en-US' ? 'en' : getLocale();

    // 自定义语言
    editor.current.config.languages['de-DE'] = deDE;
    editor.current.config.languages['fr_FR'] = frFR;
    editor.current.config.languages['ru_RU'] = ruRU;
    editor.current.config.languages['pt-PT'] = ptPT;
    editor.current.config.languages['de-DE'] = deDE;
    editor.current.config.languages['es-ES'] = esES;

    // 引入 i18next 插件
    editor.current.i18next = i18next;

    // 配置菜单栏
    props?.setMenus?.show
      ? (editor.current.config.menus = props?.setMenus?.items)
      : (editor.current.config.excludeMenus = props?.setMenus?.items);

    // 配置全屏功能按钮是否展示
    editor.current.config.showFullScreen = false;

    editor.current.config.customUploadImg = async function (
      resultFiles,
      insertImgFn,
    ) {
      props.customUploadImgFun &&
        (await props.customUploadImgFun(resultFiles, insertImgFn));
    };

    editor.current.create();

    return () => {
      // 组件销毁时销毁编辑器
      editor.current.destroy();
    };
  }, []);

  // 初始化数据
  useEffect(() => {
    console.log('RichText init value', props);
    props[props.id] &&
      Validator.isObjectNotEmpty(props[props.id]) &&
      editor.current.txt.append(props[props.id]);
  }, []);

  /* 优化wangeditor组件placeholder占位符UE体验 */
  useEffect(() => {
    const richTextEditor = document.getElementsByClassName(
      'w-e-text',
    )?.[0] as HTMLElement;
    const placeholder = document.getElementsByClassName(
      'placeholder',
    )?.[0] as HTMLElement;

    const showPlaceHolder = () => {
      if (richTextEditor.textContent.length === 0) {
        placeholder.style.display = 'block';
      }
    };
    const hidePlaceHolder = () => {
      placeholder.style.display = 'none';
    };

    if (richTextEditor) {
      richTextEditor.addEventListener('compositionstart', hidePlaceHolder);
      richTextEditor.addEventListener('blur', showPlaceHolder);
    }

    return () => {
      richTextEditor.removeEventListener('compositionstart', hidePlaceHolder);
      richTextEditor.removeEventListener('blur', showPlaceHolder);
    };
  }, []);
}
