import React, {useState} from 'react';

export default function CheckboxContinent({handleFilters}) {
    const [Checked, setChecked] = useState([])
    const continents = [
        {id: 1, name: "Europe"},
        {id: 2, name: "Africa"},
        {id: 3, name: "Asia"},
        {id: 4, name: "South America"},
        {id: 5, name: "North America"},
        {id: 6, name: "Australia"},
        {id: 7, name: "Antarctica"}
    ];

    const handleContinent = id => {
        const currentIndex = Checked.indexOf(id);
        const newChecked = [...Checked];
        if(currentIndex === -1){
            newChecked.push(id)
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleFilters(newChecked);
    }

    return (
        <div>
            {continents.map(({id, name}) => (
                <div key={id}>
                    <input onChange={() => handleContinent(id)} type='checkbox' value={name}/> {name}
                </div>
            ))}
        </div>
    )
}
