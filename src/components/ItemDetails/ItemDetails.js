import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Image, Grid } from '@mantine/core';
import LoaderItem from '../Loader/Loader';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import NotFoundImage from '../NotFoundImage/NotFoundImage'

import './ItemDetails.scss'


function ItemDetails(props) {
    const [data, setData] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const params = useParams();

    useEffect(() => {
        props.dataMethods
            .getSingleItem(params.id)
            .then((data) => {
                setData(data)
            })
            .catch((e) => {
                console.error(e);
                setNotFound(true)
            })
    }, [params.id, props.dataMethods])

    useEffect(() => {
        if (!data) {
            return;
        }

        fetch(data.img)
            .then(res => {
                if (!res.ok) {
                    setData({
                        ...data,
                        img: null
                    })
                }
            })
    }, [data])


    const { img: imgSrc, ...itemData } = data || {};

    return (
        <Grid justify="center" align="center" className='personCard'>

            {notFound && <NotFoundPage />}

            {!data && !notFound && <LoaderItem />}

            {data && <>
                <Grid.Col xs={12} md={6} lg={4} className="personCard__img">
                    {imgSrc
                        ? <Image src={imgSrc} alt='img' className='portraitCard' />
                        : <NotFoundImage />
                    }

                </Grid.Col>
                <Grid.Col className='infoCard' xs={12} md={6} lg={4}>
                    {Object.entries(itemData).map(([key, value]) => [
                        <div key={key} className='infoCard_item'>{key.split('_').join(' ')}: {value}</div>
                    ])}
                </Grid.Col>
            </>}


        </Grid>
    )
}

export default ItemDetails
