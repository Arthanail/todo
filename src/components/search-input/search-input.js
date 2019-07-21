import React, { Component } from 'react';

import './search-input.css';

export default class  SearchInput extends  Component {

    state = {
        term: ''
    };

    onSearch = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearch(term);
    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={ this.state.term }
                   onChange={ this.onSearch }/>
        )
    };
 };