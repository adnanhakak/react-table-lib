// header=> what to display in table header
// accessor=> what name of property is in data
// this is S2 defining colums for our table
import { format } from "date-fns"
import ColumnFilter from "./ColumnFilter"
export const COLUMNS = [

    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        // disableFilters: true,
        sticky: 'left',
        Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        sticky: 'left',
        Filter: ColumnFilter
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        sticky: 'left',
        Filter: ColumnFilter
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
        Cell: ({ value }) => {
            return format(new Date(value), 'dd/MM/yyyy')
        },
        Filter: ColumnFilter
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
        Filter: ColumnFilter
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
        Filter: ColumnFilter
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email',
        Filter: ColumnFilter
    },
    {
        Header: 'Age',
        Footer: 'Age',
        accessor: 'age',
        Filter: ColumnFilter
    },
]

export const GROUPED_COLUMNS = [

    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                Footer: 'First Name',
                accessor: 'first_name',

            },
            {
                Header: 'Last Name',
                Footer: 'Last Name',
                accessor: 'last_name',

            },
        ] //as we wnat to group first and last name
    }, {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Phone',
                Footer: 'Phone',
                accessor: 'phone'
            },
            {
                Header: 'Email',
                Footer: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Age',
                Footer: 'Age',
                accessor: 'age'
            }
        ]
    }

]
