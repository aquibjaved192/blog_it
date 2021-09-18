import React from 'react';

class RenderField extends React.PureComponent {
   handleOnChange = (e) => {
      const { input, searchOnChange } = this.props;
      input.onChange(e.target.value);
      if(searchOnChange) {
         searchOnChange(e.target.value);
      }
   }

   componentDidUpdate(prevProps) {
      const { selectedSearch, input } = this.props;
      if(selectedSearch && prevProps.selectedSearch !== selectedSearch) {
         input.onChange(selectedSearch.title);
      }
   }

   render() {
      const {
         input,
         placeholder,
         type,
         meta: { touched, error, warning },
         showSearchChange,
         handleKeyDown
      } = this.props
      return(
         <>
            <input
               className={`form-control border-secondary text-white ${touched && error ? 'redrim' : ''}`}
               style={{ 
                  height: '40px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  backgroundColor: '#303e46'
                  }}
               {...input}
               placeholder={placeholder}
               type={type}
               onChange={this.handleOnChange}
               autoComplete="off"
               tabIndex="1"
               onBlur={() => showSearchChange && showSearchChange(false)}
               onKeyDown={(e) => handleKeyDown && handleKeyDown(e)}
            />

            {touched && ((error && (
               <p
                  style={{ color: 'red', fontSize: '10px' }}
                  name={error}
                  className="m-0 font-weight-bold"
                  >
                  {error}
               </p>
            )) || (warning && (
               <p className="m-0" style={{ color: 'red', fontSize: '12px' }}>
                  {warning}
               </p>
            )))}
         </>
      )
   }
}


export default RenderField;
