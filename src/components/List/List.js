import React, { useEffect, useState } from 'react'
import { Card, Image, Text, Button, Group, Center, Pagination } from '@mantine/core';
import LoaderItem from '../Loader/Loader';
import FilterItem from '../Filter/Filter';
import SearchInput from '../Search/Search'
import withSwapiService from '../../hoc/withSwapiService';
import { Link, useParams } from "react-router-dom";
import { FILTER_TYPE } from '../Filter/Filter'
import NotFoundImage from '../NotFoundImage/NotFoundImage'
import './List.scss'

const SearchWithSwapiService = withSwapiService()(SearchInput)

function List(props) {

    const [itemsList, setItemsList] = useState([]);
    const [displayableItemsList, setDisplayableItemsList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const routerParams = useParams()

    useEffect(() => {
        props.dataMethods
            .getAllItems(routerParams.category)
            .then((data) => {

                setItemsList(data);
                setDisplayableItemsList(data);
            })
            .catch(console.error)
    }, [routerParams.category, props.dataMethods])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [activePage])

    const applyFiltering = (filters) => {
        const newData = itemsList.filter(item => {
            let filterHits = 0;

            filters.forEach(element => {
                const { filterField, type } = element;

                switch (type) {
                    case FILTER_TYPE.CHECKBOX:
                        const { values } = element;

                        if (values.includes(item[filterField])) {
                            filterHits++;
                        }

                        break;

                    case FILTER_TYPE.RANGE:
                        const { start, end } = element;

                        if (item[filterField] <= end && item[filterField] >= start) {
                            filterHits++;
                        }

                        break;

                    default:
                        break;
                }
            });

            return filterHits === filters.length
        })

        setDisplayableItemsList(newData);
        setActivePage(1);
    }

    const setPage = (pageNumber) => {
        setActivePage(pageNumber);

    }

    const getCurrentPageData = () => {
        const startIndex = activePage * 10 - 10;
        const endIndex = activePage * 10 > displayableItemsList.length ? displayableItemsList.length : activePage * 10


        return displayableItemsList.slice(startIndex, endIndex)
    }

    const renderCurrentPage = () => {
        return getCurrentPageData().map((person) => {
            return (
                <li key={person.id} className='cardItem'>
                    <Card className='cardMantine' shadow="sm" p="lg">
                        <Card.Section>
                            <Image
                                className='portraitImage'
                                src={person.img}
                                height={300}
                                width={300}
                                fit='contain'
                                alt="Portrait"
                                withPlaceholder={true}
                                placeholder={<NotFoundImage />} />
                        </Card.Section>
                        <Group position="apart" style={{ marginBottom: 5 }}>
                            <Text weight={500} onClick={props.onPersonSelected} key={person.id}>{person.name || person.title}</Text>
                        </Group>
                        <Button variant="filled" color="gray" style={{ marginTop: 14 }}>
                            <Link to={`${person.id}`} className='link'>More Info</Link>
                        </Button>
                    </Card>
                </li>
            )
        })
    }

    if (!itemsList.length) {
        return <Center><LoaderItem /></Center>
    }


    return (
        <>

            <div className='filterCards'>
                <div className='filterCards_item'>
                    <FilterItem
                        applyFiltering={applyFiltering}
                        itemsList={itemsList}
                        filterFields={props.filterFields}
                        className='filterBtn' />
                    <div className='searchInput'>
                        <SearchWithSwapiService category={props.category} />
                    </div>
                </div>

                {displayableItemsList.length === 0 && <Text className='noRes'>No result :(</Text>}

                {displayableItemsList.length >= 10 && <Pagination page={activePage} onChange={setPage} color="gray" className='pagination' total={Math.ceil(displayableItemsList.length / 10)} />}



                <ul className='containerForCard'>
                    {renderCurrentPage()}
                </ul>
            </div>
            {displayableItemsList.length >= 10 && <Pagination page={activePage} onChange={setPage} color="gray" className='pagination' total={Math.ceil(displayableItemsList.length / 10)} />}
        </>
    )
}

export default List