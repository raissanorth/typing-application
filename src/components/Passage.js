import React from 'react';

const Passage = (props) => {

    return (
        <div>
            <p id="text-display">{props.formattedPassage}</p>
        </div>
    );
};

export default Passage;