import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import requestService from '../services/request.service';
import { Button, TextField, MenuItem } from '@mui/material';

//columns of provider view
const providerColumns = [
  { id: 'req_id', label: 'Request ID', minWidth: 100 },
  { id: 'name', label: 'Client Name', minWidth: 100 },
  { id: 'email', label: 'Client Email', minWidth: 100 },
  { id: 'total', label: 'Request Total', minWidth: 100 },
  {
    id: 'date',
    label: 'Request Date',
    minWidth: 170,
    align:'left'
  },
  { id: 'status', label: 'Status', minWidth: 100},
];

//columns of user view
const userColumns = [
  { id: 'req_id', label: 'Request ID', minWidth: 100 },
  { id: 'company_name', label: 'Company Name', minWidth: 100 },
  { id: 'total', label: 'Request Total', minWidth: 100 },
  {
    id: 'date',
    label: 'Request Date',
    minWidth: 170,
    align:'left'
  },
  { id: 'status', label: 'Status', minWidth: 100},
];

//provider view
export function createProviderData(req_id, name, email, total, date, status) {
  return { req_id, name, email, total, date, status };
}

//user view
export function createUserData(req_id, company_name, total, date, status) {
  return { req_id, company_name, total, date, status };
}

export default function DashboardTable({userType}) {
  const [uType, setUType] = React.useState(userType);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [allStatus, setAllStatus] = React.useState([]); //mapped list of all statuses

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  //provider status list
  const providerStatusList = [
    'accepted', //by provider
    'rejected', //by provider
    'paid',
    'sent',
  ]

  //user status list
  const userStatusList = [
    'canceled',
    'completed',
  ]
  
  const handleStatusChange = (event, reqId) => {
    //target's key will be req_id
    const updateRequest = {status: event.target.value}
    if(uType == 'provider') {
        requestService.updateRequestByProvider(reqId, updateRequest).then(() => {
          fetchData(uType);
      })
    } else {
      requestService.updateRequestByUser(reqId, updateRequest).then(() => {
        fetchData(uType);
    })
    }
  } 

  function sortIntHelper(a, b) {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  }

  const fetchData = (uType) => {
    const temp_list = [];
    const status_list = [];
    if(uType == 'provider') { //provider view
          requestService.getProviderRequest().then((res) => {
          res.data?.map((e, index) => {
            temp_list.push(createProviderData(e.req_id, e.username, e.email, e.total, new Date(e.date).toLocaleDateString(), e.status));
            status_list.push({
              row_id: e.req_id,
              row_status: e.status,
              row_date: e.date,
            });
          });

        temp_list.sort((a, b) => sortIntHelper(new Date(a.date), new Date(b.date)));
        status_list.sort((a, b) => sortIntHelper(a.row_date, b.row_date));
        setAllStatus(status_list);
        setRows(temp_list);
      }).catch((err) => {
        console.log(err);
      });
    } else { //user view
      requestService.getUserRequest().then((res) => {
        res.data?.map((e, index) => {
          console.log(e.company_name);
          temp_list.push(createUserData(e.req_id, e.company_name, e.total, new Date(e.date).toLocaleDateString(), e.status));
          status_list.push({
            row_id: e.req_id,
            row_status: e.status,
            row_date: e.date,
          });
        });

      temp_list.sort((a, b) => sortIntHelper(new Date(a.date), new Date(b.date)));
      status_list.sort((a, b) => sortIntHelper(a.row_date, b.row_date));
      setAllStatus(status_list);
      setRows(temp_list);
    }).catch((err) => {
      console.log(err);
    });
    }

  };

  React.useEffect(() => {
    fetchData(uType);
  }, [])

  if(!allStatus){
    return (
      <></>
    )
  }
  else
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
              {
              uType == 'provider'
              ?
              providerColumns.map((column) => (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))
              : 
              userColumns.map((column) => (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))
            }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} place>
                    {
                    uType == 'provider' 
                    ? //provider view
                    providerColumns.map((column) => {
                      const value = row[column.id];
                      if(column.id == 'status') {
                        const currStatus = allStatus?.find((obj) => obj.row_id == row.req_id).row_status;
                        return (
                          <TextField
                          id="status"
                          name="status"
                          label={currStatus}
                          value={currStatus}
                          onChange={(e) => {
                            allStatus?.map((obj) => {
                              if(obj.row_id == row.req_id) {
                                setAllStatus([...allStatus, {...obj, row_status: e.target.value}])
                                console.log("all status", allStatus);
                              }
                            })       

                            handleStatusChange(e, row.req_id);
                          }}
                          fullWidth
                          select
                        > 
                        
                        {
                        providerStatusList.map((status, i) => {
                          return (
                            <MenuItem key={i+1} value={status} >{status.charAt(0).toUpperCase() + status.slice(1)}</MenuItem>
                          )
                        })
                      }
                        </TextField>                       
                        )
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                        {/**To-Do: Render image of users here <AccountCircleIcon fontSize='large' /> Only for first column.*/}
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })
                    : //user view
                     userColumns.map((column) => {
                      const value = row[column.id];
                      if(column.id == 'status') {
                        const currStatus = allStatus?.find((obj) => obj.row_id == row.req_id).row_status;
                        return (
                          <TextField
                          id="status"
                          name="status"
                          label={currStatus}
                          value={currStatus}
                          onChange={(e) => {
                            allStatus?.map((obj) => {
                              if(obj.row_id == row.req_id) {
                                setAllStatus([...allStatus, {...obj, row_status: e.target.value}])
                                console.log(allStatus);
                              }
                            })                     
                            handleStatusChange(e, row.req_id);
                          }}
                          fullWidth
                          select
                        > 
                        
                        {
                        userStatusList.map((status, i) => {
                          return (
                            <MenuItem key={i+1} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</MenuItem>
                          )
                        })
                      }
                        </TextField>                       
                        )
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                        {/**To-Do: Render image of users here <AccountCircleIcon fontSize='large' /> Only for first column.*/}
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })
                  }
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