import React from 'react';

class RenderField extends React.PureComponent {
   handleOnChange = (e) => {
      const { input, searchOnChange } = this.props;
      input.onChange(e.target.value);
      if(searchOnChange) {
         searchOnChange(e.target.value);
      }
   }

   render() {
      const {
         input,
         placeholder,
         type,
         meta: { touched, error, warning },
         showSearchChange,
      } = this.props
      return(
         <div className="form-group w-100 mb-0">
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
               onBlur={() => input.onBlur(showSearchChange(false))}
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
         </div>
      )
   }
}


export default RenderField;
