import React , {useState} from 'react'
import './Chart.css'
import {Line , Bar} from 'react-chartjs-2'
import { Chart ,CategoryScale  } from 'chart.js';


export default function ChartComponent() {
    
    
    let [chartData , setChartData] = useState({
        labels: ['Sunday' , 'Monday' , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"],
        datasets: [
            {
                data: [
                    15339,
                    21345,
                    18483,
                    24003,
                    23489,
                    24092,
                    12034
                  ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                lineTension: 0,
                backgroundColor: 'transparent',
                borderColor: '#007bff',
                borderWidth: 4,
                pointBackgroundColor: '#007bff',
                
            }
            
            
        ],
        
        

    })


    return (
        <div className="chart-parent mb-4 d-none d-md-block">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
             <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                This week
            </button>
            </div>
      </div>
            <Line data={chartData} options={{maintainAspectRatio : true} }></Line>
       </div>
    )
}
