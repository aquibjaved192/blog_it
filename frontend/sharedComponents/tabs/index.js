import React from 'react';

class Tabs extends React.PureComponent {
  render() {
    const { toggleTab, toggleState, tabs } = this.props;
    const tab = tabs.map((item, index) => (
      <button
        key={item}
        type="button"
        className={
          toggleState === index ? 'tabs active-tabs' : 'tabs'
        }
        onClick={() => toggleTab(index)}
      >
        {item}
      </button>
    ))

    return(
      <div className="row ml-0 mr-0 mb-3 justify-content-around">
        <div className="col-12 col-lg-3 p-lg-0" />
        <div className="bloc-tabs col-lg-8 col-12 pl-lg-1 pr-lg-1">
          {tab}
        </div>
      </div>
    )
  }
}

export default Tabs;