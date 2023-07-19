import React from 'react'

function ColumnFilter({column}) {
    const{filterValue,setFilter}=column;
  return (
    <span>
        Search:
        <input type="text" value={filterValue || ""} onChange={(e)=>setFilter(e.target.value)}></input>
    </span>
  )
}

export default ColumnFilter