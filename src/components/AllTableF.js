import React, { useMemo } from 'react'
import { useTable ,useGlobalFilter,useSortBy ,useFilters} from 'react-table'
import { COLUMNS,GROUPED_COLUMNS } from './Columns'
import MOCK_DATA from './MOCK_DATA.json'
import "./table.css"
import GlobalFilter from './GlobalFilter'

export const AllTableF = () => {
    const columns = useMemo(() => {
        return COLUMNS
    }, [])
    const data = useMemo(() => {
        return MOCK_DATA
    }, [])
    const tableInstance = useTable({
        columns: columns,
        data: data
        //noneed to call functions as useMemo returns value directly
    },useFilters,useGlobalFilter,useSortBy) //this is s3 creating table instance now for s4 create html in jsx

    //s5 work with table instances
    const {getTableProps,state,setGlobalFilter,footerGroups,getTableBodyProps,headerGroups,rows,prepareRow}=tableInstance
    const{globalFilter}=state
    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>

            <thead>
                {headerGroups.map((headerGroup)=>{
                  return ( 
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column)=>{
                          return(
                            <th{...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render("Header")}
                            <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                              : ''}
                          </span>
                            <div>{column.canFilter ? column.render('Filter') : null}</div>

                            </th>
                        )
                    })}
                    
                </tr>)
                })}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map((row)=>{
                    prepareRow(row)
                    return (
                         <tr {...row.getRowProps()}>
                            {row.cells.map((cell)=>{
                             return( 
                                <td{...cell.getCellProps()} onClick={()=>console.log(cell.row.values)}>
                                {cell.render("Cell") }
                                {cell.column.Header === "Email" && (
                                    <div style={{ fontSize: "12px", color: "gray" }} onClick={
                                        ()=>{
                                            alert("calling "+cell.row.values.phone)
                                            console.log(cell.row.values)
                                        }
                                    }>
                                      {cell.row.values.phone}
                                    </div>
                                  )}
                                </td>
                                )
                            })}
                    </tr>)
                })}
            </tbody>

            <tfoot>
            {footerGroups.map((footerGroup)=>{
                  return ( 
                  <tr {...footerGroup.getFooterGroupProps()}>
                    {footerGroup.headers.map((column)=>{
                        return(
                            <th{...column.getFooterProps()}>
                            {column.render("Footer")}</th>
                        )
                    })}
                    
                </tr>)
                })}
            </tfoot>
        </table>
        </>
    )
}
//data wrapped with th tag in header 
//data wrapped with td tag in body
//tr specifies row