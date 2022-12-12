import { Grid } from '@mui/material';
import DashboardTable from '../../Table';
import { useEffect, useState } from 'react';
import { PieCard, LineCard, BarCard } from './ChartCard';
import itemService from '../../../services/item.service'
import likesService from '../../../services/likes.service';
import followsService from '../../../services/follows.service';

export default function Dashboard({user}) {

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
        if(user){
            itemService.getItemOfProvider(user?.pa_id).then((res) => {
                setItemsRating({
                    labels: res.data?.map((item) => item?.name),
                    datasets: [{
                        label: "Item Ratings",
                        data: res.data?.map((item) => item?.rating),
                    }]
                });
            }).catch((err) => {
                console.log(err);
            }); 
        } else {
            console.log('User not found')
        }
        

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
                labels: res.data?.map((follow) => new Date(follow?.f_date).toLocaleDateString()), //display the date the follow was made
                datasets: [{
                    label: "Follows",
                    data: res.data?.map((follow) => follow?.count),//display the number of follows for the day
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
                
            <DashboardTable userType='provider'/>
        </>
        
    )
}