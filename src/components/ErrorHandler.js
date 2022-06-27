import React from 'react';

const ErrorHandler = props => {

    const {error} = props;

    console.log(props.error)
    return (
        <>
        <p>Houve um erro pá!! {error}</p>
        </>
    )

}

export default ErrorHandler;