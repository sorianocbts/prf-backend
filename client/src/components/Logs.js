import React, { useState, useEffect, Suspense } from 'react';
import { useFetch, Provider } from "use-http";
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import {
    SearchState,
    IntegratedFiltering,
    IntegratedSorting,
    SortingState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
    TableColumnVisibility
} from '@devexpress/dx-react-grid-material-ui';
import { Container, Input, Form, Row, Col, Button } from 'reactstrap';

import useForm from '../helpers/useForm'

const WithSuspense = () => {
    const [user, handleChange] = useForm({
        user: "",
        passcode: ""
    });
    const [logged, setLogged] = useState(false)
    const [columns] = useState([
        { name: 'id', title: 'ID' },
        { name: 'studentLast', title: 'Last name' },
        { name: 'studentFirst', title: 'First name' },
        { name: 'studentEmail', title: 'Student Email' },
        { name: 'proctorName', title: 'ProctorName' },
        { name: 'proctorEmail', title: 'Proctor Email' },
        { name: 'classCodeSelected', title: 'Class' },
        { name: 'testNumberSelected', title: 'Test/Quiz' },
        { name: 'confirmed', title: 'Confirmed' },
        { name: 'dateConfirmed', title: 'Status' },
        { name: 'dateSubmitted', title: 'Date' },
    ]);
    const [defaultHiddenColumnNames] = useState(["id"]);
    // const [defaultColumnWidths] = useState([
    //     { columnName: 'id', width: 180 },
    //     { columnName: 'studentFirst', width: 180 },
    //     { columnName: 'Last name', width: 120 },
    //     { columnName: 'First name', width: 90 },
    //     { columnName: 'ProctorName', width: 90, },
    //     { columnName: 'Proctor Email', width: 220, },
    //     { columnName: 'Class', width: 90, },
    //     { columnName: 'Test/Quiz', width: 90, },
    //     { columnName: 'Confirmed', width: 90 },
    //     { columnName: 'Status', width: 180 },
    // ]);
    const tranformData = (data) => {
        return data.map(x => Object.assign({
            id: x._id,
            dateSubmitted: x.dateSubmitted,
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
    const logIn = () => {
        user.user === process.env.REACT_APP_USERNAME && user.passcode === process.env.REACT_APP_PASSCODE ? setLogged(true) : setLogged(false)
    }
    useEffect(() => {
        // eslint-disable-next-line
    }, [user])
    return (
        <>
            {!logged && (<Container style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignSelf: "center", margin: '20px auto' }}>
                <Row>
                    <Col xs="3">
                        <Form>
                            <Input type='text' placeholder={`Username`} name={`user`} value={user.user} onChange={handleChange} />
                            <Input type='password' placeholder={`Password`} name={`passcode`} value={user.passcode} onChange={handleChange} />
                            <Button block sm={`true`} onClick={() => logIn()}>Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>)}
            {logged && data.length > 0 && (
                <>
                    <Button block sm={`true`} onClick={() => setLogged(false)}>Logout</Button>
                    <Paper>
                        <Grid rows={tranformData(data)} columns={columns}>
                            <SearchState defaultValue="" />
                            <IntegratedFiltering />
                            <SortingState
                                defaultSorting={[{ columnName: 'id', direction: 'desc' }]}
                            />
                            <IntegratedSorting />
                            <Table />
                            <TableHeaderRow showSortingControls />
                            <TableColumnVisibility
                                defaultHiddenColumnNames={defaultHiddenColumnNames}
                            />

                            <Toolbar />
                            <SearchPanel />
                        </Grid>
                    </Paper>
                </>
            )}
        </>
    );
};


const Logs = () => {


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

    );
};

export default withRouter(Logs)