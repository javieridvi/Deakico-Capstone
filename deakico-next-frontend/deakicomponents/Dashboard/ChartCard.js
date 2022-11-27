import {
  Card,
  CardContent,
  Typography,
  Divider,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@mui/material";
import React from "react";
import {LineChart, PieChart, BarChart}  from "./Chart";


export function PieCard({ title, data }) {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <>
      <Card>
        <CardContent>
          <Typography color='red'>
            {title}
          </Typography> 
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Filter</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={filter}
              label="Filter"
              onChange={handleChange}
            >        
            <MenuItem value="by-likes">By Likes</MenuItem>
            <MenuItem value="by-request">By Requests</MenuItem>
            <MenuItem value="by-rating">By Rating</MenuItem> 
            </Select>
          </FormControl>
          <Divider />
          <PieChart chartData={data}/>
        </CardContent>
      </Card>
    </>
  );
}

export function LineCard({ title, data }) {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <>
      <Card>
        <CardContent>
          <Typography color='red'>
            {title}
          </Typography> 
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Filter</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={filter}
              label="Filter"
              onChange={handleChange}
            >        
              <MenuItem value="request">Requests</MenuItem>
              <MenuItem value="likes">Likes</MenuItem>
              <MenuItem value="follows">Follows</MenuItem> 
            </Select>
          </FormControl>
          <Divider />
          <LineChart chartData={data} />
        </CardContent>
      </Card>
    </>
  );
}

export function BarCard({ title, data }) {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <>
      <Card>
        <CardContent>
          <Typography color='red'>
            {title}
          </Typography> 
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Filter</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={filter}
              label="Filter"
              onChange={handleChange}
            >        
              <MenuItem value="request">Requests</MenuItem>
              <MenuItem value="likes">Likes</MenuItem>
              <MenuItem value="follows">Follows</MenuItem> 
            </Select>
          </FormControl>
          <Divider />
          <BarChart chartData={data} />
        </CardContent>
      </Card>
    </>
  );
}
