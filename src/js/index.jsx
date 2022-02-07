import React from 'react';
import { render } from 'react-dom';
import '../css/style.css';
import '../css/style.less';
import '../css/style.scss';
import pocket_logo from '../assets/pocket-svg.svg';
import Post from './post';
import './babel.js';

const post = new Post('CodePocket', pocket_logo);

console.log('data:', post.toString());

const App = () => (
    <div className="text-center">
        <h1>CodePocket</h1>
        <div className="logo"></div>
        <div className="scssBlock">scssBlock</div>
    </div>
)

render(<App/>, document.getElementById('app'));