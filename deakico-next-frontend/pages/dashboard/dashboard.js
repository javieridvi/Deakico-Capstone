import { Box, Typography, Stack, Divider, Container, Grid } from '@mui/material';
import DashboardSidebar from '../../deakicomponents/Sidebar'
import DashboardTable from '../../deakicomponents/Table';
import { useState } from 'react';
import LineChart from '../../deakicomponents/LineChart';
import PieChart from '../../deakicomponents/PieChart';
import { CardBar } from '../../deakicomponents/CardBar';

    export const UserData = [
            {
                id: 1,
                year: 2016,
                userGain: 80000,
                userLost: 212,
            },
            {
                id: 2,
                year: 2022,
                userGain: 12000,
                userLost: 4212,
            },
            {
                id: 3,
                year: 2021,
                userGain: 82000,
                userLost: 2121,
            },
            {
                id: 4,
                year: 2021,
                userGain: 10200,
                userLost: 2121,
            },
            {
                id: 5,
                year: 2021,
                userGain: 72000,
                userLost: 221,
            }

    ]
export default function Dashboard() {
    const [userData, setUserData] = useState({
        labels: UserData?.map((data) => data?.year),
        datasets: [{
            label: "Users Gained",
            data: UserData?.map((data) => data?.userGain),

        }]
    });
    
    return (<>
            <DashboardSidebar/>
                <Grid container xs={12} sx={{width: '100%'}}>
                    <Grid item xs={6}>
                        {/** Likes might need date */}
                        <CardBar title="Activity: Requests, Likes, Follows" chart={<LineChart chartData={userData} />} />
                    </Grid>
                    <Grid item xs={6}>
                        <CardBar title="Stat: Best Seller" chart={<PieChart chartData={userData} />} />
                    </Grid>
                </Grid>
            <DashboardTable/>
        </>
        
    )
}