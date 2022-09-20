import React, { useEffect, useState } from "react";
import ErrorAlert from "./ErrorAlert";
import SuccessMessage from "./SuccessMessage";
import "./userForm.css"
const url = 'https://frontend-take-home.fetchrewards.com/form';

function UserForm() {
    const [occupations, setOccupations] = useState([])
    const [states, setStates] = useState([])
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    async function getOccupationsAndStates() {
        try {   
            const dataFromAPI = await fetch(url)
            const data = await dataFromAPI.json()
            setOccupations(["Select Occupation", ...data.occupations])
            setStates([{name: "Select State", abbreviation: ""}, ...data.states])
        } catch (error) {
            setError(error)
        } 
    }

    useEffect(() => {
        getOccupationsAndStates();
    }, [])

    const initialFormState = {
        name: "",
        email: "",
        password: "",
        occupation: "Select Occupation",
        state: "Select State",
    }

    const [formData, setFormData] = useState(initialFormState)

    const handleChange = async ({target}) => {
        setFormData({...formData, [target.name]: target.value}) 
    }

    async function submitFormData() {
        try {
            await fetch(url, {method: 'POST', headers: {"content-type": "application/json"}, body: JSON.stringify(formData) });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false)
            }, 5000);
        } catch (error) {
            setError(error)
            console.log(error)
        }   
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        if (!formData.name || !formData.email || !formData.password || formData.state === "Select State" || formData.occupation === "Select Occupation") {
            setError({message: `Must fill out all fields.`})
            return () => abortController.abort();
        }
        
        submitFormData();
        setFormData(initialFormState);
        setError("");
        
        return () => abortController.abort();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Full Name
                        <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={formData.name}/>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                        <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} aria-describedby="emailHelp"/>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password
                        <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={formData.password}/>
                    </label>
                </div>
                {occupations ? <div className="form-group">
                    <label htmlFor="occupation" className="form-label">
                        Occupation
                        <select name="occupation" id="occupation" className="form-control" value={formData.occupation} onChange={handleChange}>
                            {occupations.map(occupation => {
                                return (
                                        <option key={occupation} value={occupation}>{occupation}</option>
                                    )
                            })}
                        </select>
                    </label>
                </div>
                : null
                }
                {states ? <div className="form-group">
                    <label htmlFor="state" className="form-label">
                        State
                        <select name="state" id="state" className="form-control" value={formData.state} onChange={handleChange}>
                            {states.map(state => {
                                return (
                                    <option key={state.abbreviation} value={state.name}>{state.name}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                : null
                }
                <div className="form-group">
                    <button type="submit" className="btn btn-dark btn-lg">Submit</button>
                </div>
                
            </form>
            {success && !error ? <SuccessMessage /> : null}
            {error ? <ErrorAlert error={error} /> : null}
        </div>
    )
}

export default UserForm;