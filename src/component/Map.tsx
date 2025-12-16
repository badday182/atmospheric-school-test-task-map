import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./map.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useUsers } from "../hooks/useUsers";

function Map() {
  const { users, loading, error, refetch } = useUsers();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
        }}
      >
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "red",
        }}
      >
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={refetch}>Try again</button>
      </div>
    );
  }

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
