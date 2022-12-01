import { Box, Typography, Stack, Divider, Container, Grid } from '@mui/material';
import DashboardSidebar from '../../pages/admin/Sidebar'
import DashboardTable from '../Table';
import { useEffect, useState } from 'react';
import LineChart from './Chart';
import PieChart from './Chart';
import { PieCard, LineCard, BarCard } from './ChartCard';
import itemService from '../../services/item.service'
import likesService from '../../services/likes.service';
import {CircularProgress} from '@mui/material';


export default function Dashboard() {

    const [loading, setLoading] = useState(true);
    

    const [itemsRating, setItemsRating] = useState({
        labels: ["No data"],
        datasets: [{
            label: "No data",
            data: []
        }]
    });

    const [itemLikes, setItemLikes] = useState({
        labels: ["No data"],
        datasets: [{
            label: "No data",
            data: []
        }]
    });

    const [itemReviews, setItemReviews] = useState({
        labels: ["No data"],
        datasets: [{
            label: "No data",
            data: []
        }]
    });
    
    const fetchItems = () => {
        itemService.getItemOfProvider().then((res) => {
            setItemsRating({
                labels: res.data?.map((item) => item?.i_name),
                datasets: [{
                    label: "Item Ratings",
                    data: res.data?.map((item) => item?.i_rating),
                }]
            });
        }).catch((err) => {
            console.log(err);
        });

        likesService.getLikesOfProvider().then((res) => {
            setItemLikes({
                labels: res.data?.map((item) => item?.i_name),
                datasets: [{
                    label: "Item Likes",
                    data: res.data?.map((item) => item?.likes),
                }]
            });
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    const renderLoading = (bool) => {
        return (bool 
        ? (
            <Grid container xs={12} sx={{width: '100%'}}>
                    <Grid item xs={6}>
                        {/** Likes might need date */}
                        {/* <LineCard type="Line" title="Activity" data={itemsRating}/>
                        <BarCard type="Line" title="Activity" data={itemsRating}/> */}
                        <CircularProgress size='100px' />
                    </Grid>
                    <Grid item xs={6}>
                        {/* <PieCard type="Pie" title="Items Stats" data={itemLikes} /> */}
                        <CircularProgress size='100px '/>
                    </Grid>
                </Grid>
        )
        : (
            <Grid container xs={12} sx={{width: '100%'}}>
            <Grid item xs={6}>
                {/** Likes might need date */}
                <LineCard type="Line" title="Activity" data={itemsRating} loading ={loading}/>
                <BarCard type="Line" title="Activity" data={itemsRating} loading={loading}/>
            </Grid>
            <Grid item xs={6}>
                <PieCard type="Pie" title="Items Stats" data={itemLikes} loading={loading}/>
            </Grid>
        </Grid>
        ))
    }


    useEffect(() => {
        fetchItems();
    }, []);

    
    return (<>
            {/* {renderLoading(loading)} */}

            <Grid container xs={12} sx={{width: '100%'}}>
            <Grid item xs={6}>
                {/** Likes might need date */}
                <LineCard type="Line" title="Activity" data={itemsRating} loading ={loading}/>
                <BarCard type="Line" title="Activity" data={itemsRating} loading={loading}/>
            </Grid>
            <Grid item xs={6}>
                <PieCard type="Pie" title="Items Stats" data={itemLikes} loading={loading}/>
            </Grid>
        </Grid>
                
            <DashboardTable/>
        </>
        
    )
}