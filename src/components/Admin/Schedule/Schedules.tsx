import React, { useState, useEffect, useContext } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { FiCheckSquare, FiMenu } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import useFetcher from 'components/hooks/useSwr';
import Modal from '../Helpers/Modals/Modal/Modal';
import Table from '../Helpers/Table/Table';

import { SchedulesWrapper, ScheduleList, ScheduleButton, ScheduleForm } from './SchedulesStyles';
import { AdminContext } from 'context/adminContext';

const Schedule: React.FC = () => {
    const [itemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateMinValue, setDateMinValue] = useState('');
    const [dateMaxValue, setDateMaxValue] = useState('');

    const [searchFilter, setSearchFilter] = useState([]);
    const [alertPopup, setAlertPopup] = useState(false);
    const [alertConfirm, setAlertConfirm] = useState(false);
    const [alertBody, setAlertBody] = useState('');
    const [campaignsArr, setCampainsArr] = useState<number[]>([]);

    const [activeModalSchedule, setActiveModalSchedule] = useState(false);

    const schedules = [
        {
            id: 1,
            dateValue: '1 dia',
            segment: 'Marketing',
            campaign: 'Campanha de teste'
        }
    ]

    const { token, user } = useContext(AdminContext);

    const { data: campaigns } = useFetcher('/campaign/listAll', {
        user: user.id,
        token,
    });

    const { data: segments } = useFetcher('/segment/listAll', {
        user: user.id,
        token,
    });

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValue = event.target.value;

        if (selectValue === 'create') {

        }

        if (selectValue === 'deleteMany') {

        }
    };

    const handleAddCamps = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueInDate = new Date(e.target.value)
        const incrementDay = valueInDate.setDate(valueInDate.getDate() + 1)

        const value = e.target.value !== 'Invalid Date' && incrementDay;
        setCampainsArr(camp => Array.from(new Set([...camp, value])));
    };

    const formatDateString = (date: number) => (
        new Date(date).toLocaleDateString('zh-Hans-CN').replace('/', '-')
    )

    // Define limits to schedules
    useEffect(() => {
        const dateToday = Date.now()
        const formatDate = formatDateString(dateToday)
        const incrementDate = new Date(new Date(formatDate).setDate(30))
            .toLocaleDateString('zh-Hans-CN').replace('/', '-')

        setDateMinValue(formatDate.replace('/', '-'))
        setDateMaxValue(incrementDate.replace('/', '-'))
    }, [])

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentSchedules =
        searchFilter?.length >= 1
            ? searchFilter?.slice(indexOfFirstPost, indexOfLastPost)
            : schedules?.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNum: number) => setCurrentPage(pageNum);
    const nextPage = () => setCurrentPage(currentPage => currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage => (currentPage === 1 ? 1 : currentPage - 1));

    return (
        <>
            <SchedulesWrapper>
                <div className="content-top">
                    <div>
                        <h1>Minhas agendas</h1>
                        <p>Acompanhe e gerencie suas agendas cadastradas</p>
                    </div>
                    <div className="filters-wrapper">
                        <div className="select-item">
                            <select onChange={handleSelect} value="default">
                                <option value="default" disabled>
                                    Ações
                                </option>
                                <option value="create">Cadastrar agenda</option>
                                {/* <option value="deleteMany">Excluir em massa</option> */}
                            </select>
                            <BsChevronDown />
                        </div>
                    </div>
                </div>
                {schedules?.length >= 1 ? (
                    <Table
                        itemsTotalPerPage={itemsPerPage}
                        totalItems={schedules.length}
                        paginate={paginate}
                        nextPage={nextPage}
                        prevPage={prevPage}
                        currentPage={currentPage}>
                        <table className="widgetLgTable">
                            <tr className="widgetLgTr">
                                <th className="widgetLgTh">Frequência</th>
                                <th className="widgetLgTh">Lista</th>
                                <th className="widgetLgTh">Campanha</th>
                                {/* <th className="widgetLgTh">Criado</th> */}
                                <th className="widgetLgTh">Status</th>
                                <th className="widgetLgTh">Editar</th>
                            </tr>
                            {currentSchedules.map((schedule) => (
                                <tr key={schedule.id} className="widgetLgTr">
                                    <td className="widgetLgUser">
                                        <span className="widgetLgName">{schedule.dateValue}</span>
                                    </td>
                                    <td className="widgetLgDate">{schedule.segment}</td>
                                    {/* <td className="widgetLgAmount">{campaign.segments.length}</td> */}
                                    <td className="widgetLgAmount">{schedule.campaign}</td>
                                    <td
                                        onClick={() => { }}
                                        className={`widgetLgStatus ${schedule.status === 'ACTIVE' ? 'active' : 'disabled'
                                            }`}>
                                        {schedule.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                                    </td>
                                    <td className="widgetLgMenu">
                                        <FiMenu />
                                        <div className="modal-actions">
                                            <span onClick={() => { }}>
                                                Excluir agenda
                                            </span>
                                            <span
                                                onClick={() => { }}>
                                                Editar agenda
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </Table>
                ) : (
                    <div className="without-leads-msg">
                        <h1>Você ainda não possuí nenhuma campanha cadastrado</h1>
                        <strong onClick={() => { }}>
                            Cadastrar campanha
                        </strong>
                    </div>
                )}
                <ScheduleButton
                    onClick={() => setActiveModalSchedule(state => !state)}>
                    {activeModalSchedule ? <RiCloseFill /> : <FiCheckSquare />}
                </ScheduleButton>
            </SchedulesWrapper>
            {activeModalSchedule && (
                <Modal
                    animation={{
                        initial: {
                            opacity: 0,
                        },
                        animate: {
                            opacity: 1,
                            transition: { type: 'spring' },
                        },
                        exit: {
                            opacity: 0,
                            transition: { duration: 0.6 },
                        },
                    }}>
                    <ScheduleForm>
                        <h1>Cadastre uma agenda</h1>
                        <div className="form-wrapper">
                            <form onSubmit={() => { }}>
                                <label>Frenquência</label>
                                <input type="date" min={dateMinValue} max={dateMaxValue} onChange={handleAddCamps} />

                                <div className="dates-list">
                                    {campaignsArr.map(item => (
                                        <span key={item}>{new Date(item).toLocaleDateString()}</span>
                                    ))}
                                </div>

                                <label>Lista</label>
                                <select onChange={e => { }}>
                                    <option value="DEFAULT" disabled>Escolha uma lista</option>
                                    {segments.map(segment => (
                                        <option key={segment.id} value="">{segment.title}</option>
                                    ))}
                                </select>
                                <label>Campanha</label>
                                <select onChange={e => { }} defaultValue="DEFAULT">
                                    <option value="DEFAULT" disabled>Escolha uma campanha</option>
                                    {campaigns.map(campaign => (
                                        <option key={campaign.id} value="">{campaign.name}</option>
                                    ))}
                                </select>
                                <button type="submit">Criar agenda</button>
                            </form>
                        </div>
                    </ScheduleForm>
                </Modal>
            )}
        </>
    );
}

export default Schedule;