import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { css } from 'aphrodite/no-important';
import { styles } from './AutoCompleteStyles';

const propTypes = {
	results: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired,
	keys: PropTypes.object.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
  value: PropTypes.string,
  limit: PropTypes.number
}

const defaultProps = {
  results: [],
  onSelect: (value) => {},
	keys: {id: 'id', name: 'name'},
  placeholder: '',
	onChange: (value) => {},
  value: ''
};

class AutoComplete extends Component {
	constructor(props) {
		super(props);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.onChange = this.onChange.bind(this);
		this.resultDiv = this.resultDiv.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onFocus = this.onFocus.bind(this);

		this.state = {
			value: '',
			results: [],
			inside: false,
			showResults: false,
			selected: -1
		};
	}

	componentWillMount(){
    const { results, value } = this.props;
		this.setState({ results: [...results], value });
	}

	componentWillReceiveProps(nextProps) {
    if (nextProps.results);
	    this.setState({results: [...nextProps.results]});
  }

	onChange(e) {
		const { onChange, keys: { name } } = this.props;
    var resAux = [...this.props.results.filter(item => item[name].includes(e.currentTarget.value))];
		this.setState({
      selected: -1,
      value: e.currentTarget.value,
      results: resAux,
      showResults: resAux.length>0
		});
		if (resAux.length === 1 && resAux[0][name] === e.currentTarget.value) 
			onChange(resAux[0]);
		else
			onChange({[name]: e.currentTarget.value});
		if (resAux.length > 0)
      document.addEventListener('click', this.handleOutsideClick, false)
	}

	onSelect(item) {
		const { onSelect, keys: { name } } = this.props, value = item[name];
		if (this.refs.input)
	    this.refs.input.value = value;
		this.setState({
			selected: -1,
			value: value,
      showResults: false,
      results: this.state.results.filter(item => item[name].includes(value))
		});
		onSelect(item);
	}

	handleOutsideClick (e) {
    if (!this.refs.container || this.refs.container.contains(e.target.parentNode) || e.target.id === 'container')
      return;
    if (this.state.showResults !== false)
      this.setState({
        selected: -1,
        showResults: false
      });
    document.removeEventListener('click', this.handleOutsideClick, false);
	}

	onFocus(){
    if (this.state.results.length>0) {
      document.addEventListener('click', this.handleOutsideClick, false)
      this.setState({showResults: true});
    }
	}
	keyDown(inputEvent) {
		if (inputEvent.keyCode === 40) {
			if (this.state.selected < this.state.results.length - 1 && (this.props.limit?this.state.selected<this.props.limit:true)) {
				inputEvent.preventDefault();
				this.setState((prevState) => {
					return { selected: prevState.selected +1 };
				});
			}
		}
		else if (inputEvent.keyCode === 38) {
			if (this.state.selected>0) {
				inputEvent.preventDefault();
				this.setState((prevState) => {
					return { selected: prevState.selected -1 };
				});
			}
		}
		else if (inputEvent.keyCode === 13 && this.state.results[this.state.selected])
			this.onSelect(this.state.results[this.state.selected]);
	}

	resultDiv() {
		const{ limit, keys: { name } } = this.props;

		const renderItems = () => {
			return (
				this.state.results.slice(0, limit?limit:this.state.results.length).map((item, index) => {
					return (
						<li
							key={`item_${index}`}
							className={css(styles.suggestion, this.state.selected === index ? styles.suggestionSelected :null)}
						>
							<div onClick={() => this.onSelect(item)}>
								{this.setBold(item[name])}
							</div>
						</li>);
				})
			);
		};
		
		if(this.state.showResults && this.state.results.length > 0 ){
			return (
				<div className={css(styles.suggestionsContainer)} >
					<ul className={css(styles.suggestionsList)}>
						{renderItems()}
					</ul>
				</div>
			);
    }
    else
			return null;
	}

	setBold(text) {
		var match = text.toString().split(new RegExp("("+this.state.value.replace(/[`~,.<>;':"/[\]|{}()=_+]/g, '\\$&')+")", 'gi'));
		for (var k=1; k < match.length; k+=2)
			match[k] = <b key={'b_' + k}>{match[k]}</b>;
		return match;
	}

	render() {
		const{ placeholder } = this.props;

		return (
			<div className={css(styles.fieldset)} id={'container'} ref={'container'}>
				<input ref={'input'} onChange={this.onChange} placeholder={placeholder?placeholder:''} defaultValue={this.state.value} className={css(styles.input)} onFocus={this.onFocus} onKeyDown={(e) => this.keyDown(e)} autoComplete="off"></input>
				{this.resultDiv()}
			</div>
		);
	}
}


AutoComplete.propTypes = propTypes;
AutoComplete.defaultProps = defaultProps;

export default AutoComplete;