import React, { Component } from 'react';
import { connect } from 'react-redux';
import t from 'tcomb-form';
import semantic from 'tcomb-form-templates-semantic';
import PropTypes from 'prop-types';
import Loader from '../loader';
import { setError, clearError } from '../../actions/metaActions';
import fetchData from '../../lib/fetchData';

// takes a tForm schema object and renders a form which will 
class FlexiForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.defaultData,
      isPending: false
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({data:nextProps.defaultData});
  }

  handleSubmit(e) {
    e.preventDefault();
    let value = this.formInput.getValue();
    let strValue = JSON.stringify(value);
    let method = this.props.requestMethod || 'PUT';
    this.setState({ isPending: true, data: value });
    let formOptions = {
      type: method,
      data: strValue,
      contentType: 'application/json',
      headers: {
        'X-CSRF-Token': window.CSRF_TOKEN
      },
      timeout: this.props.timeout
    };
    fetchData(this.props.updateUrl, formOptions).then( (data) => {
      this.setState({ isPending: false });
      this.props.dispatch(clearError());
      if (this.props.onSuccess) this.props.onSuccess(data);
    }).catch( (data) => {
      this.setState({ isPending: false });
      let errorMessage = data ? data.message : 'There was an unknown error with your submission. Please refresh the page and try again.';
      this.props.dispatch(setError(errorMessage));
      if (this.props.onError) {
        this.props.onError(data);
      }
    });
  }

  render() {
    if (this.state.isPending) return <Loader />;
    let submitText = this.props.submitText || 'Update';
    t.form.Form.templates = semantic;
    return (
      <form className='sgd-curate-form' onSubmit={this.handleSubmit.bind(this)}>
        <t.form.Form options={this.props.tFormOptions} onChange={this.props.onChange} ref={input => this.formInput = input} type={this.props.tFormSchema} value={this.state.data} />
          <div className='form-group'>
            <button type='submit' className='button'>{submitText}</button>
          </div>
      </form>
    );
  }
}

FlexiForm.propTypes = {
  defaultData: PropTypes.object,
  dispatch: PropTypes.func,
  getUrl: PropTypes.string,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,// (data) =>
  onChange: PropTypes.func,
  submitText: PropTypes.string,
  requestMethod: PropTypes.string,
  tFormSchema: PropTypes.func.isRequired,
  tFormOptions: PropTypes.object,
  timeout: PropTypes.number,
  updateUrl: PropTypes.string.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(FlexiForm);
