import React from "react";
import Chart from 'chart.js/auto'
import { Pie, Line, Bar } from "react-chartjs-2";

export function PieChart({chartData}) {
    return <Pie
        data={chartData}
        options={{mainAspectRatio: false}}
    />
}

export function LineChart({chartData}) {
    return <Line
        data={chartData}
        options={{mainAspectRatio: false}}
    />
}

export function BarChart({chartData}) {
    return <Bar
        data={chartData}
        options={{mainAspectRatio: false}}
    />
}