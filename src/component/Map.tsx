import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./map.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

function Map() {
  const users: {
    id: number;
    name: string;
    interests: string[];
    position: [number, number];
  }[] = [
    {
      id: 1,
      name: "John Doe",
      interests: ["music", "art", "nature"],
      position: [49.8397, 24.0297],
    },
    {
      id: 2,
      name: "Jane Smith",
      interests: ["sports", "travel", "food"],
      position: [52.2297, 21.0122],
    },
    {
      id: 3,
      name: "Jack Johnson",
      interests: ["technology", "gaming", "outdoors"],
      position: [51.5074, -0.0901],
    },
  ];
  return (
    <>
      <MapContainer
        className="markercluster-map"
        center={[51.0, 19.0]}
        zoom={4}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
          {users.map((user) => (
            <Marker key={user.id} position={user.position}>
              <Popup>
                <strong>{user.name}</strong>
                <br />
                <em>Interests:</em>
                <ul>
                  {user.interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}

export default Map;
