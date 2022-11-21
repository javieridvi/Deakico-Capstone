import React from "react";
import Chart from 'chart.js/auto'
import { Pie, Line, Bar } from "react-chartjs-2";

export default function LineChart({chartData}) {
    return <Line
        data={chartData}
        options={{mainAspectRatio: false}}
    />
}