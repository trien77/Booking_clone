import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed,faPlane,faCar,faTaxi,faLocationDot, faCalendarDay, faPerson } from '@fortawesome/free-solid-svg-icons'
import "./header.css"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom';


const Header = ({type}) => {

    const [destination,setDestination]=useState(false)
    const [openDate,setOpenDate]=useState(false)
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const [openOptions,setOpenOptions]=useState(false)
      const [options,setOptions]=useState({
        adult:1,
        children:1,
        room:1
      })
      const handleOption=(name,operation)=>{
        console.log(name)
        setOptions((prev)=>{
            return {
                
                ...prev,[name]:operation === "i" ? options[name] + 1: options[name] - 1
            }
        })
      }

      const navigate=useNavigate()
      const handleSearch=()=>{
        navigate("/hotels",{state:{destination,date,options}})
      }

  return (
    <div className='header'>
        <div className={type === "list"?"headerContainer listMode" : "headerContainer"}>
       
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} className='headerIcon'/>
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} className='headerIcon'/>
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} className='headerIcon'/>
                    <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faLocationDot}className='headerIcon' />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} className='headerIcon' />
                    <span>Airport taxis</span>
                </div>
            </div>
            { type!=="list" &&
                <>
                    <h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
                    <p className="headerDesc">
                        Get rewarded for your travels unlock instant savings of 10% or more with a free Sambooking account
                    </p>
                    <button className="headerBtn">Sign In/ Register</button>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className='headerIcon' />
                        <input type="text" placeholder='Where are you going' className='headerSearchInput' onChange={e=>setDestination(e.target.value)}/>
                        </div>
                        <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDay} className='headerIcon' />
                        <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{format(date[0].startDate,"MM//dd/yyy")} to {format(date[0].endDate,"MM//dd/yyy")}</span>
                                {openDate&&<DateRange
                                editableDateInputs={true}
                                onChange={item => setDate([item.selection])}
                                ranges={date}
                                className='date'
                                minDate={new Date()}
                                />}
                        </div>
                        <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                        <span  onClick={()=>setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} Adult . ${options.children} Children. ${options.room} Room.`}</span>
                        {openOptions&&<div className="options"  >
                            <div className="optionItem">
                                
                                <span className="optenText">Adult</span>
                                <div className="optionCounter">  
                                    <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult","d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optenText">Children</span>
                                <div className="optionCounter" > 
                                    <button disabled={options.children <= 1}  className="optionCounterButton"  onClick={()=>handleOption("children","d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton"  onClick={()=>handleOption("children","i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optenText">Room</span>
                                <div className="optionCounter"> 
                                    <button disabled={options.room <= 1}  className="optionCounterButton"  onClick={()=>handleOption("room","d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
                                </div>
                            </div>
                        </div>}
                        
                        </div>
                        <div className="headerSearchItem">
                            <button className="headerBtn" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
               </>
            }
            
      </div>
    </div>
  )
}

export default Header
