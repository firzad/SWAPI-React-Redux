import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
        marginBottom: '1em',
        overflowX: 'auto',
        minHeight: '100px',
        textAlign: 'left'
    },
    details: {
        fontSize: '14px',
        padding: '15px 15px',
        minHeight: '170px',
    },
    headerDiv: {
        textAlign: 'left',
    },
    header: {
        margin: '5% auto 1% 1%',
    },
    detailLabel: {
        fontWeight: 'bold',
        fontSize: '14px'
    },
    filmList: {
        marginTop: '5px'
    },
    loadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
    },
    capitalizeDiv: {
        textTransform: 'capitalize'
    }
});

export function SWCharacterDetails(props) {
    const classes = useStyles();
    const { charDetails, isCharDetailsLoading } = props;

    const listMovies = charDetails.filmList.map((x, idx) => {
        return <li key={idx}> {x} </li>
    });

    return (
        <div>
            <div className={classes.headerDiv}>
                <h6 className={classes.header}>Character Details</h6>
            </div>
            <Paper className={classes.root}>
                {!isCharDetailsLoading ?
                    <div className={classes.details}>
                        <div>
                            <Typography className={classes.detailLabel} component="span">Name: </Typography>
                            {charDetails.name}
                        </div>
                        <div>
                            <Typography className={classes.detailLabel} component="span">Birth Year: </Typography>
                            {charDetails.birthYear}
                        </div>
                        <div className={classes.capitalizeDiv}>
                            <Typography className={classes.detailLabel} component="span">Gender: </Typography>
                            {charDetails.gender}
                        </div>
                        <div>
                            <Typography className={classes.detailLabel} component="span">List of Films: </Typography>
                            <ul className={classes.filmList}>
                                {listMovies}
                            </ul>
                        </div>
                    </div>

                    :

                    <div className={classes.loadingDiv}>
                        <CircularProgress />
                    </div>}

            </Paper>
        </div>
    );
}