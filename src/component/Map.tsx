import "./map.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useUsers } from "../hooks/useUsers";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import UserMap from "./UserMap";

function Map() {
  const { users, loading, error, refetch } = useUsers();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return <UserMap users={users} />;
}

export default Map;
