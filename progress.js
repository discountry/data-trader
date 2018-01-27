const clui = require('clui');
const dir = require('node-dir');

const Gauge = clui.Gauge;

const allFiles = dir.files('./public/raw/', {sync:true});
const markedFiles = dir.files('./set/', {sync:true});

const all = allFiles ? allFiles.length : 1;
const marked = markedFiles ? markedFiles.length : 0;
const suffix = Math.ceil((marked / all)*100) + ' %';

console.log('Project Status:',Gauge(marked, all, 20, all * 0.8, suffix));