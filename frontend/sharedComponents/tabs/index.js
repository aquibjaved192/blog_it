import React from 'react';
import { withRouter } from 'next/router';

class Tabs extends React.PureComponent {
  render() {
    const { toggleTab, toggleState, tabs, data, router } = this.props;
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
        <div className="row m-0 col-12 col-lg-3 p-lg-0">
          {router.pathname === "/profile/[id]" && (
            <>
              <p className="text-white font-weight-bold mb-0">
                Followers {data?.followers?.length}
              </p>
              <p className="text-white font-weight-bold mb-0 ml-4">
                Following {data?.following?.length}
              </p>
            </>
          )}
        </div>
        <div className="bloc-tabs col-lg-8 col-12 pl-lg-1 pr-lg-1 mt-3 mt-lg-0">
          {tab}
        </div>
      </div>
    )
  }
}

export default withRouter(Tabs);