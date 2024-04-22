import React from 'react'
import BoardTable from '../components/BoardTable'
import './BoardPage.css';
import NavBar from '../../../core/components/navbar/NavBar.jsx'

const BoardPage = () => {
  return (
    <>
      <NavBar />
      <div className='board-page'>
        <BoardTable />
      </div>
    </>
  )
}

export default BoardPage