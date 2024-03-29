import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getLocalStorage } from '../../sharedComponents/helpers';
import Body from '../../sharedComponents/body';
import axios from 'axios';
import style from './home.module.scss';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    }
  }

  async componentDidMount() {
    const user = getLocalStorage('user');
    const filter = user ? user.id : 'all';
    const res = await axios.get(`http://localhost:5000/getAllBlogs/${filter}`);
    const data = res.data.data;
    this.setState({
      data,
    })
  }

  render() {
    const { data } = this.state;
    return (
      <div className={style.container}>
        <div className={`d-flex banner ${style.homeBanner}`}>
          <h2 className="text-white font-weight-bold ml-3">"Stay faithful to the stories in your head"</h2>
          <div className="coverPhotoShade" />
        </div>
        <Body
          heading="Today's Highlights"
          data={data}
        />
      </div>
    );
  }
}

// export async function getStaticProps() {
//   const res = await axios.get('http://localhost:5000/getAllBlogs/all');
//   const data = res.data.data;
//   return {
//     props: {
//       props_data: data,
//     },
//   };
// }

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
