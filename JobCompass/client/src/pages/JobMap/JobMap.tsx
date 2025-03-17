import {
  APIProvider,
  Map,
  Pin,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import MapJobCard from "./MapJobCard.tsx";
import { useParams, useNavigate } from "react-router-dom";

import "./JobMap.scss";

import JobCardType from "../../../types/JobCardType";
import { useState } from "react";

const JobMap = ({ jobs }: { jobs: JobCardType[] }) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // const { id } = useParams();
  const navigate = useNavigate();

  const handleMarkerClick = (jobUrl: string) => {
    setSelectedJobId(jobUrl);
    navigate(`/jobs/${jobUrl}`);
  };

  const calgaryBounds = {
    north: 51.3, // Northern boundary latitude
    south: 50.75, // Southern boundary latitude
    west: -114.5, // Western boundary longitude
    east: -113.65, // Eastern boundary longitude
  };

  return (
    <div className="map-container">
      <div className="map-layout">
        <div className="map-section">
          <APIProvider apiKey={apiKey}>
            <Map
              // style={{ width: "95vw", height: "100vh" }}
              defaultCenter={{ lat: 51.0447, lng: -114.0719 }}
              mapId={`6ca41446c199331d`}
              defaultZoom={10.8}
              // remove zoom in out
              disableDefaultUI={true}
              // remove satellide mode
              mapTypeControl={false}
              // how user can interact
              gestureHandling={"cooperative"}
              // + / - zoom buttons
              zoomControl={false}
              // Disable street view
              streetViewControl={false}
              fullscreenControl={false}
              //prevent user from zooming into other cities
              restriction={{
                latLngBounds: calgaryBounds,
                strictBounds: false,
              }}
              minZoom={8}
              maxZoom={17}
            >
              {/*Job Markers logic*/}
              {jobs.map((job) => (
                <AdvancedMarker
                  key={job.id}
                  position={{
                    lat: Number(job.latitude),
                    lng: Number(job.longitude),
                  }}
                  clickable={true}
                  onClick={() => {
                    handleMarkerClick(job.id);
                  }}
                >
                  <Pin
                    background={"#4285F4"}
                    borderColor={"#FFF"}
                    glyphColor={"#FFF"}
                  />
                  {/* Custom marker content */}
                  <div className="job-marker">
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>
        </div>

        {selectedJobId && (
          <div className="job-details-section">
            <MapJobCard
              jobId={selectedJobId}
              onClose={() => setSelectedJobId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMap;
