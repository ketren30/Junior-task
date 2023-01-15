import React, { useState, useEffect } from "react";
import './description.css';

export const Description = ({obj}) => {
 return (
    <div className="descr">
        <span className="headers"> Выбран пользователь:</span> {obj.firstName + " " + obj.lastName}<p/>
        <span className="headers"> Описание:</span> <br/>{obj.description}<p/>
        <span className="headers"> Адрес проживания:</span> {obj.address.streetAddress} <p/>
        <span className="headers"> Город:</span> {obj.address.city} <p/>
        <span className="headers"> Провинция/штат:</span> {obj.address.state} <p/>
        <span className="headers"> Индекс:</span> {obj.address.zip}
    </div>
 )
}