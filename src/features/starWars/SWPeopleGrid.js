import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    TableContainer, Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginTop: 3,
        overflowX: 'auto',
    },
    tableContainer: {
        minHeight: '370px',
    },
    table: {
        minWidth: 600,
    },
    tableHeader: {
        backgroundColor: '#f3f3f3',
    },
    tableRow: {
        cursor: 'pointer',
        '&:hover': {
            background: "#ddf1ff",
        },
    },
    headerDiv: {
        textAlign: 'left',
    },
    header: {
        margin: '5% auto 3% 1%',
    },
    loadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
    },
    loadingDivTableCell: {
        border: 'none'
    },
    primaryTableCell: {
        width: '60%',
    },
    secondaryTableCell: {
        width: '20%',
    },
});

export function SWPeopleGrid(props) {
    const classes = useStyles();
    const { peopleData, fetchPeopleData, fetchCharDetails, isGridLoading } = props;

    const handleChangePage = (event, pageNo) => {
        fetchPeopleData(pageNo);
    }

    const fetchCharacterDetails = (char) => {
        fetchCharDetails(char);
    }

    return (
        <div>
            <div className={classes.headerDiv}>
                <h5 className={classes.header}>Star Wars Characters</h5>
            </div>
            <Paper className={classes.root}>
                <TableContainer className={classes.tableContainer}>
                    <Table className={classes.table} size="small">
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell className={classes.primaryTableCell}>Name</TableCell>
                                <TableCell align="right" className={classes.secondaryTableCell}>Height (cm)</TableCell>
                                <TableCell align="right" className={classes.secondaryTableCell}>Mass (kg)</TableCell>
                            </TableRow>
                        </TableHead>
                        {!isGridLoading ? <TableBody>
                            {peopleData.results.map(char => (
                                <TableRow key={char.name} className={classes.tableRow} onClick={() => fetchCharacterDetails(char)}>
                                    <TableCell component="th" scope="row">
                                        {char.name}
                                    </TableCell>
                                    <TableCell align="right">{char.height === 'unknown' ? ' - ' : char.height}</TableCell>
                                    <TableCell align="right">{char.mass === 'unknown' ? ' - ' : char.mass}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> :
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={3} className={classes.loadingDivTableCell}>
                                        <div className={classes.loadingDiv}>
                                            <CircularProgress />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        }
                    </Table>

                </TableContainer>
                {peopleData.results.length ?
                    <TablePagination
                        component="div"
                        count={peopleData.count}
                        rowsPerPage={10}
                        rowsPerPageOptions={[]}
                        page={peopleData.pageNo}
                        nextIconButtonProps={{ disabled: !peopleData.next || isGridLoading }}
                        backIconButtonProps={{ disabled: !peopleData.previous || isGridLoading }}
                        onChangePage={handleChangePage}
                        labelDisplayedRows={() => {
                            return `Page ${peopleData.pageNo} of ${Math.ceil(peopleData.count / 10)}`;
                        }}
                    /> : null}
            </Paper>
        </div>
    );
}