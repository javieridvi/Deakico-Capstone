import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material';
import { Typography } from '@mui/material';
import { color } from '@mui/system';
import requestService from '../services/request.service';

const columns = [
  { id: 'req_id', label: 'Request ID', minWidth: 100 },
  { id: 'name', label: 'Client Name', minWidth: 100 },
  { id: 'item', label: 'Item Name', minWidth: 170 },
  { id: 'total', label: 'Request Total', minWidth: 100 },
  {
    id: 'date',
    label: 'Request Date',
    minWidth: 170,
    align:'left'
  },
];

export function createData(req_id, name, item, total, date) {
  return { req_id, name, item, total, date };
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const time = [date.getHours(), date.getMinutes()].join(':');
    const withSlashes = [month, day, year].join('/').concat(`, ${time}`);
    const withHyphens = [month, day, year].join('-').concat(`, ${time}`);
    return withSlashes.toString();
}

// const rows = [
//   createData(1, 'José Vázquez', "El Coso 3000", '$21.00', formatDate(new Date())),
//   createData(2, 'Grace Fernández', "Skateboard" ,'$129.00', formatDate(new Date())),
//   createData(3, 'Javier Del Valle', "Computer Monitor", '$12,219.00', formatDate(new Date())),
//   createData(4, 'Pedrito Demonio', "La F que te voy a dar", '$420.00', formatDate(new Date())),
//   createData(5, 'Joe Mama', "Joe Mama's cakes" , '$21.00', formatDate(new Date())),
//   createData(6, 'Petraco Asunción', "A prayer",  '$200.00', formatDate(new Date())),
// ];

export default function DashboardTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = () => {
    var temp_list = [];
    	requestService.getProviderRequest().then((res) => {
          res.data?.map((e) => {
            temp_list.push(createData(e.req_id, e.username, e.item_name, e.total, e.date));
          })
        setRows(temp_list);
      }).catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, [])

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={6}>
                Requests
              </TableCell>
              {/* <TableCell align="center" colSpan={3}>
                Details
              </TableCell> */}
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                        {/**To-Do: Render image of users here <AccountCircleIcon fontSize='large' /> Only for first column.*/}
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}