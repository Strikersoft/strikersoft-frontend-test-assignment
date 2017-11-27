import React, { Component } from 'react';

export default class Row extends Component {
    constructor(props) {
        super(props);
        this.handleItem = this.handleItem.bind(this);    
    }
    handleItem(){
        this.props.handleclick(this.props.item);
    }
    render() {
        return (
            <tr onClick={this.handleItem}>
                <td>
                    <img className="user-image" src={'images/'+this.props.item.image+'.svg'}/> 
                </td>  
                <td>{this.props.item.name}</td> 
                <td>{this.props.item.age}</td> 
                <td>8{this.props.item.phone}</td> 
            </tr>
        )
    }
}
    

