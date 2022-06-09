import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { Drawer } from '@mantine/core';
import BurgerOpener from '../Burger/Burger';
import './Drawer.scss'

function DrawerOpener() {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                padding="xl"
                size="l"
                overlayOpacity={0.55}
                overlayBlur={3}
            >
                <ul>
                    <li className='drawerItem'>
                        <Link to="/" className='link'>Home</Link>
                    </li>
                    <li className='drawerItem'>
                        <Link to="people" className='link'>Characters</Link>
                    </li>
                    <li className='drawerItem'>
                        <Link to="planets" className='link'>Planets</Link>
                    </li>
                    <li className='drawerItem'>
                        <Link to="films" className='link'>Films</Link>
                    </li>
                    <li className='drawerItem'>
                        <Link to="starships" className='link'>Starships</Link>
                    </li>
                    <li className='drawerItem'>
                        <Link to="vehicles" className='link'>Vehicles</Link>
                    </li>
                    <li className='drawerItem'>
                        <Link to="species" className='link'>Species</Link>
                    </li>

                </ul>
            </Drawer>

            <BurgerOpener
                onClick={() => setOpened(openedState => !openedState)}
                opened={opened}
            />
        </>
    );
}
export default DrawerOpener
