import React from 'react'

// Material UI
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// End Material UI

export default function Copyright() {
    return (
        <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                HealthCity
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
        </Box>
      );
}
