import React, { useEffect, useState } from 'react'
import './App.css';
import {banner} from './Assets/Data'
import Popup from './components/Popup';

function App() {
  const [data,setData] = useState([]);
  const [page,setPage] = useState(0);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [type ,setType] = useState("");
  const [id, setId] = useState("");
  const [temp,setTemp] = useState(false);

  useEffect(()=>{
    fetch(`https://api.spacexdata.com/v3/capsules?limit=9&offset=${page}`).then(resp=>resp.json()).then((res)=>setData(res))
  },[page])
  const filter = ()=>{
    const filt =data.filter((value)=>{
      if(type === "" && status === "status"){
        return value;
      }else if(value.type.toLowerCase().includes(type) && value.status.toLowerCase().includes(status) && value.original_launch.includes(date)){
        return value;
      }
    })
    setData(filt)
  }
  console.log(data);
  const func = (item)=>{
    setId(item)
    setTemp(!temp);
  }
  return (
    <div>
      <h2 id="heading">SpaceX</h2>
        <div className='banner'>
            <div>
              <h1>Nasa SpaceX mission:</h1>
              <h2> Dragon capsule docks with space station</h2>
            </div>
            <div>
              <img id='banner-img' src={banner} alt=''></img>
            </div>
        </div>
        <div className='search-form'>
          <p>Search Form</p>
          <div className='search-boxes'>
          <select id='options' onChange={(e)=>setStatus(e.target.value)}>
            <option value="status">status</option>
            <option value="retired">retired</option>
            <option value="active">active</option>
            <option value="destroyed">destroyed</option>
            <option value="unknown">unknown</option>
          </select>
          <input type="text" onChange={(e)=>setDate(e.target.value)} placeholder='yyyy-mm-dd'/> 
          <input placeholder='capsule type' onChange={(e)=>setType(e.target.value)}/>
          <button type="button" id='search-btn' onClick={()=>filter()}>Search</button>
          </div>
        </div>
        <div className='data-grid'>
            {data.map((item,index)=>(
            <div key={index} onClick={()=>func(item.capsule_serial)}>
              <h3>Serial No. :- {item.capsule_serial}</h3>
              <h3>Capsule id :- {item.capsule_id}</h3>
              <h3>Status :- {item.status}</h3>
              <h3>Capsule Type :- {item.type}</h3>
              {temp && id === item.capsule_serial && <Popup item={item}/>}
            </div>
            ))} 
            
        </div>
        <div className='paging'>
          <h3 onClick={()=>setPage(0)}>&lt;--prev</h3>
          <h3 onClick={()=>setPage(0)}>1</h3>
          <h3 onClick={()=>setPage(9)}>2</h3>
          <h3 onClick={()=>setPage(9)}>next--&gt;</h3>
        </div>
    </div>
  );
}

export default App;