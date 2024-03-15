import {useEffect, useState} from "react";
import {getLocations} from "./mock-api/apis";

export default function InputData() {

    const [name, setName] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        getLocations()
            .then(setLocations);
    }, []);
    //using use effect to ensure I only fetch the data once and not on a loop
    //instead of using the standard fetch().then(res => res.json()).then(data => data.)
    //I went with just using getLocations expecting a response i used setLocations which is a function that gets all locations


    const handleSubmit = () => {
        setSubmissions([...submissions, { name, location: selectedLocation }]);
        setName('');
        setSelectedLocation('');
    };

    //I am using setSubmissions to get the array of submissions but i want to spread the submissions
    //This will give me a new array and I will not effect the exisiting array thanks to the spread operator
    //handleSubmit is a functions that that is listening for a click, it then takes the value of name and location into
    //a div.


    return (
        <div style={{display: 'flex', flexDirection: "column", color: "black"}}>
            <label htmlFor="nameInput" style={{marginRight: '10px'}}>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="nameInput" style={{marginRight: '10px',}}>Location:</label>
            <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
            >
                {locations.map(location => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>
            <div style={{alignSelf: "flex-end"}}>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setSubmissions([])}>Clear Submissions</button>
            </div>
            {/*this onClick is taking the function setSubmissions and clearing out the array so its empty*/}
            <div style={{display: 'flex', marginTop: '20px'}}>
                <div style={{marginRight: '20px'}}>
                    <strong>Names</strong>
                    {submissions.map((submission, index) => (
                        <div key={index}>{submission.name}</div>
                    ))}
                </div>
                <div>
                    <strong>Locations</strong>
                    {submissions.map((submission, index) => (
                        <div key={index}>{submission.location}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}