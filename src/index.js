import './assets/style/main.scss';

import {hello, consoleLog} from './components/module-a.js';
import $ from 'jquery';
import {rendering} from './components/module-b.js';

//import './src/assets/style/';
//download the image from the directory
import pngIcon from './assets/images/Chestnuts.png';
import pngMed from './assets/images/gucci.png';
import jpgImg from './assets/images/Sunflower.jpg';
import svgImg from './assets/images/123.svg';

document.getElementById("hello world").addEventListener('click', hello);
document.getElementById("console").addEventListener('click', consoleLog);

var pngHolderIcon = document.getElementById('home');
pngHolderIcon.src = pngIcon;

var pngHolderMed = document.getElementById('holder1');
pngHolderMed.src = pngMed;

var jpgHolder = document.getElementById('holder2');
jpgHolder.src = jpgImg;

var svgHolder = document.getElementById('holder3');
svgHolder.src = svgImg;
//jquery testing
$('#jquery').click( rendering);
