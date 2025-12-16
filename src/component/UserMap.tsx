import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import type { User } from "../types/user";

interface UserMapProps {
  users: User[];
}

export function UserMap({ users }: UserMapProps) {
  return (
    <MapContainer
      className="markercluster-map rounded-2xl shadow-lg overflow-hidden"
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
  );
}
