import React, { useEffect, useReducer, useState } from 'react'
import { CiCalendar } from "react-icons/ci";
import { PieChart } from 'react-minimal-pie-chart';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
import WorkspaceHeader from '../Workspace/WorkspaceHeader'
import { getFormBotAnalyticDataAPI } from './api';
import Loader from '../Common/Loader/Loader'
import useTheme from '../../hooks/useTheme';

import './Analytics.scss'

const Analytics = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({});
    const [tableHeader, setTableHeader] = useState([])
    const [theme] = useTheme();
    const params = useParams();
    const navigate = useNavigate();

    const isLightMode = theme === "light";
    const formId = params.formId;


    const fetchBotData = async () => {
        let res;

        setIsLoading(true)
        try {
            res = await getFormBotAnalyticDataAPI(formId);
            if (res.data.sts == 1 && res.data.data.formBotStrucure && res.data.data.formBotData && Object.keys(res.data.data.formBotData).length) {
                const formBotStructureList = res.data.data.formBotStrucure
                const formBot = res.data.data.formBotData;
                const submittedCount = formBot.formBotData.filter(({elements}) => elements.length == formBotStructureList.length)?.length || 1;

                setData({...formBot, submittedCount});
                setTableHeader(formBotStructureList)
            }
        } catch (error) {
            toast.error(res.data.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBotData();
    }, [])

    return (
        <div className={`analytics-container ${isLightMode ? 'light-mode-theme' : ''}`} >
            <WorkspaceHeader updateFormName={(name) => setFormName(name)} hideOptions={true} activeTab='response' handleClickOnFlow={() => navigate(-1)} />
            {data && Object.keys(data).length ? (
                <div>
                    <div className='view-start-container' >
                        <div className={isLightMode ? 'light-mode-grey-bg-clr' : ''} >
                            <div>Views</div>
                            <div>{data.viewCount}</div>
                        </div>
                        <div  className={isLightMode ? 'light-mode-grey-bg-clr' : ''}  >
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
                                        fill: isLightMode ? 'black' : "white",
                                        fontSize: "5px"
                                    }
                                }
                                data={[
                                    { title: `${((+data.submittedCount)/(+data.viewCount)*100).toFixed(2)}% completed`, value: +data?.submittedCount, color: '#3B82F6' },
                                    { title: '', value: +data?.viewCount, value: +data?.viewCount - (+data?.submittedCount),color: '#909090' }
                                ]}
                                lineWidth='20'
                                startAngle={-80}
                                labelPosition={70}
                            />
                        </div>
                        <div className={`complete-rate  ${isLightMode ? 'light-mode-grey-bg-clr' : ''} `} >
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
            {isLoading && <Loader theme={theme} />}
        </div>
    )
}

export default Analytics