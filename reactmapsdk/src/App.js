import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './App.css';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/MapImageLayer'], { css: true }).then(([Map, MapView, MapImageLayer]) => {
      const map = new Map({ basemap: 'streets' });
      const view = new MapView({
        container: mapRef.current,
        map: map,
        extent: {
          xmin: -79.05128, 
          ymin: -4.23163, 
          xmax: -66.93457, 
          ymax: 13.64006,
          spatialReference: {
            wkid: 4326
          }
        }
      });

      const layer = new MapImageLayer({
        url: 'https://hermes2.invias.gov.co/server/rest/services/MapaCarreteras/RedVial/FeatureServer'
      });

      map.add(layer);

      const handleHomeClick = () => {
        view.goTo({
          target: view.extent,
          duration: 1000
        });
      };

      const homeButton = document.createElement('button');
      homeButton.innerHTML = 'volver al inicial';
      homeButton.classList.add('esri-widget', 'esri-component');
      homeButton.addEventListener('click', handleHomeClick);

      view.ui.add(homeButton, 'top-left');
    });
  }, []);

  return <div style={{ width: '100%', height: '100vh' }} ref={mapRef} />;
};

export default MapComponent;


