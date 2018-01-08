import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loadAllUsers } from './../../actions';

import decoratorReset from './../../decorators/toggleReset';
import { mapToArr } from './../../changeDataStructure';
import './style.scss';

class UserTable extends Component {
	static propTypes = {
		users: PropTypes.array.isRequired,		
		toggleReset: PropTypes.func
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
		this.handleReset = this.handleReset.bind(this);
	}

	handleChange(item) {
		
		this.setState({
			currentUser: item
		});
	}
	handleSortByName(ev) {

		this.setState({
			sortByName: true,
			sortByAge: false,
			currentUser: null
		});
	}
	handleSortByAge(ev) {
		this.setState({
			sortByName: false,
			sortByAge: true,
			currentUser: null

		});
	}
	handleReset(ev) {
		this.setState({
			sortByName: false,
			sortByAge: false,
			currentUser: null

		});
		let { toggleReset } = this.props;
		toggleReset(); // reset in decorator
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

		if (!loaded && !loading) dispatch(loadAllUsers());
	}

	
	render() {
		const { users } = this.props;
		debugger;

		if (this.state.sortByAge)
			users.sort((a, b) => {
				return a.age - b.age;
			});

		if (this.state.sortByName)
			users.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});

		const search = this.state.userName;
		const regex = new RegExp('^' + search, 'i');

		const isUser = i => i.name.match(regex) !== null;

		const currentUsers = users.filter(isUser);
		const firstUser = currentUsers[0];
		const currentUser = this.state.currentUser||firstUser; 
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
								<div className='well'>
									<button type="button" className="btn btn-default" onClick={(ev) => this.handleSortByName(ev)}>Sort by name</button>
									<button type="button" className="btn btn-default" onClick={(ev) => this.handleSortByAge(ev)}>Sort by age</button>
									<button type="button" className="btn btn-danger" onClick={(ev) => this.handleReset(ev)}>Reset</button>
								</div>
								<div className='users row'>
									<div className="user col-md-3">
										{!currentUser ? 'no user is choosen' :
											<div className='well thumbnail'>
												<img src={`images/${currentUser.image}.svg`} />
												<div className='border-bottom-1 row'>
													<h4 className='text-center'>{currentUser.name}</h4>
												</div>
												<div className='border-bottom-1 row'>
													<p className='text-center col-md-6'>age:</p>

													<p className='text-center col-md-6'>{`${currentUser.age}`}</p>
												</div>
												<div className='border-bottom-1 row'>
													<p className='text-center col-md-6'>Phone:</p>
													<p className='text-left col-md-6'>{`${currentUser.phone}`}</p>
												</div>

												<p>{`Favorite phrase: ${currentUser.phrase}`}</p>



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

export default decoratorReset(connect(mapStateToProps)(UserTable));

