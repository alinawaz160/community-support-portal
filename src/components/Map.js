// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

// const Map = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap {...props} defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}/>
// ));

// export default Map;

import React from "react";

const Map = () => {
  return (
    <iframe
      title="map"
      width="100%"
      height="200"
      frameBorder="0"
      style={{ border: 0 }}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.2731434817874!2d74.32376071519845!3d31.489175155832278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905fa216bbbb1%3A0x60c26259d0e6495a!2sBank%20square%20Market%20Modal%20Town!5e0!3m2!1sen!2s!4v1610690802988!5m2!1sen!2s"
      allowFullScreen
    />
  );
};

export default Map;
