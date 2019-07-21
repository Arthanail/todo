import React, { Component } from 'react';

import Header from '../header';
import SearchInput from '../search-input';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item';

import './app.css'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Wake Up'),
            this.createTodoItem('Make a Tea'),
            this.createTodoItem('Learn JS')
        ],
        term : '',
        filter: 'all'
    };

    createTodoItem(label) {
        return {
            label: label, 
            important: false,
            done: false, 
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return{
                todoData: newArray
            };
        });
    };

    addItem = (text) => {

        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            };
        });
    };

    setToggleProperty = (arr, id, property) => {
            const idx = arr.findIndex((el) => el.id === id);

            const oldItem = arr[idx];
            const newItem = { ...oldItem, [property]: !oldItem[property] };
            
            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ];
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.setToggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.setToggleProperty(todoData, id, 'done')
            };
        });
    };


    onSearch = (term) => {
        this.setState({ term });
    };

    searchItem(items, term){
        if (term.length === 0){
            return items;
        }

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    };

    filter(items, filter){
        switch(filter) {
            case 'all' :
                return items;
            case 'active' :
                return items.filter((item) => !item.done);
            case 'done' :
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };


    render() {

        const { todoData, term, filter } = this.state;

        const doneCount = this.state.todoData.filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;

        const visibleItems = this.filter(
            this.searchItem(todoData, term), filter);

        return(
            <div className="todo-app">
            <Header toDo={ todoCount } done={ doneCount } />
            <div className="top-panel d-flex">
            <SearchInput onSearch={ this.onSearch } />
            <ItemStatusFilter filter={ filter }
                              onFilterChange={ this.onFilterChange }/>
            </div>
    
            <TodoList todos={ visibleItems }
            onDeleted={ this.deleteItem }
            onToggleImportant={ this.onToggleImportant}
            onToggleDone={ this.onToggleDone} />
            <AddItem onAdded={ this.addItem } />
            </div>
        );
    };
};