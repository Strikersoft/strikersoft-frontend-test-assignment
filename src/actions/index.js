
import { LOAD_ALL_USERS, SUCCESS, START, FAIL } from './../constants';

export const loadAllUsers = () => {
	return (dispatch) => {
		dispatch({
			type: LOAD_ALL_USERS + START
		});
		
		fetch('data.json')
			.then(res => res.json())
			.then(response => dispatch({ type: LOAD_ALL_USERS + SUCCESS, response }))
			.catch(error => dispatch({ type: LOAD_ALL_USERS + FAIL, error }))

	}
}
