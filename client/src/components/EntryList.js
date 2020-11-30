import React, { useEffect, Suspense } from 'react';
import { useFetch, Provider } from "use-http";
import { withRouter } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid';



const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'studentLast', headerName: 'Last name', width: 120 },
    { field: 'studentFirst', headerName: 'First name', width: 90 },
    { field: 'proctorName', headerName: 'ProctorName', width: 90, },
    { field: 'proctorEmail', headerName: 'Proctor Email', width: 220, },
    { field: 'classCodeSelected', headerName: 'Class', width: 90, },
    { field: 'testNumberSelected', headerName: 'Test/Quiz', width: 90, },
    { field: 'confirmed', headerName: 'Confirmed', width: 90 },
    {
        field: 'dateConfirmed',
        headerName: 'Status',
        description: 'Has the proctor confirmed?',
        width: 180
    },
];

const WithSuspense = () => {
    const tranformData = (data) => {
        return data.map(x => Object.assign({
            id: x._id,
            dateConfirmed: x.dateConfirmed,
            studentFirst: x.formSubmitted.submission.studentFirst,
            studentLast: x.formSubmitted.submission.studentLast,
            studentEmail: x.formSubmitted.submission.studentEmail,
            proctorName: x.formSubmitted.submission.proctorName,
            proctorEmail: x.formSubmitted.submission.proctorEmail,
            classCodeSelected: x.formSubmitted.submission.classCodeSelected,
            testNumberSelected: x.formSubmitted.submission.testNumberSelected,
        }, x))
    }
    const { get, data } = useFetch({ data: [] });

    const loadData = async () => get(`/api/courses/confirm/`);
    useEffect(() => {
        loadData()
        // eslint-disable-next-line
    }, [])
    return (
        <>

            {data.length > 0 && (
                <>
                    <DataGrid rows={tranformData(data)} columns={columns} pageSize={30} checkboxSelection />
                </>
            )}
        </>
    );
};

const EntryList = () => {
    return (
        <Provider url={`${process.env.REACT_APP_PROXY}`}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center !important', alignContent: 'center !important' }}>
                <div style={{ height: '800px', width: '100%' }}>
                    <Suspense fallback='Loading...'>
                        <WithSuspense />
                    </Suspense>
                </div>
            </div>
        </Provider>
    )
}

export default withRouter(EntryList)