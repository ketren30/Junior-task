import React, { useState, useEffect, useLayoutEffect } from "react";
import './main.css';
import { People } from "../people/people"
import { Pagination } from "../../pagination/pagination.js";
import { Description } from "../description/description";
import { Modal } from "../modal/modal";


export const Main = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMore, setIsMore]=useState();
    
    const [currentPage, setCurrentPage]=useState(1);
    const [peoplePerPage]=useState(25);
    const [chosenPerson, setChosenPerson] = useState(null);
    const lastPersonIndex = currentPage * peoplePerPage;
    const firstPersonIndex = lastPersonIndex - peoplePerPage;

    const [isModal, setIsModal]=useState(false);

    const [filtr, setFiltr]=useState(null);
    const [reservedData, setReservedData]=useState([]);
    const [filtrWarning, setFiltrWarning]=useState(null);

    const [sortConfig, setSortConfig]=useState({});
    
    const takeData = (link) => {
      fetch(link)
      .then((res) => {return res.json().then((result)=> {
        setData(result.record);
        setReservedData(result.record);
        setLoading(false);
      })})
    }
    useEffect(()=> {
      if (isMore===false) takeData('https://api.jsonbin.io/v3/b/63ca7a2301a72b59f24f71f2') 
      else if (isMore) takeData("https://api.jsonbin.io/v3/b/63ca780601a72b59f24f70ec");
    }, [isMore] )
    
    const GetIndex = (index) => {
      setChosenPerson(index);
    }
    let currentPeople=data.slice(firstPersonIndex, lastPersonIndex);
    const Paginate = (pageNumber)=> {
      setCurrentPage(pageNumber)
    }

    const CloseModal = () => {
      setIsModal(false);
    }
    let newPerson={};
    function getNewPerson(person) {
      newPerson=person
    }
    const AddPerson = () => {
      CloseModal()
      data.unshift(newPerson)
    }

    const Filter=()=> {
      if (filtr) {
        let filteredData=[];
        data.forEach((item)=> {
          const values=Object.values(item);
          if (values.some((element)=>element.toString().toLowerCase().includes(filtr))) filteredData.push(item)
        }); 
        if (!filteredData.length) setFiltrWarning(`We didn't find "${filtr}", please try another word.`)
        setData(filteredData);
        setChosenPerson(null);
      } 
    }
    useEffect(()=> {
      setFiltrWarning(null);
      if (filtr==="") {
        setData(reservedData);
        setChosenPerson(null);
      }
    }, [filtr]); 

    const requestSort = (key) => {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
      setSortConfig({ key, direction });
      setChosenPerson(null);
    }    
    
      
    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    currentPeople=data.slice(firstPersonIndex, lastPersonIndex);
        
    
  
    if (isMore===undefined) return (
        <div>
        <h4>Сколько данных показать?</h4>
        <button className="btn1" onClick={()=>{setIsMore(true); setLoading(true)}}>Больше</button>
        <button className="btn1" onClick={()=>{setIsMore(false); setLoading(true)}}>Меньше</button>        
        </div>
    )
    else return (
     
    <div className="wrapper"> 
      <div className="vvod">
        <button className="btn2" onClick={()=>setIsModal(true)}> Добавить пользователя </button>
        <div>
          <input className="inp" onChange={(event)=>setFiltr(event.target.value.toLowerCase())}></input>
          <button className="btn3" onClick={Filter}>Найти</button>
        </div>
      </div>

      <Modal isModal={isModal} 
      onClose={CloseModal}  
      onSubmit={AddPerson}
      getPerson={getNewPerson} />

      {filtrWarning? 
      <div className="warning"> {filtrWarning} </div>:
      <People people={currentPeople} 
      loading={loading} 
      setSortedField={requestSort} 
      sortField={sortConfig.key} 
      sortDir={sortConfig.direction}
      getIndex={GetIndex}
      currentIndex={chosenPerson}/>}
      {chosenPerson!==null && <Description obj={data[chosenPerson]}/>}
      
      <Pagination peoplePerPage={peoplePerPage} totalPeople={data.length} paginate={Paginate}/>
    </div>
    )
};



 