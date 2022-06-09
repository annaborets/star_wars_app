import React from 'react';
import DrawerOpener from '../Drawer/Drawer'
import logo from '../../images/logo.png'
import './Header.scss'


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            peopleList: null,
        }
    }
    render() {
        return (
            <div>
                <div className="header">
                    <DrawerOpener className='burger' />
                    <div>
                        <img className='logo' src={logo} alt='logo'></img>
                    </div>
                </div>
            </div>
        )
    }
}
export default Header
