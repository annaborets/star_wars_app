import React from "react";
import { Card, Image, Button } from '@mantine/core';
import { Link } from "react-router-dom";
import DarthVader from '../../images/DarthVader.jpeg'
import Planet from '../../images/Planets.jpeg'
import Films from '../../images/Films.webp'
import Species from '../../images/Species.jpeg'
import Starships from '../../images/Starships.webp'
import Vehicles from '../../images/Vehicles.webp'


import './Card.scss'

function CardBuilder() {
    return (
        <div className='container'>
            <Card shadow="sm" p="lg" className='xl l'>
                <Card.Section>
                    <div className='cardContainer'>
                        <Image className='mainImg' src={DarthVader} alt="Characters" />
                        <div className='mainBtnCont'>
                            <Button size="lg" radius="xs" className='mainBtn' variant="light" >
                                <Link to="people" className='link'>Characters</Link>
                            </Button>
                        </div>
                    </div>
                </Card.Section>
            </Card>
            <Card shadow="sm" p="lg" className='xl s'>
                <Card.Section>
                    <div className='cardContainer'>
                        <Image className='mainImg' src={Planet} alt="Planets" />
                        <div className='mainBtnCont'>
                            <Button size="lg" radius="xs" className='mainBtn' variant="light" >
                                <Link to="planets" className='link'>Planets</Link>
                            </Button>
                        </div>
                    </div>
                </Card.Section>
            </Card>
            <Card shadow="sm" p="lg" className='xl m'>
                <Card.Section>
                    <div className='cardContainer'>
                        <Image className='mainImg' src={Films} alt="Planets" />
                        <div className='mainBtnCont'>
                            <Button size="lg" radius="xs" className='mainBtn' variant="light" >
                                <Link to="films" className='link'>Films</Link>
                            </Button>
                        </div>
                    </div>
                </Card.Section>
            </Card>
            <Card shadow="sm" p="lg" className='xl l'>
                <Card.Section>
                    <div className='cardContainer'>
                        <Image className='mainImg' src={Starships} alt="Planets" />
                        <div className='mainBtnCont'>
                            <Button size="lg" radius="xs" className='mainBtn' variant="light">
                                <Link to="starships" className='link'>Starships</Link>
                            </Button>
                        </div>
                    </div>
                </Card.Section>
            </Card>
            <Card shadow="sm" p="lg" className='xl m'>
                <Card.Section>
                    <div className='cardContainer'>
                        <Image className='mainImg' src={Vehicles} alt="Planets" />
                        <div className='mainBtnCont'>
                            <Button size="lg" radius="xs" className='mainBtn' variant="light">
                                <Link to="vehicles" className='link'>Vehicles</Link>
                            </Button>
                        </div>
                    </div>
                </Card.Section>
            </Card>
            <Card shadow="sm" p="lg" className='xl s'>
                <Card.Section>
                    <div className='cardContainer'>
                        <Image className='mainImg' src={Species} alt="Planets" />
                        <div className='mainBtnCont'>
                            <Button size="lg" radius="xs" className='mainBtn' variant="light" >
                                <Link to="species" className='link'>Species</Link>
                            </Button>
                        </div>
                    </div>
                </Card.Section>
            </Card>
        </div>
    );
}
export default CardBuilder