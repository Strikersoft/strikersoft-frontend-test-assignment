import React, { Component } from 'react';
import Row from './Row';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      sort: [],
      checkSearch: false,
      checkSort: false,
      checkSortName: false,
      checkSortAge: false,
      item: {},
      searched: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNameSort = this.handleNameSort.bind(this);
    this.handleAgeSort = this.handleAgeSort.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    // Example of data fetching from server
    fetch('data.json')
      .then((httpResponse) => httpResponse.json())
      .then((data) => {
        this.setState({data: data, store: data, item: data[0]})
      });
  }
  handleClick(item) {
    this.setState({item: item})
  }
  handleSearch(){
    let search = this.state.data.filter((item,index)=>item.name.includes(this.refs.search.value));
    search.length == 0 ? this.setState({checkSearch: true, searched: [], item: {}}) :
    this.setState({checkSearch: false, searched: search, item: search[0]})
   
  }
  handleNameSort() {
    let array = this.state.searched.length == 0 ? this.state.data : !this.state.checkSearch ? this.state.searched : this.state.data;
    if (this.state.checkSortName) {
      let sorted = array.sort((item, nextItem) => (item.name.trim() < nextItem.name.trim()) ? -1 : (item.name.trim() > nextItem.name.trim()) ? 1 : 0);
      this.setState({search: sorted, item: sorted[0], checkSortName: !this.state.checkSortName}) 
    }
    else {
      let sorted = array.sort((item, nextItem) => (item.name.trim() < nextItem.name.trim()) ? 1 : (item.name.trim() > nextItem.name.trim()) ? -1 : 0);
      this.setState({search: sorted, item: sorted[0], checkSortName: !this.state.checkSortName})
    }
  }
  handleAgeSort(){
    let array = this.state.searched.length == 0 ? this.state.data : !this.state.checkSearch ? this.state.searched : this.state.data;
    if (this.state.checkSortAge) {
      let sorted = array.sort((item, nextItem) => (item.age < nextItem.age) ? -1 : (item.age > nextItem.age) ? 1 : 0);
      this.setState({search: sorted, item: sorted[0], checkSortAge: !this.state.checkSortAge}) 
    }
    else {
      let sorted = array.sort((item, nextItem) => (item.age < nextItem.age) ? 1 : (item.age > nextItem.age) ? -1 : 0);
      this.setState({search: sorted, item: sorted[0], checkSortAge: !this.state.checkSortAge})
    }
  }
  handleClear() {
      this.setState({
        data: [...this.state.store],
        checkSearch: false,
        checkSortAge: false,
        checkSortName: false,
        searched: [],
        item: this.state.store[0]})
        this.refs.search.value = '';
  }
  render() {
    return (
      <div className="app">
        <div className="app container-fluid">
          <div className="row">
            <div className="col-sm-12 logo-wrap">
              <img className="logo" src="images/strikersoft.svg" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="searchbar form-group"> 
                <input onInput={this.handleSearch} ref="search" type="text" className="form-control" placeholder="Search people by name..."/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="toolbar"> 
                <button onClick={this.handleNameSort} className="btn btn-default">
                  <i className="fa fa-sort-alpha-asc"></i>
                  &nbsp;Sort by name
                </button>
                <button onClick={this.handleAgeSort} className="btn btn-default">
                  <i className="fa fa-sort-numeric-desc"></i>
                  &nbsp;Sort by age                  
                </button>
                <button onClick={this.handleClear} className="btn btn-danger">
                  <i className="fa fa-ban"></i>
                  &nbsp;Reset
                </button>                
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-md-3 col-lg-2">
            {this.state.searched.length == 0 && this.state.checkSearch ? <h3>Nothing found :(</h3> :
              <div className="picture">
                <img src={'images/'+this.state.item.image+'.svg'}/>
                <div className="description">
                  <h3>{this.state.item.name}</h3>
                  <table className="user-info table table-responsive">
                    <tbody>
                      <tr>
                        <td>Age:</td>
                        <td>{this.state.item.age}</td>                      
                      </tr>
                      <tr>
                        <td>Favorite animal:</td>
                        <td>{this.state.item.image}</td>                      
                      </tr>
                      <tr>
                        <td>Phone:</td>
                        <td>8{this.state.item.phone}</td>                      
                      </tr>                    
                    </tbody>
                  </table>
                  <p>
                    <b>Favorite phrase:</b>
                    {this.state.item.phrase}
                  </p>
                </div>
              </div>}
            </div>
            <div className="col-sm-8 col-md-9 col-lg-10">
              <table className="user-list table table-striped">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.searched.length == 0 && this.state.checkSearch ? null : this.state.searched.length != 0 ? 
                    this.state.searched.map((item, index) => <Row handleclick={this.handleClick} item={item} key={index}/>) :
                    this.state.data.map((item, index) => <Row handleclick={this.handleClick} item={item} key={index}/>)}
                  </tbody>
              </table>
            </div>
          </div>        
        </div>      
      </div>
    );
  }
}
