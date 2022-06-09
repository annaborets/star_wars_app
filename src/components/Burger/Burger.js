import React from "react";
import { Burger } from '@mantine/core';

import './Burger.scss'

function BurgerOpener(props) {
    const title = props.opened ? 'Close navigation' : 'Open navigation';

    return (
        <Burger
            opened={props.opened}
            onClick={props.onClick}
            title={title}
            color='#ffffff'
        />
    );
}
export default BurgerOpener