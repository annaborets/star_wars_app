import React from 'react'

const withFilters = (filterFields) => (Wrapped) => {

    return (props) => {
        return (
            <Wrapped {...props} filterFields={filterFields} />
        )
    }
}

export default withFilters