import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapViewer({ spot }) {
  return (
    <MapContainer
      center={[spot.latitude, spot.longitude]}
      zoom={12}
      className="w-full h-full rounded-xl shadow-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      <Marker position={[spot.latitude, spot.longitude]}>
        <Popup>
          <b>{spot.name}</b><br />
          {spot.city}<br />
          {spot.shortDescription}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
