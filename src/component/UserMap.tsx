import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import type { User } from "../types/user";
import { InterestFilter } from "./InterestFilter";
import { useFilteredUsers } from "@/hooks/useFilteredUsers";
import { useState, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import inputLettersForSearching from "@/constants/inputLettersForSearching";

interface UserMapProps {
  users: User[];
}

function UserMap({ users }: UserMapProps) {
  const [filter, setFilter] = useState("");
  const filteredUsers = useFilteredUsers(users, filter);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (value: string) => {
    if (
      value !== filter &&
      (value.length === 0 || value.length >= inputLettersForSearching - 1)
    ) {
      startTransition(() => {
        setFilter(value);
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-full">
        <InterestFilter
          value={filter}
          onChange={handleFilterChange}
          resultCount={filteredUsers.length}
        />
        <div className="flex-1 min-h-0 relative">
          {isPending && (
            <div className="absolute inset-0 z-[1000] flex items-center justify-center rounded-2xl">
              <Spinner className="w-8 h-8" />
            </div>
          )}
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
              {filteredUsers.map((user) => (
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
        </div>
      </div>
    </>
  );
}

export default UserMap;
