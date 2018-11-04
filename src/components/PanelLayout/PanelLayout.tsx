import * as React from 'react';

const styles = require('./panel-layout.css');

interface PanelLayoutProps {
  title: string;
  colSize?: string;
  footer?: any;
}

class PanelLayout extends React.Component<PanelLayoutProps> {
  render() {
    let { title, colSize, footer } = this.props;
    colSize = colSize || "col-lg-5 col-md-8";

    return (
      <div className="container">
        <div className={styles.mobileHeader}>
          <img src="/public/assets/images/header-logo.svg" />
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className="row justify-content-center">
          <div className="col">
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className={colSize}>
            <div className={styles.panel}>
              {this.props.children}
            </div>
          </div>
        </div>
        {footer && (<div className="row justify-content-center">
          <div className="col">
            {footer}
          </div>
        </div>)}
      </div>
    );
  }
}

export default PanelLayout;
