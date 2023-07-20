import React, { useMemo } from 'react'
import { useTable,usePagination } from 'react-table'
import { COLUMNS,GROUPED_COLUMNS } from './Columns'
import MOCK_DATA from './MOCK_DATA.json'
import "./table.css"


export const PaginationTable = () => {
    const columns = useMemo(() => {
        return GROUPED_COLUMNS
    }, [])
    const data = useMemo(() => {
        return MOCK_DATA
    }, [])
    const tableInstance = useTable({
        columns: columns,
        data: data
        //noneed to call functions as useMemo returns value directly
    },usePagination) //this is s3 creating table instance now for s4 create html in jsx

    //s5 work with table instances
    const {getTableProps,getTableBodyProps,setPageSize,gotoPage,pageCount,canNextPage,canPreviousPage,nextPage,pageOptions,state,previousPage,headerGroups,page,prepareRow}=tableInstance
    return (
        <>
        <table {...getTableProps()}>

            <thead>
                {headerGroups.map((headerGroup)=>{
                  return ( 
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column)=>{
                        return(
                            <th{...column.getHeaderProps()}>
                            {column.render("Header")}</th>
                        )
                    })}
                    
                </tr>)
                })}
            </thead>

            <tbody {...getTableBodyProps()}>
                {page.map((row)=>{
                    prepareRow(row)
                    return (
                         <tr {...row.getRowProps()}>
                            {row.cells.map((cell)=>{
                             return( 
                                <td{...cell.getCellProps()}>
                                {cell.render("Cell") }
                                
                                </td>
                                )
                            })}
                    </tr>)
                })}
            </tbody>
        </table>
        <strong>
            {`page ${state.pageIndex+1} of ${pageOptions.length}`}
        </strong>
        <span>| goto page </span>
        <input type='number'  defaultValue={1} onChange={(e)=>gotoPage(e.target.value-1)}/>
        <span>
            <select value={state.pageSize} onChange={(e)=>setPageSize(Number(e.target.value))}>
               { [10,25,50].map((each,i)=>{
                    return (<option key={i} value={each}>show {each}</option>)
                })}
            </select>
        </span>
        <div>
        <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
        <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={()=>nextPage()} disabled ={!canNextPage}>Next</button>
        <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{">>"}</button>

        </div>
        </>
    )
}
//data wrapped with th tag in header 
//data wrapped with td tag in body
//tr specifies row