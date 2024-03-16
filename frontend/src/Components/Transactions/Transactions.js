import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import TransactionHistory from '../../History/TransactionHistory';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Transactions() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="history-con">
                        <TransactionHistory />
                    </div>
                </div>
            </InnerLayout>
        </TransactionsStyled>
    )
}

const TransactionsStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        .history-con{
            grid-column: 6 / 1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Transactions


/*

<TransactionsStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                    </div>
                    <div className="history-con">
                        <History />
                    </div>
                </div>
            </InnerLayout>
        </TransactionsStyled>

*/