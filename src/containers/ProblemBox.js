import React from 'react';
import AddProblemForm from './forms/AddProblemForm';

const  ProblemBox = () => {
    return (
        <div className="problem__box p-0">
            <div className="bg-grey-lighter px-3 py-4 text-black">
                <AddProblemForm />
            </div>
        </div>
    )
}

export default ProblemBox;