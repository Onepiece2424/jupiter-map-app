import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Maps from './Maps';

type GoogleMapsProps = {
  lat: number;
  lng: number;
};

const GoogleMaps = ({ lat, lng }: GoogleMapsProps) => {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY as string;
  const position = {
    lat: lat,
    lng: lng
  } as google.maps.LatLngLiteral;

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <Maps style={{ maxWidth: '800px', aspectRatio: '16 / 9', margin: '10px auto' }} center={position} />
    </Wrapper>
  )
}

export default GoogleMaps
