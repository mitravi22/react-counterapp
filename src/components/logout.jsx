import React, {Component} from 'react';
import {logout} from '../services/userService'

class LogOut extends Component {
    componentDidMount() {
       logout()
        window.location = '/'
    }
    render() { 
        return null;
    }
}
 
export default LogOut;