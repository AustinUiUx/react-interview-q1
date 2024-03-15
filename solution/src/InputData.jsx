import {useEffect, useState} from "react";
import {getLocations} from "./mock-api/apis";

export default function InputData() {

    const [name, setName] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        getLocations().then(setLocations);
    }, []);

    const handleSubmit = () => {
        setSubmissions([...submissions, { name, location: selectedLocation }]);
        setName('');
        setSelectedLocation('');
    };


    return (
        <div style={{display: 'flex', flexDirection: "column"}}>
            <label htmlFor="nameInput" style={{marginRight: '10px', color: 'black'}}>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="nameInput" style={{marginRight: '10px', color: 'black'}}>Location:</label>
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
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setSubmissions([])}>Clear Submissions</button>
            <div style={{display: 'flex', marginTop: '20px', color: "black"}}>
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