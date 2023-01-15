import React, { useState, useEffect } from "react";
import './people.css';
import {Sign} from "./sign.js";

export const People = ({people, loading, setSortedField, sortField, sortDir, getIndex, currentIndex})=> {
    if (loading) return <div>Loading...</div>

    return (
        <table className='tabl' cellSpacing={0} border='1'>
          <thead>
            <th className='butt' onClick={() => setSortedField('id')}>
              id {sortField=="id" ? <Sign direction={sortDir}></Sign>: null}
            </th>
            <th className='butt' onClick={() => setSortedField('firstName')}>
                First name {sortField=="firstName" ? <Sign direction={sortDir}></Sign>: null}
            </th>
            <th className='butt' onClick={() => setSortedField('lastName')}>
                Last name {sortField=="lastName" ? <Sign direction={sortDir}></Sign>: null}
            </th>
            <th className='butt' onClick={() => setSortedField('email')}>
                email {sortField=="email" ? <Sign direction={sortDir}></Sign>: null}
            </th>
            <th className='butt' onClick={() => setSortedField('phone')}>
                Phone number {sortField=="phone" ? <Sign direction={sortDir}></Sign>: null}
            </th>
          </thead>
          <tbody>
            {people.map((item, index)=> {
              if (index==currentIndex) return (<tr className="current" key={item.phone} onClick={()=>getIndex(index)}>
              <td width={60}>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              </tr>
            )
              return (<tr key={item.phone} onClick={()=>getIndex(index)}>
                <td width={60}>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                </tr>
              )
            })}
          </tbody>
       </table>
    )
}
