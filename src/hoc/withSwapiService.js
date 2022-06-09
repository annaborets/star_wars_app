import React from 'react'
import apiService from '../services/service'

const withSwapiService = (category) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped
                category={category}
                {...props}
                dataMethods={category ? apiService.createDataMethods(category) : apiService}
            />
        );
    }
};

export default withSwapiService;
