import React, { useEffect, useState } from 'react';

import './App.css';

import { GoogleChart } from './components/GoogleChart/GoogleChart';

function App() {
  const [urlSrc, setUrlSrc] = useState(null);

  let loadedIMG;

  useEffect(() => {
    setTimeout(() => {
      createPng();
    }, 500);
  });

  const createPng = () => {
    let svgNode = document.querySelector('svg');
    if (svgNode) {
      let svgString = new XMLSerializer().serializeToString(svgNode);
      console.log(svgString);

      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
      let DOMURL = window.self.URL || window.self.webkitURL || window.self;
      let img = new Image();
      let svg = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8',
      });
      let url = DOMURL.createObjectURL(svg);
      img.onload = function () {
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
      <GoogleChart />

      <canvas
        id='canvas'
        width='800'
        height='400'
        style={{ display: 'none' }}
      ></canvas>

      <a href={urlSrc} download>
        <button className='download-button'>Click to download</button>
      </a>
    </div>
  );
}

export default App;
