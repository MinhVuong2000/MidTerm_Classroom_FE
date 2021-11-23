import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';




export default function Detail() {
    return (
        <div>
            <h1> About Page</h1>
            <Link to="/">Home Page </Link>
        </div>
    )
}
