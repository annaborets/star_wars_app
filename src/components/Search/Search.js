import React, { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { Autocomplete, Input, Group, Text } from '@mantine/core';
import { Search } from 'tabler-icons-react';


const AutoCompleteItem = forwardRef(
    ({ value, id, ...others }, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <div>
                    <Text>{value}</Text>
                </div>
            </Group>
        </div>
    )
);

function SearchInput(props) {
    const navigate = useNavigate();

    const [value, setValue] = useState('');
    const [data, setData] = useState([])

    const search = (value) => {
        setValue(value);

        props.dataMethods
            .createDataMethods(props.category)
            .searchByCategory(value)
            .then((data) => {

                const { results: itemsList } = data;

                setData(itemsList.map(person => ({ value: person.name, id: person.id })))
            })
            .catch(console.error)
    }


    return <Autocomplete
        className='autocompleteInput'
        value={value}
        onChange={search}
        data={data}
        icon={<Search />}
        placeholder='Start typing...'
        itemComponent={AutoCompleteItem}
        onItemSubmit={(item) => { navigate(`/${props.category}/${item.id}`) }}
    />;
}
export default SearchInput;