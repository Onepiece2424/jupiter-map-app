import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Maps from './Maps';

const GoogleMaps = () => {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY as string;
  const position = {
    lat: 43.035718552968376,
    lng: 141.46244422700855
  } as google.maps.LatLngLiteral;

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <Maps style={{ maxWidth: '800px', aspectRatio: '16 / 9', margin: '10px auto' }} center={position} />
    </Wrapper>
  )
}

export default GoogleMaps
