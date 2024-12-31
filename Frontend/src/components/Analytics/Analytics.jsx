import React, { useEffect, useReducer, useState } from 'react'
import { CiCalendar } from "react-icons/ci";
import { PieChart } from 'react-minimal-pie-chart';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
import WorkspaceHeader from '../Workspace/WorkspaceHeader'
import { getFormBotAnalyticDataAPI } from './api';
import Loader from '../Common/Loader/Loader'

import './Analytics.scss'
import useTheme from '../../hooks/useTheme';
import { formatDate } from '../../constant';

const Analytics = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({});
    const [tableHeader, setTableHeader] = useState([])
    const [theme] = useTheme();
    const isLightMode = theme === "light";
    const navigate = useNavigate();
    const params = useParams();
    const formId = params.formId;


    const fetchBotData = async () => {
        let res;

        try {
            res = await getFormBotAnalyticDataAPI(formId);
            if (res.data.sts == 1 && res.data.data.formBotStrucure && res.data.data.formBotData && Object.keys(res.data.data.formBotData).length) {
                const formBotStructureList = res.data.data.formBotStrucure
                const formBot = res.data.data.formBotData;
                const submittedCount = formBot.formBotData.filter(({elements}) => elements.length == formBotStructureList)?.length || 1;

                setData({...formBot, submittedCount});
                setTableHeader(formBotStructureList)
            }
        } catch (error) {
            console.log("🚀 ~ fetchBotData ~ error:", error)
            toast.error(res.data.message || 'Something went wrong')
        }
    }

    useEffect(() => {
        fetchBotData();
    }, [])

    return (
        <div className='analytics-container' >
            <WorkspaceHeader updateFormName={(name) => setFormName(name)} hideOptions={true} activeTab='response' handleClickOnFlow={() => navigate(-1)} />
            {data && Object.keys(data).length ? (
                <div>
                    <div className='view-start-container' >
                        <div>
                            <div>Views</div>
                            <div>{data.viewCount}</div>
                        </div>
                        <div>
                            <div>Starts</div>
                            <div>{data.startCount}</div>
                        </div>
                    </div>

                    <div className='table-container' >
                        <table cellspacing='0' >
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><CiCalendar style={{ fontSize: '18px' }} /> Submitted at</th>
                                    {tableHeader.map(({ title }) => (
                                        <th>{title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.formBotData.map(({ elements, submittedAt }, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{moment?.unix(submittedAt / 1000)?.format('MMM DD, hh:mm A')}</td>
                                            {(elements.length == tableHeader.length ? elements : [...elements, ...new Array(tableHeader.length - elements.length).fill({})]).map(({ value }) => (
                                                <td>{value}</td>
                                            ))}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className='pie-chart-container' >
                        <div className='pie-chart' >
                            <PieChart
                                label={({ dataEntry }) => dataEntry.title}
                                labelStyle={
                                    {
                                        fill: "white",
                                        fontSize: "5px",
                                        fontFamily: "Helvetica Neue,sans-serif",
                                        textShadow: "1px 1px 5px #000"
                                    }
                                }
                                data={[
                                    { title: `${((+data.submittedCount)/(+data.viewCount)*100).toFixed(2)}% completed`, value: +data?.submittedCount, color: '#E38627' },
                                    { title: '', value: +data?.viewCount, color: '#C13C37' }
                                ]}
                                lineWidth='20'
                            />
                        </div>
                        <div className='complete-rate' >
                            <div>Completion Rate</div>
                            <div>{((+data.submittedCount)/(+data.viewCount)*100).toFixed(2)}%</div>
                        </div>
                    </div>
                </div>) : <div className='no-response' >No Response yet collected</div>}
            <ToastContainer position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnHover={false}
                theme={isLightMode ? 'light' : 'dark'}
            />
            {isLoading && <Loader />}
        </div>
    )
}

export default Analytics