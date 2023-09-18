import React,{useState}from 'react'
import Navbar from "../../components/navbar/Navbar"
import Header from '../../components/header/Header';
import SearchItem from "../../components/searchItem/SearchItem"
import "./list.css"
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';

const List = () => {
  const location=useLocation()
  const state=location.state || {}
  const [destination,setDestination]=useState(state.destination||'')
  const [date,setDate]=useState(state.date||'')
  const [options,setOptions] = useState(state.options||'')
  const [openDate,setOpenDate] = useState(false)
   console.log(location)
  return (
    <div>
      <Navbar/>
      <Header type="list"/>

      <div className="listContainer">
        <div className="listWrapper">

          <div className="listSearch">
                <h1 className="lsTitle">Search</h1>
                <div className="lsItem">
                    <label>Destination</label>
                    <input placeholder={destination} type="text" />
                </div>
                <div className="lsItem">
                    <label>Check-in Date</label>
                    <span onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate,"MM/dd/yyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}</span>
                    {openDate && <DateRange
                    onChange={item => setDate([item.selection])}
                    ranges={date}
                    minDate={new Date()}
                    />}
                </div>
                <div className="lsItem">
                      <label>Options</label>
                      <div className="lsOptions">
                          <div className="lsOptionItem">
                            <span className="lsOptionText">
                              Min <small>per night</small>
                            </span>
                            <input type="number" className="lsOptionInput" />
                          </div>
                          <div className="lsOptionItem">
                            <span className="lsOptionText">
                              Max price <small>per night</small>
                            </span>
                            <input type="number" className="lsOptionInput" />
                          </div>
                          <div className="lsOptionItem">
                            <span className="lsOptionText">
                              Adult
                            </span>
                            <input type="number" className="lsOptionInput" placeholder={options.adult}/>
                          </div>
                          <div className="lsOptionItem">
                            <span className="lsOptionText">
                              Children
                            </span>
                            <input min={1}type="number" className="lsOptionInput" placeholder={options.children}/>
                          </div>
                          <div className="lsOptionItem">
                            <span className="lsOptionText">
                              Room
                            </span>
                            <input type="number" className="lsOptionInput" placeholder={options.room} />
                          </div>
                      </div>
                </div>
                <button>Search</button>
          </div>
          




              <div className="listResult">
                      <SearchItem/>
                      <SearchItem/>
                      <SearchItem/>
                      <SearchItem/>
                      <SearchItem/>
                      <SearchItem/>
                      <SearchItem/>
                      <SearchItem/>
              </div>




        </div>
      </div>
      
    </div>
  )
}

export default List
