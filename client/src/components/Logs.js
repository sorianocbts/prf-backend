import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios'
import { useFetch, Provider } from "use-http";
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import {
    SearchState,
    IntegratedFiltering,
    IntegratedSorting,
    SortingState,
    PagingState,
    IntegratedPaging,
    SelectionState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    SearchPanel,
    TableHeaderRow,
    TableColumnResizing,
    TableColumnVisibility,
    PagingPanel,
    TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import { Container, Input, Form, Row, Col, Button } from 'reactstrap';

import useForm from '../helpers/useForm'
import { queryDomain } from '../constants';

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
    const [defaultColumnWidths] = useState([
        { columnName: 'id', width: 180 },
        { columnName: 'studentLast', width: 250 },
        { columnName: 'studentFirst', width: 120 },
        { columnName: 'studentEmail', width: 240 },
        { columnName: 'proctorName', width: 180, },
        { columnName: 'proctorEmail', width: 240, },
        { columnName: 'classCodeSelected', width: 90, },
        { columnName: 'testNumberSelected', width: 90, },
        { columnName: 'confirmed', width: 90 },
        { columnName: 'dateConfirmed', width: 220 },
        { columnName: 'dateSubmitted', width: 220 },
    ]);
    const [pageSizes] = useState([25, 50, 75, 0]);
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
    const logIn = (e) => {
        e.preventDefault()
        user.user === process.env.REACT_APP_USERNAME && user.passcode === process.env.REACT_APP_PASSCODE ? setLogged(true) : setLogged(false)
    }

    useEffect(() => {
        // eslint-disable-next-line
    }, [user])
    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                logIn(event);
                return
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
        // eslint-disable-next-line
    }, []);
    const [selection, setSelection] = useState([]);
    console.log(selection)
    const _proctorConfirmation = () => {
        // Do it for the whole selection array. 
        for (let selected in selection) {
            console.log(selected)
            let ID = tranformData(data)[selected].id
            axios(`${queryDomain}/api/courses/confirm/${ID}`).then(x => {
                alert(x.data)
            })
        }
        setSelection([])
        return
    }
    useEffect(() => {
        // eslint-disable-next-line
    }, [user])
    return (
        <>
            {!logged && (<Container style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignSelf: "center", margin: '20px auto' }}>
                <Row>
                    <Col xs="3">
                        <Form onSubmit={(e) => logIn(e)}>
                            <Input type='text' placeholder={`Username`} name={`user`} value={user.user} onChange={handleChange} />
                            <Input type='password' placeholder={`Password`} name={`passcode`} value={user.passcode} onChange={handleChange} />
                            <Button block sm={`true`} onClick={(e) => logIn(e)}>Login</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>)}
            {logged && data.length > 0 && (
                <>
                    <Button block sm={`true`} onClick={() => setLogged(false)}>Logout</Button>
                    {selection.length > 0 && (<Button className={`mt-4`} sm={`true`} onClick={() => _proctorConfirmation()}>Confirm</Button>)}
                    <Paper>
                        <Grid rows={tranformData(data)} columns={columns}>
                            <SelectionState
                                selection={selection}
                                onSelectionChange={setSelection}
                            />
                            <PagingState
                                defaultCurrentPage={0}
                                defaultPageSize={25}
                            />
                            <SearchState defaultValue="" />
                            <IntegratedFiltering />
                            <SortingState
                                defaultSorting={[{ columnName: 'id', direction: 'desc' }]}
                            />
                            <IntegratedSorting />
                            <IntegratedPaging />
                            <Table />
                            <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                            <TableHeaderRow showSortingControls />

                            <TableSelection
                                selectByRowClick
                            />
                            <TableColumnVisibility
                                defaultHiddenColumnNames={defaultHiddenColumnNames}
                            />

                            <Toolbar />
                            <SearchPanel />
                            <PagingPanel
                                pageSizes={pageSizes}
                            />
                        </Grid>
                    </Paper>
                </>
            )}
        </>
    );
};


const Logs = () => {


    return (
        // <Provider url={`${process.env.REACT_APP_PROXY}`}>
        <Provider url={queryDomain}>
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