import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Averages() {
    const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext()
    const [twoWeekAverages, setTwoWeekAverages] = useState({
        income: 0,
        expense: 0,
        savings: 0,
    });

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    useEffect(() => {
        // Calculate two-week averages over the most recent 8 weeks
        const twoWeekIncome = calculateTwoWeekAverage(getDataForLastNWeeks(incomes, 2));
        const twoWeekExpense = calculateTwoWeekAverage(getDataForLastNWeeks(expenses, 2));
        const twoWeekSavings = twoWeekIncome - twoWeekExpense;

        setTwoWeekAverages({
            income: twoWeekIncome,
            expense: twoWeekExpense,
            savings: twoWeekSavings,
        });
    }, [incomes, expenses]);

    // Function to calculate two-week average
    const calculateTwoWeekAverage = (data) => {
        if (data.length === 0) return 0;

        const total = data.reduce((acc, curr) => acc + curr.amount, 0);
        const average = total / 2;
        return average * 2; // Multiply by 2 for two weeks
    };

    // Function to get data for the last N weeks
    const getDataForLastNWeeks = (data, weeks) => {
        const today = new Date();
        const lastNWeeks = new Date(today.getTime() - (weeks * 7 * 24 * 60 * 60 * 1000));

        return data.filter(item => new Date(item.date) >= lastNWeeks);
    };

    return (
        <AveragesStyled>
            <InnerLayout>
                <h1>Statistics</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                    </div>
                    <div className="amount-con">
                        <div className="income">
                            <p className="salary-title">2 Week Avg Income</p>
                            <div className="salary-item">
                                <p>{dollar} {twoWeekAverages.income.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="expense">
                            <p className="salary-title">2 Week Avg Expense</p>
                            <div className="salary-item">
                                <p>{dollar} {twoWeekAverages.expense.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="balance">
                            <p className="salary-title">2 Week Avg Savings</p>
                            <div className="salary-item">
                                <p>{dollar} {twoWeekAverages.savings.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </AveragesStyled>
    )
}

const AveragesStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 2;
            height: 400px;
        }
        .amount-con{
            grid-column: 2 / 3;
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 2rem;
            .income, .expense, .balance{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1rem;
                p{
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 0;
                }
            }
        }
    }
`;

export default Averages;
