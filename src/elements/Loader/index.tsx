import * as React from 'react';

const styles = require('./loader.css');

interface LoaderProps {
  isOpen?: boolean;
  className?: string;
  topShift?: number;
}

class Loader extends React.Component<LoaderProps> {

  public static defaultProps: LoaderProps = {
    isOpen: false,
    className: 'large',
    topShift: 0,
  };

  render() {
    const { isOpen, className, topShift } = this.props;

    return isOpen ? (
      <div
        style={{
          height: `calc(100% - ${topShift + 1}px)`,
          top: `${topShift + 1}px`,
        }}
        className={styles.wrapper + ' ' + styles[className]}>
        <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
      </div>
    ) : null;
  }
}

export default Loader;
