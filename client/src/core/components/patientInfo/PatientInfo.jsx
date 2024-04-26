import React from 'react'
import './PatientInfo.css'
import { AiOutlineFileDone } from "react-icons/ai";


const PatientInfo = () => {
    return (
        <>
            <div className="patient-data-container">
                <div className='article'>
                    <div className='info-header'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg>
                        <div style={{ display: "flex", flexDirection: "column"}}>
                            <h2>Yousseif Essam</h2>
                            <span>ID: 1023523256</span>
                        </div>
                    </div>
                    {/* <hr> */}
                    <div className='record-info'>
                        <span>Weight</span>
                        <span>80 kg</span>
                    </div>
                    <div className='record-info'>
                        <span>Age</span>
                        <span>23 yrs</span>
                    </div>
                    <div className='record-info'>
                        <span>Height</span>
                        <span>184 cm</span>
                    </div>
                    <div className='record-info'>
                        <span>Address</span>
                        <span>Al Obour</span>
                    </div>
                    <div className='record-info'>
                        <span>Phone</span>
                        <span>01003793415</span>
                    </div>
                </div >
            </div >
        </>
    )
}

export default PatientInfo