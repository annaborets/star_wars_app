import React from "react";
import { useState } from 'react';
import { Drawer, Button, Group, RangeSlider, Grid } from '@mantine/core';
import { AdjustmentsHorizontal } from 'tabler-icons-react';
import { Checkbox } from '@mantine/core';
import './Filter.scss'

export const FILTER_TYPE = {
    CHECKBOX: 'checkbox',
    RANGE: 'range'
};

const FILTER_MAX_LENGTH = 5

function FilterItem(props) {
    const generateCheckboxFilters = () => {
        return props.filterFields
            .filter(({ type }) => type === FILTER_TYPE.CHECKBOX)
            .reduce((acc, field) => {
                const { field: fieldName } = field;
                const pickedFields = props.itemsList.map(item => item[fieldName]);
                const uniqFelds = [...new Set(pickedFields)].slice(0, FILTER_MAX_LENGTH);

                const formatedFilters = uniqFelds.map(value => {
                    return {
                        filterValue: value,
                        checked: false,
                    }
                })

                return { ...acc, [fieldName]: formatedFilters }
            }, {})
    }


    const generateRangeFilters = () => {
        return props.filterFields
            .filter(({ type }) => type === FILTER_TYPE.RANGE)
            .reduce((acc, field) => {
                const { field: fieldName } = field;
                const pickedFields = props.itemsList
                    .map(item => item[fieldName])
                    .filter((number) => !isNaN(number))

                const max = Math.max(...pickedFields)
                const min = Math.min(...pickedFields);

                const formatedFilter = {
                    start: min,
                    end: max,
                    max,
                    min
                }

                return { ...acc, [fieldName]: formatedFilter }
            }, {})
    }

    const [checkboxFilters, setCheckboxFilters] = useState(generateCheckboxFilters())
    const [rangeFilters, setRangeFilters] = useState(generateRangeFilters())
    const [opened, setOpened] = useState(false);

    const changeChecboxFilterValue = (filterKey, filterValue, checked) => {
        const newFiltersByKey = checkboxFilters[filterKey].map(filter => {
            if (filter.filterValue === filterValue) {
                return {
                    ...filter, checked
                }
            }

            return filter;
        })


        setCheckboxFilters({
            ...checkboxFilters,
            [filterKey]: newFiltersByKey
        })
    }

    const changeRangeFilterValue = (filterKey, [start, end]) => {
        setRangeFilters({
            ...rangeFilters,
            [filterKey]: {
                ...rangeFilters[filterKey],
                start,
                end
            }
        })
    }

    const getFilters = () => {
        const activatedCheckboxFilters = Object.entries(checkboxFilters).reduce((acc, [filterKey, filterValues]) => {
            const activatedFilters = filterValues.filter(item => item.checked).map(item => item.filterValue);

            if (activatedFilters.length > 0) {
                return [
                    ...acc,
                    {
                        type: FILTER_TYPE.CHECKBOX,
                        filterField: filterKey,
                        values: activatedFilters
                    }
                ]
            }

            return acc;
        }, [])

        const formatedRangeFilters = Object.entries(rangeFilters).map(([filterKey, filterValue]) => {
            return {
                type: FILTER_TYPE.RANGE,
                filterField: filterKey,
                start: filterValue.start,
                end: filterValue.end
            }
        })

        return [...activatedCheckboxFilters, ...formatedRangeFilters];
    }


    const resetFilters = () => {
        setCheckboxFilters(generateCheckboxFilters())
        setRangeFilters(generateRangeFilters())
    }

    return (
        <>
            <Drawer
                className='filterDrawer'
                opened={opened}
                onClose={() => setOpened(false)}
                padding="xl"
                size="xl"
                position="top"
            >
                <div className='totalCont'>
                    <Grid>

                        <Grid.Col span={12}>
                            <Grid>
                                {Object.entries(checkboxFilters).map(([key, values]) => {
                                    return (
                                        <Grid.Col key={key} xs={12} md={6} lg={4}>
                                            <h3>{key.split('_').join(' ')}</h3>
                                            {values.map(item => {
                                                return <Checkbox
                                                    key={item.filterValue}
                                                    label={item.filterValue}
                                                    checked={item.checked}
                                                    color="gray"
                                                    radius="xs"
                                                    size="md"
                                                    onChange={(event) => changeChecboxFilterValue(key, item.filterValue, event.currentTarget.checked)}
                                                />
                                            })}
                                        </Grid.Col>

                                    )
                                })}
                            </Grid>
                        </Grid.Col>

                        <Grid.Col span={12}>
                            <Grid>
                                {Object.entries(rangeFilters).map(([key, values]) => {
                                    const { start, end, min, max } = values;

                                    return (

                                        <Grid.Col key={key} xs={12} md={6} lg={4}>
                                            <h3>{key}</h3>
                                            <RangeSlider
                                                color="dark"
                                                marks={[
                                                    { value: min, label: min },
                                                    { value: max, label: max }
                                                ]}
                                                max={max}
                                                min={min}
                                                value={[start, end]}
                                                onChange={(event) => changeRangeFilterValue(key, event)}
                                            />
                                        </Grid.Col>

                                    )
                                })}
                            </Grid>
                        </Grid.Col>




                    </Grid>

                    <div className='buttonContainer'>
                        <Button className='filterBtn' color="dark" onClick={resetFilters}>Reset filters</Button>
                        <Button className='filterBtn' color="dark" onClick={() => props.applyFiltering(getFilters())}>Apply filters</Button>
                    </div>
                </div>
            </Drawer>

            <Group position="center">
                <Button color="gray" variant="outline" leftIcon={<AdjustmentsHorizontal size={18} />} onClick={() => setOpened(true)}></Button>
            </Group>
        </>
    );
}
export default FilterItem
