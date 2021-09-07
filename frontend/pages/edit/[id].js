import React from 'react';
import { connect } from 'react-redux';
import { getBlog } from '../../redux/reducers/getBlogReducer';
import CreateBlogPage from '../create';
import { withRouter } from 'next/router';

class EditBlogPage extends React.PureComponent {
  componentDidMount() {
    const { getBlog, router } = this.props;
    getBlog(router.query.id);
  }

  render(){
    const { data } = this.props;
    return(
      <>
        {Object.keys(data).length > 0 ? (
          <CreateBlogPage 
            data={data}
          />
          ) : <div></div>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.getBlog.data,
});
 
const mapDispatchToProps = (dispatch) => {
  return {
    getBlog: (id) => dispatch(getBlog(id)),
  };
};
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditBlogPage));