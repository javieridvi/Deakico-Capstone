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
    
    return (
        <Box>
            <DashboardSidebar/>
            <Box sx={{width: '100%'}}>
                <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                    <CardBar title="Activity" chart={<LineChart chartData={userData} />} />
                </Grid>
                <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                    <CardBar title="Stat" chart={<PieChart chartData={userData} />} />
                </Grid>
            </Box>
            
                
            <DashboardTable/>
        </Box>
        
    )
}