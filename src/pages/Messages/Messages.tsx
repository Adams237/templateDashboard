import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useGetAllMessagesQuery } from '../../utils/feature/messages/messageApi';
import Table from '../../utils/Table';
import { format } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import { Eye, Loader, Search } from 'lucide-react';
import Modal from '../../components/Modal/Modal';
import { MessageResponse } from '../../utils/feature/messages/type';
import { formatDateAgo } from '../../utils/feature/utils';

function Messages() {
    const { t, i18n } = useTranslation()
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState<MessageResponse>()
    const [page, setPage] = useState(1)
    const limit = 10
    const { data: messages, isLoading, error, isFetching } = useGetAllMessagesQuery({ page, limit })



    const filteredMessage = messages?.data.filter(message => {

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return (
                message.firstName.toLowerCase().includes(searchLower) ||
                message.lastName.toLowerCase().includes(searchLower) ||
                message.phone.toLowerCase().includes(searchLower) ||
                message.subject.toLowerCase().includes(searchLower) ||
                message.email.toLowerCase().includes(searchLower)
            );
        }

        return true;
    });

    if (isLoading) return <div className='flex items-center justify-center h-[50vh] w-[70vw]' ><Loader className='w-52 h-52 text-green-500 animate-spin' /></div>
    if (error) {
        console.log(error)
        return <div className='flex items-center justify-center text-red-500 font-bold text-xl'>{t("load_error")}</div>
    }
    return (
        <div className="w-full space-y-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-grow max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder={t("message.search_placeholder")}
                        className="pl-10 block h-9 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* <div className="flex items-center gap-4">

                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-gray-500" />
                        <select
                            className="block rounded-md h-9 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">{t("microfinace.all")}</option>
                            <option value="ACTIVE">{t("microfinace.actifs")}</option>
                            <option value="INACTIVE">{t("microfinace.inactif")}</option>
                        </select>
                    </div>

                    <Button
                        variant="primary"
                        onClick={() => navigate("/new-microfinance")}
                        icon={<Newspaper size={16} />}
                    >
                        {t("microfinace.new_micro")}
                    </Button>
                </div> */}
            </div>
            <div className='w-[78vw] overflow-x-auto' >
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeadCell>{t("message.name")}</Table.HeadCell>
                            <Table.HeadCell>{t("message.phone")}</Table.HeadCell>
                            <Table.HeadCell>{t("message.email")}</Table.HeadCell>
                            <Table.HeadCell>{t("message.subject")}</Table.HeadCell>
                            <Table.HeadCell>{t("message.company")}</Table.HeadCell>
                            <Table.HeadCell>{t("message.date_send")}</Table.HeadCell>
                            <Table.HeadCell>{t("message.action")}</Table.HeadCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {
                            filteredMessage?.map((message) => {
                                const date = format(new Date(), 'EEEE d MMMM yyyy', { locale: i18n.language === 'fr' ? fr : enUS });
                                return (
                                    <Table.Row key={message.contact_id}>
                                        <Table.Cell> <div>{message.firstName} {message.lastName} </div> </Table.Cell>
                                        <Table.Cell> <div>{message.phone}</div> </Table.Cell>
                                        <Table.Cell> <div>{message.email}</div> </Table.Cell>
                                        <Table.Cell> <div>{message.subject}</div> </Table.Cell>
                                        <Table.Cell> <div>{message.company}</div> </Table.Cell>
                                        <Table.Cell> <div>{date}</div> </Table.Cell>
                                        <Table.Cell> <div onClick={() => {
                                            setMessage(message)
                                            setIsOpen(true)
                                        }} ><Eye className='text-green-500' /></div> </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1 || isFetching}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        ‹ {t("preavu")}
                    </button>

                    <span>
                        Page {messages?.meta.page} sur {messages?.meta.total_pages}
                        {isFetching && ' …'}
                    </span>

                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, messages?.meta.total_pages ?? 1))}
                        disabled={page === (messages?.meta.total_pages ?? 1) || isFetching}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        {t("next")} ›
                    </button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={message?.subject}>
                <div> {t("message.from")} : <span className='font-bold' >{message?.email}</span> </div>
                <div>{message?.message}</div>
                <div className='flex items-end justify-end mt-5'>
                    { message && formatDateAgo(new Date(message?.created_at ?? ""),{locale:i18n.language})}
                </div>
            </Modal>
        </div>
    )
}

export default Messages
