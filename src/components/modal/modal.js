import React, { useState, useReducer, useEffect } from "react";
import './modal.css';

export const Modal = ({isModal, onClose, onSubmit, getPerson})=> {
    const [isValid, setIsValid]=useState(false);
    const [newPerson, dispatch]=useReducer(reducer, {
        id: "", 
        firstName: "", 
        lastName: "", 
        email: "", 
        phone: "", 
        address: {
          streetAddress: 'unknown',
          city: 'unknown',
          state: 'unknown',
          zip: 'unknown'
        },
        description: 'unknown'
    })

    function reducer(state, action) {
    switch (action.type) {
        case "changeId":
            return {...state, id: action.payload}
        case "changeFirstName":
            return {...state, firstName: action.payload};
        case "changeLastName":
            return {...state, lastName: action.payload};
        case "changeEmail":
            return {...state, email: action.payload};
        case "changePhone":
            return {...state, phone: action.payload}
    }
    }
    useEffect(()=>{
        if (newPerson.id && newPerson.firstName && newPerson.lastName && newPerson.email && newPerson.phone) {
            setIsValid(true)
          } else setIsValid(false); 
    }, [newPerson]);

    const onSubmitClick=()=>{
        getPerson(newPerson);
        onSubmit()        
    }

    if (isModal) {return (
        <div className="modal" >
            <div onClick={onClose} className="close">&#10006;</div>
            id: <input onChange={(event) => dispatch({type: "changeId", payload: event.target.value})}/><p/>
            Имя: <input onChange={(event) => dispatch({type: "changeFirstName", payload: event.target.value})}/><p/>
            Фамилия: <input onChange={(event) => dispatch({type: "changeLastName", payload: event.target.value})}/><p/>
            email: <input onChange={(event) => dispatch({type: "changeEmail", payload: event.target.value})}/><p/>
            Номер телефона: <input onChange={(event) => dispatch({type: "changePhone", payload: event.target.value})}/><p/>
            <button className="btn" onClick={onSubmitClick} disabled={!isValid}>Добавить в таблицу</button>
        </div>
    )}
    return null;
}