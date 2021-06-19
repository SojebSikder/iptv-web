import React from 'react'
// Material ui
import { CircularProgress, Container, CssBaseline } from '@material-ui/core';

export default function LoadingBar() {
    return (
        <Container component="main" maxWidth="xs">
        <br />
        <CssBaseline />
            <CircularProgress />
        </Container>
    )
}
