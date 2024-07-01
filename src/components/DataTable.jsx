

import { Table } from 'antd';

// eslint-disable-next-line react/prop-types
const DataTable = ({ data }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Services',
            dataIndex: 'services',
            key: 'services',
            render: (services) => services.join(', '),
        },
        {
            title: 'Budget',
            dataIndex: 'budget',
            key: 'budget',
        },
    ];

    return (
        <>
            <div className='flex flex-col justify-stretch flex-grow items-center my-12'>
                <div className='flex flex-col gap-4 justify-around  shadow-2xl w-2/4 rounded-xl p-10'>
                    <div>
                        <h1 className='text-2xl text-center font-bold'>Form Data </h1>
                        <p className='text-base text-center text-gray-400'>This Screen display submitted form data</p>
                        <Table dataSource={data} columns={columns} rowKey="email" />
                    </div>
                </div>
            </div>
        </>

    )
};

export default DataTable;
