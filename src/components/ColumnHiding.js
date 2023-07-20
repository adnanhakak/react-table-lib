import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { COLUMNS,GROUPED_COLUMNS } from './Columns'
import MOCK_DATA from './MOCK_DATA.json'
import { Checkbox } from './Checkbox'
import "./table.css"


export const ColumnHiding = () => {
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
    }) //this is s3 creating table instance now for s4 create html in jsx

    //s5 work with table instances
    const {getTableProps,allColumns,getToggleHideAllColumnsProps,footerGroups,getTableBodyProps,headerGroups,rows,prepareRow}=tableInstance
    return (
        <>
        <div >
            <Checkbox {...getToggleHideAllColumnsProps()}/> ToggleAll
        </div>
         {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
            </label>
          </div>
        ))}
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
                {rows.map((row)=>{
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