import React, { useState, useEffect, useContext } from 'react';
import * as Yup from 'yup'
import { BsChevronDown } from 'react-icons/bs';
import { FiCheckSquare, FiMenu } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import useFetcher from 'components/hooks/useSwr';
import Modal from '../Helpers/Modals/Modal/Modal';
import Table from '../Helpers/Table/Table';

import { SchedulesWrapper, ScheduleList, ScheduleButton, ScheduleForm } from './SchedulesStyles';
import { AdminContext } from 'context/adminContext';
import { getAPIClient } from 'services/api';
import { scheduleValidation } from '../validations/schedule';
import { refreshData } from '../utils/refreshData';
import ModalAlert from '../Helpers/Modals/ModalAlert/ModalAlert';

interface ScheduleDataProps {
    dates: number[]
}

const Schedule: React.FC = () => {
    const [itemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateMinValue, setDateMinValue] = useState('');
    const [dateMaxValue, setDateMaxValue] = useState('');

    const [searchFilter, setSearchFilter] = useState([]);
    const [alertPopup, setAlertPopup] = useState(false);
    const [alertConfirm, setAlertConfirm] = useState(false);
    const [alertBody, setAlertBody] = useState('');
    const [datesList, setDatesList] = useState<number[]>([]);

    const [segmentValue, setSegment] = useState('');
    const [campaignValue, setCampaign] = useState('');
    const [scheduleData, setScheduleData] = useState<ScheduleDataProps>({} as ScheduleDataProps);

    const [activeModalSchedule, setActiveModalSchedule] = useState(false);
    const [activeModalScheduleEdit, setActiveModalScheduleEdit] = useState(false);

    const { token, user } = useContext(AdminContext);

    const { data: campaigns } = useFetcher('/campaign/listAll', {
        user: user.id, token,
    });

    const { data: segments } = useFetcher('/segment/listAll', {
        user: user.id, token,
    });

    const { data: schedules } = useFetcher('/schedule/listAll', {
        user: user.id, token,
    });

    const handleScheduleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const defaultSegment = segments.find(title => title === 'Default')

            const data = {
                dates: datesList.map(date => String(date)),
                segmentId: Number(segmentValue) ? Number(segmentValue) : defaultSegment.id,
                campaignId: Number(campaignValue)
            };

            console.log(defaultSegment)
            await scheduleValidation.validate(data, {
                abortEarly: false,
            });

            getAPIClient()
                .post(`/schedule/create`, data, {
                    headers: {
                        userid: user.id,
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    setSegment('')
                    setCampaign('')
                    setDatesList([])
                    setAlertBody('Agenda criada com sucesso');
                    setAlertPopup(true);
                    refreshData();
                    setActiveModalSchedule(false)

                    setTimeout(() => {
                        setAlertPopup(false);
                    }, 2000);
                })
                .catch(err => {
                    setAlertBody(
                        'Erro ao criar agenda, tente novamente mais tarde.',
                    );
                    setAlertPopup(true);

                    setTimeout(() => {
                        setAlertPopup(false);
                    }, 2000);
                });
        } catch (err) {
            let errors: any = [];
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error: Yup.ValidationError) => {
                    errors = [error.path, error.message];
                });
            }
            console.log(errors)
            // setError({
            //     name: errors[0] === 'name' ? errors[1] : '',
            //     senderId: errors[0] === 'senderId' ? errors[1] : '',
            //     segmentId: errors[0] === 'segmentId' ? errors[1] : '',
            //     subject: errors[0] === 'subject' ? errors[1] : '',
            //     content: errors[0] === 'content' ? errors[1] : '',
            // });
        }
    }

    const handleChangeStatus = async (schedule: number, status: string) => {
        const scheduleStatus = status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';

        getAPIClient()
            .put(
                `/schedule/update/${schedule}`,
                {
                    status: scheduleStatus,
                },
                {
                    headers: {
                        userid: user.id,
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(() => {
                setAlertBody('Status atualizado com sucesso');
                setAlertPopup(true);

                setTimeout(() => {
                    setAlertPopup(false);
                }, 2000);
            })
            .catch(() => {
                setAlertBody('Erro ao atualizar status, tente novamente mais tarde');
                setAlertPopup(true);

                setTimeout(() => {
                    setAlertPopup(false);
                }, 2000);
            });
    };

    const handleDeleteSchedule = async (schedule: number) => {
        getAPIClient()
            .delete(`/schedule/delete/${schedule}`, {
                headers: {
                    userid: user.id,
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setAlertBody('Agenda deletada com sucesso');
                setAlertPopup(true);

                setTimeout(() => {
                    setAlertPopup(false);
                }, 2000);
            })
            .catch(() => {
                setAlertBody('Erro ao deletar agenda, tente novamente mais tarde');
                setAlertPopup(true);

                setTimeout(() => {
                    setAlertPopup(false);
                }, 2000);
            });
    };

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValue = event.target.value;

        if (selectValue === 'create') {

        }

        if (selectValue === 'deleteMany') {

        }
    };

    const handleAddCamps = (event: React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            const valueInDate = new Date(event.target.value)
            const incrementDay = valueInDate.setDate(valueInDate.getDate() + 1)
            const compareDates = valueInDate.getDate() >= (new Date(dateMinValue).getDate() + 1)

            if (compareDates) {
                const value = event.target.value !== 'Invalid Date' && incrementDay;
                setDatesList(camp => Array.from(new Set([...camp, value])));
            }
        }
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

    return (
        <>
            <SchedulesWrapper>
                <div className="content-top">
                    <div>
                        <h1>Minhas agendas</h1>
                        <p>Acompanhe e gerencie suas agendas cadastradas</p>
                    </div>
                </div>
                {schedules?.length >= 1 ? (
                    <Table
                        itemsTotalPerPage={itemsPerPage}
                        totalItems={schedules.length}
                        paginate={paginate}>
                        <table className="widgetLgTable">
                            <tr className="widgetLgTr">
                                <th className="widgetLgTh">Agendados</th>
                                <th className="widgetLgTh">ID da lista</th>
                                <th className="widgetLgTh">ID da campanha</th>
                                {/* <th className="widgetLgTh">Criado</th> */}
                                <th className="widgetLgTh">Status</th>
                                <th className="widgetLgTh">Editar</th>
                            </tr>
                            {currentSchedules.map((schedule) => (
                                <tr key={schedule.id} className="widgetLgTr">
                                    <td className="widgetLgUser">
                                        <span className="widgetLgName">{schedule.dates.length}</span>
                                    </td>
                                    <td className="widgetLgDate">{schedule.segmentId}</td>
                                    {/* <td className="widgetLgAmount">{campaign.segments.length}</td> */}
                                    <td className="widgetLgAmount">{schedule.campaignId}</td>
                                    <td
                                        onClick={() =>
                                            handleChangeStatus(
                                                schedule.id as number,
                                                schedule.status as string,
                                            )
                                        }
                                        className={`widgetLgStatus ${schedule.status === 'ACTIVE' ? 'active' : 'disabled'
                                            }`}>
                                        {schedule.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                                    </td>
                                    <td className="widgetLgMenu">
                                        <FiMenu />
                                        <div className="modal-actions">
                                            <span onClick={() => handleDeleteSchedule(schedule.id)}>
                                                Excluir agenda
                                            </span>
                                            <span
                                                onClick={() => {
                                                    setScheduleData(schedule);
                                                    setActiveModalScheduleEdit(true);
                                                }}>
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
                        <strong onClick={() => setActiveModalSchedule(true)}>
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
                        <h1 className="modal-title">Cadastre uma agenda</h1>
                        <div className="form-wrapper">
                            <form onSubmit={handleScheduleSubmit}>
                                <label>Frenquência</label>
                                <input type="date" min={dateMinValue} max={dateMaxValue} onKeyPress={handleAddCamps} />

                                <div className="dates-list">
                                    {datesList.map(item => (
                                        <span onClick={() => setDatesList(datesList.filter(date => date !== item))} key={item}>{new Date(item).toLocaleDateString()}</span>
                                    ))}
                                </div>

                                <label>Lista</label>
                                <select onChange={e => setSegment(e.target.value)} defaultValue="DEFAULT">
                                    <option value="DEFAULT" disabled>Escolha uma lista</option>
                                    {segments.map(segment => (
                                        <option key={segment.id} value={segment.id}>{segment.title}</option>
                                    ))}
                                </select>
                                <label>Campanha</label>
                                <select onChange={e => setCampaign(e.target.value)} defaultValue="DEFAULT">
                                    <option value="DEFAULT" disabled>Escolha uma campanha</option>
                                    {campaigns.map(campaign => (
                                        <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                                    ))}
                                </select>
                                <button type="submit">Criar agenda</button>
                            </form>
                        </div>
                    </ScheduleForm>
                </Modal>
            )}
            {activeModalScheduleEdit && (
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
                        <h1 className="modal-title">Editar uma agenda</h1>
                        {console.log(scheduleData)}
                        <div className="form-wrapper">
                            <form onSubmit={handleScheduleSubmit}>
                                <label>Frenquência</label>
                                <input type="date" min={dateMinValue} max={dateMaxValue} onKeyPress={handleAddCamps} />

                                <div className="dates-list">
                                    {scheduleData.dates.map(item => (
                                        <span onClick={() => setDatesList(datesList.filter(date => date !== item))} key={item}>{new Date(Number(item)).toLocaleDateString()}</span>
                                    ))}
                                </div>

                                <label>Lista</label>
                                <select onChange={e => setSegment(e.target.value)} defaultValue="DEFAULT">
                                    <option value="DEFAULT" disabled>Escolha uma lista</option>
                                    {segments.map(segment => (
                                        <option key={segment.id} value={segment.id}>{segment.title}</option>
                                    ))}
                                </select>
                                <label>Campanha</label>
                                <select onChange={e => setCampaign(e.target.value)} defaultValue="DEFAULT">
                                    <option value="DEFAULT" disabled>Escolha uma campanha</option>
                                    {campaigns.map(campaign => (
                                        <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                                    ))}
                                </select>
                                <button type="submit">Criar agenda</button>
                            </form>
                        </div>
                    </ScheduleForm>
                </Modal>
            )}
            {alertPopup && (
                <ModalAlert>
                    <h3>{alertBody}</h3>
                </ModalAlert>
            )}
        </>
    );
}

export default Schedule;