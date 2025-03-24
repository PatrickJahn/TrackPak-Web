import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FC, useEffect } from "react";
import useLocations from "@/hooks/useLocations";

// Default icon fix for Leaflet in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

type LocationPoint = {
  lat: number;
  lon: number;
  label?: string;
};

type OrderTrackingViewProps = {
  locations: LocationPoint[];
  id: string;
};

const FitBounds: FC<{ locations: LocationPoint[] }> = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map((loc) => [loc.lat + 0, loc.lon])
      );
      map.fitBounds(bounds);
    }
  }, [locations, map]);

  return null;
};

const OrderTrackingBox = ({ locations, id }: OrderTrackingViewProps) => {
  const hasLocations = locations.length > 0;

  const { useQuerySingle } = useLocations();

  const { data: location, error } = useQuerySingle(id);

  if (error || !location) {
    return (
      <div className="w-full   p-6  rounded min-h-44 bg-white space-y-6">
        <h1 className="text-xl font-semibold">Order Destination</h1>

        <p>Could not find location</p>
      </div>
    );
  }

  return (
    <div className="w-full   p-6  rounded min-h-44 bg-white space-y-6">
      <h1 className="text-xl font-semibold">Order Destination</h1>

      <div className="space-y-4">
        <div>
          <div className="text-sm">Address</div>
          <div className="text-md font-medium">
            {`${location?.addressLine}, ${location?.city}, ${location?.postalCode} ${location?.country}`}
          </div>
        </div>
      </div>

      {hasLocations ? (
        <div className="h-[40rem]  rounded overflow-hidden">
          <MapContainer
            center={[locations[0].lat, locations[0].lon]}
            zoom={2}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds
              locations={[
                {
                  lat: location?.geoLocation?.latitude ?? 0,
                  lon: location?.geoLocation?.longitude ?? 0,
                },
              ]}
            />

            {/* Draw polyline */}
            {/* <Polyline
              positions={locations.map((loc) => [loc.lat, loc.lon])}
              color="blue"
              weight={4}
              opacity={0.6}
            /> */}
            <Marker
              key={"idx"}
              position={[
                location?.geoLocation?.latitude ?? 0,
                location?.geoLocation?.longitude ?? 0,
              ]}
            ></Marker>
            {/* Add markers
            {locations.map((loc, idx) => (
              <Marker key={idx} position={[loc.lat, loc.lon]}>
                <Popup>
                  {loc.label ?? `Point ${idx + 1}`} <br />
                  Lat: {loc.lat}, Lon: {loc.lon}
                </Popup>
              </Marker>
            ))} */}
          </MapContainer>
        </div>
      ) : (
        <div className="text-muted-foreground">No tracking data available.</div>
      )}
    </div>
  );
};

export default OrderTrackingBox;
