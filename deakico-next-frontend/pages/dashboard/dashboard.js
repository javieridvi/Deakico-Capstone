import { Box, Typography, Stack, Divider, Container, Grid } from '@mui/material';
import DashboardSidebar from '../../deakicomponents/Sidebar'
import DashboardTable from '../../deakicomponents/Table';
import { useEffect, useState } from 'react';
import LineChart from '../../deakicomponents/Dashboard/Chart';
import PieChart from '../../deakicomponents/Dashboard/Chart';
import { PieCard, LineCard, BarCard } from '../../deakicomponents/Dashboard/ChartCard';
import itemService from '../../services/item.service'
import likesService from '../../services/likes.service';


export default function Dashboard() {

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
        }).catch((err) => {
            console.log(err);
        })

    }


    useEffect(() => {
        fetchItems();
    }, []);

    
    return (<>
            {/* <DashboardSidebar/> */}
                <Grid container xs={12} sx={{width: '100%'}}>
                    <Grid item xs={6}>
                        {/** Likes might need date */}
                        <LineCard type="Line" title="Activity" data={itemsRating}/>
                        <BarCard type="Line" title="Activity" data={itemsRating}/>
                    </Grid>
                    <Grid item xs={6}>
                        <PieCard type="Pie" title="Items Stats" data={itemLikes} />
                    </Grid>
                </Grid>
            <DashboardTable/>
        </>
        
    )
}