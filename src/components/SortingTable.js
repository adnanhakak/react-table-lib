import React, { useMemo } from 'react'
import { useTable,useSortBy } from 'react-table'
import { COLUMNS,GROUPED_COLUMNS } from './Columns'
import MOCK_DATA from './MOCK_DATA.json'
import "./table.css"


export const SortingTable = () => {
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
    },useSortBy) //this is s3 creating table instance now for s4 create html in jsx

    //s5 work with table instances
    const {getTableProps,footerGroups,getTableBodyProps,headerGroups,rows,prepareRow}=tableInstance
    return (
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
                                {console.log("column",column)}
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                              : ''}
                          </span>
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
                                <td{...cell.getCellProps()}>
                                {cell.render("Cell")}
                                {console.log("kkkk",cell)}
                                {cell.column.Header === "Email" && (
                                    <div style={{ fontSize: "12px", color: "gray" }} onClick={
                                        ()=>{
                                            alert("calling "+cell.row.values.phone)
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
    )
}
//data wrapped with th tag in header 
//data wrapped with td tag in body
//tr specifies row