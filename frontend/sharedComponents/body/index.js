import React from "react";
import BlogCard from '../../sharedComponents/cards/blogCard';
import Trends from '../../sharedComponents/Trends';
import Tabs from '../tabs';

class Body extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleState: 0
    }
  }

  toggleTab = (index) => {
    this.setState({
      toggleState: index,
    });
  };

  returnData = () => {
    const { toggleState } = this.state;
    const { heading, data } = this.props;
    switch(toggleState) {
      case 0: 
        return {
          cards: data?.blogs?.map((item) => <BlogCard key={item._id} blog={item} />),
          trends: <Trends heading={heading} trends={data?.topBlogs} />
        }
      case 1: 
        return {
          cards: <h2 className="text-center text-white">Coming soon...</h2>,
          trends: <div />
        }
      case 2: 
        return {
          cards: <h2 className="text-center text-white">Coming soon...</h2>,
          trends: <div />
        }
      default: 
        return {
          cards: <div />,
          trends: <div />
        };
    }
  }

  render() {
    const { toggleState } = this.state;
    const { data } = this.props;
    const toggleData =  this.returnData();
    return(
      <div className="banner-body-margin">
        <Tabs 
          toggleState={toggleState}
          toggleTab={this.toggleTab}
          tabs={["Blogs", "Feeds", "QnAs"]}
          data={data}
        />
        <div className="row ml-0 mr-0 mb-3 justify-content-around">
          <div className="col-12 mb-4 col-lg-3 p-lg-0">
            {toggleData.trends}
          </div>
          <div className="col-lg-8 col-12 p-lg-0 cardsContainer scrollBar">
            <div className="row m-0">
              {toggleData.cards}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Body;