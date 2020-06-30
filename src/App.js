import React, { useEffect, useState } from 'react';

import './App.css';

import { GoogleChart } from './components/GoogleChart/GoogleChart';

function App() {
  const [urlSrc, setUrlSrc] = useState(null);

  let loadedIMG;

  useEffect(() => {
    setTimeout(() => {
      createPng();
    }, 1000);
  });

  const createPng = () => {
    let svgNode = document.querySelector('svg');
    if (svgNode) {
      let svgString = new XMLSerializer().serializeToString(svgNode);
      console.log(svgString);
      console.log('svgNode props: ', svgNode);
      let nodeWidth = svgNode.getAttribute('width');
      let nodeHeight = svgNode.getAttribute('height');
      console.log(nodeWidth);
      console.log(nodeHeight);

      // let canvas = document.getElementById('canvas');
      let canvas = document.createElement('canvas');
      canvas.setAttribute('width', nodeWidth);
      canvas.setAttribute('height', nodeHeight);

      let ctx = canvas.getContext('2d');
      let DOMURL = window.self.URL || window.self.webkitURL || window.self;
      let img = new Image();
      let svg = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8',
      });
      let url = DOMURL.createObjectURL(svg);
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        let png = canvas.toDataURL('image/png');
        loadedIMG = png;
        setUrlSrc(loadedIMG);
      };
      img.src = url;
    }
  };

  return (
    <div className='App'>
      <a href={urlSrc} download>
        <button className='download-button'>Click to download</button>
      </a>
      <GoogleChart />
    </div>
  );
}

export default App;
