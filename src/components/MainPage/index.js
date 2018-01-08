import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loadAllUsers } from './../../actions';


import { mapToArr } from './../../changeDataStructure';
import './style.scss';

class UserTable extends Component {
	static propTypes = {        
        users: PropTypes.array.isRequired,        
        openItemId: PropTypes.string,
        toggleOpenItem: PropTypes.func
	}
	
	constructor(props) {
		super(props);
		debugger;
		this.state = {
			sortByName: false,
			sortByAge: false,
			userName: '',
			currentUser: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeUser = this.handleChangeUser.bind(this);
		this.handleSortByName = this.handleSortByName.bind(this);
		this.handleSortByAge = this.handleSortByAge.bind(this);
	}

	handleChange(item) {
		this.setState({
			currentUser: item

		});
	}
	handleSortByName(item) {
		this.setState({
			sortByName: true,
			sortByAge: false

		});
	}
	handleSortByAge(item) {
		this.setState({
			sortByName: false,
			sortByAge: true

		});
	}


	handleChangeUser(event) {

		const target = event.target;
		const value = target.value;


		this.setState({
			userName: value
		});

	}

	componentWillMount() {

		const { loaded, loading, dispatch } = this.props;
		debugger;
		if (!loaded && !loading) dispatch(loadAllUsers());
	}

	render() {
		const { users } = this.props;
		
		if (this.state.sortByName)
			users.sort((a, b)=>{a.age - b.age});
		
		if (this.state.sortByName)
			users.sort((a, b)=>{a.name > b.name});
			
		const search = this.state.userName;
		const regex = new RegExp('^' + search, 'i');

		const isUser = i => i.name.match(regex) !== null;

		//	const currentUsers = this.props.users.filter(isUser);
		const currentUsers = users.filter(isUser);
		
		debugger;

		return (

			<div className={`box row`}>
				<div className='block'>

					<div className={'col-md-12'}>
						<div className='wrapInfo'>
							<div>
								<div className='search form-group'>
									<input type="text" className="form-control" id="exampleInputEmail1"
										placeholder="Поиск" onChange={this.handleChangeUser} />
								</div>
								<div className="btn-group">
								<button type="button" className="btn btn-default" onClick={(ev) => this.handleSortByName(ev)}>Sort by name</button>
								<button type="button" className="btn btn-default" onClick={(ev) => this.handleSortByAge(ev)}>Sort by age</button>
								<button type="button" className="btn btn-primary" onClick={(ev) => this.handleReset(ev)}>Reset</button>
								</div>
								<div className='users row'>
									<div className="user col-md-3">
									{!this.state.currentUser ? 'no user is choosen': 
										<div className='well thumbnail'>
											<img src={`images/${this.state.currentUser.image}.svg`} />
											<div className='border-bottom-1 row'>
											<h4 className='text-center'>{this.state.currentUser.name}</h4>
											</div>
											<div className='border-bottom-1 row'>
											<p className='text-center col-md-6'>age:</p>

											<p className='text-center col-md-6'>{`${this.state.currentUser.age}`}</p>
											</div>
											<div className='border-bottom-1 row'>
											<p className='text-center col-md-6'>Phone:</p>
											<p className='text-left col-md-6'>{`${this.state.currentUser.phone}`}</p>
											</div>
											
											<p>{`Favorite phrase: ${this.state.currentUser.phrase}`}</p>			
											
											
										
										</div>
									}
									</div>
									<div className="col-md-9 table-responsive">
										<table className="table table-striped table-bordered" >
											<thead>
												<tr>
													<th>image</th>
													<th>name</th>
													<th>age</th>
													<th>phone</th>

												</tr>
											</thead>
											<tbody>

												{currentUsers.map((item) => {

													return (

														<tr key={item.id} className='mytr' onClick={() => this.handleChange(item)}>
															<td><img src={`images/${item.image}.svg`} />
															</td>
															<td>{item.name}</td>
															<td>{item.age}</td>
															<td>{item.phone}</td>
														</tr>
													);
												})}

											</tbody>
										</table>
									</div>

								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

		);
	}
}

const mapStateToProps = (state, props) => {
	debugger;
	return {

		users: mapToArr(state.users.entities)
		, loading: state.users.loading
		, loaded: state.users.loaded

	};
};

export default connect(mapStateToProps)(UserTable);

