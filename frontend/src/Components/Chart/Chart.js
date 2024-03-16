import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { getLastNDays, dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const { incomes, expenses } = useGlobalContext();

  // Get the last 30 days
  const last30Days = getLastNDays(30);

  // Initialize arrays for income and expenses for each day
  const incomeByDay = Array(30).fill(0);
  const expensesByDay = Array(30).fill(0);

  // Fill income and expenses arrays
  incomes.forEach((income) => {
    const index = last30Days.indexOf(dateFormat(income.date));
    if (index !== -1) {
      incomeByDay[index] += income.amount;
    }
  });

  expenses.forEach((expense) => {
    const index = last30Days.indexOf(dateFormat(expense.date));
    if (index !== -1) {
      expensesByDay[index] += expense.amount;
    }
  });

  const data = {
    labels: last30Days,
    datasets: [
      {
        label: 'Income',
        data: incomeByDay,
        backgroundColor: 'green',
        tension: 0.2,
      },
      {
        label: 'Expenses',
        data: expensesByDay,
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };


    return (
        <ChartStyled >
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart