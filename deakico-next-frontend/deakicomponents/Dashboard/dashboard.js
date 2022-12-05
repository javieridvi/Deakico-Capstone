import { Box, Typography, Stack, Divider, Container, Grid } from '@mui/material';
import DashboardSidebar from '../../pages/admin/Sidebar'
import DashboardTable from '../Table';
import { useEffect, useState } from 'react';
import LineChart from './Chart';
import PieChart from './Chart';
import { PieCard, LineCard, BarCard } from './ChartCard';
import itemService from '../../services/item.service'
import likesService from '../../services/likes.service';
import followsService from '../../services/follows.service'
import {CircularProgress} from '@mui/material';

export function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const time = [date.getHours(), date.getMinutes()].join(':');
    const withSlashes = [month, day, year].join('/').concat(`, ${time}`);
    const withHyphens = [month, day, year].join('-').concat(`, ${time}`);
    return withSlashes.toString();
}

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

    const [follows, setFollows] = useState({
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

        followsService.getFollowersGroupByDate().then((res) => {
            setFollows({
                labels: res.data?.map((follow) => follow?.f_date), //display the number of follows for the day
                datasets: [{
                    label: "Follows",
                    data: res.data?.map((follow) => follow?.count),
                }]
            });
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchItems();
    }, []);

    
    return (<>

            <Grid container xs={12} sx={{width: '100%'}}>
            <Grid item xs={6}>
                {/** Likes might need date */}
                <LineCard title="Followers" data={follows} loading ={loading}/>
                <BarCard title="Item Ratings" data={itemsRating} loading={loading}/>
            </Grid>
            <Grid item xs={6}>
                <PieCard title="Liked Items" data={itemLikes} loading={loading}/>
            </Grid>
        </Grid>
                
            <DashboardTable/>
        </>
        
    )
}