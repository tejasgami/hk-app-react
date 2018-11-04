import * as React from 'react';
import Button from '../Button';

const styles = require('./modal.css');

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  isCloseable?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  noFooter?: boolean;
  noFooterBorder?: boolean;
  onConfirm?(): void;
  onCancel?(): void;
  width?: number;
  buttonStyle?: object;
  buttonClassName?: string;
  buttonLoading?: boolean;
}

class Modal extends React.Component<ModalProps> {

  public static defaultProps: ModalProps = {
    isOpen: false,
    title: '',
    isCloseable: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    noFooter: false,
    noFooterBorder: false,
    onConfirm: () => { },
    onCancel: () => { },
    width: 500,
    buttonStyle: {},
    buttonClassName: 'large blue',
    buttonLoading: false,
  };

  render() {
    const { width, title, children, isOpen, isCloseable, onConfirm, onCancel, buttonLoading,
      noFooter, noFooterBorder, confirmButtonText, cancelButtonText, buttonStyle, buttonClassName } = this.props;

    return isOpen ? (
      <div className={styles.wrapper} onClick={onCancel}>
        <div className={styles.container + ' ' + styles['width' + width]} onClick={ev => ev.stopPropagation()}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {isCloseable && <i className="fa fa-times-thin fa-3x" aria-hidden="true" onClick={onCancel}></i>}
          </div>
          <div>
            {children}
          </div>
          {!noFooter &&
            <div className={styles.footer + (noFooterBorder ? ' no-border' : '')}>
              {isCloseable && <a className={styles.cancel} onClick={onCancel}>{cancelButtonText}</a>}
              <Button
                loading={buttonLoading}
                style={buttonStyle}
                fixedWidth
                className={buttonClassName}
                onClick={onConfirm}>{confirmButtonText}</Button>
            </div>
          }
        </div>
        <NoScrollHelper />
      </div>
    ) : null;
  }
}

class NoScrollHelper extends React.Component<{}, {}> {
  componentWillMount() {
    document.getElementsByTagName('html')[0].classList.add(styles.noScroll);
  }

  componentWillUnmount() {
    document.getElementsByTagName('html')[0].classList.remove(styles.noScroll);
  }

  render() {
    return <div></div>;
  }
}

export default Modal;
