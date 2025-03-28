import {
  APIProvider,
  Map,
  Pin,
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  // InfoWindow, maybe needed for custom marker styling
} from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MapJobCard from "./MapJobCard.tsx";
import "./JobMap.scss";

import MapJobCardNoteType from "../../../types/MapJobCardType.ts";
import { formatSalary } from "./formatSalary.tsx";
import JobCardType from "../../../types/JobCardType.ts";

const JobMap = ({
  updateNoteVisibility,
  jobs,
  noteState,
}: MapJobCardNoteType) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  // TODO: Show salary on hover (originally show title and company on load)
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null);

  const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const navigate = useNavigate();

  const handleMarkerClick = (jobUrl: string) => {
    setSelectedJobId(jobUrl);
    navigate(`/jobs/${jobUrl}`);
  };

  useEffect(() => {
    console.log("Hovered job id", hoveredJobId);
  }, [hoveredJobId]);

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
              draggableCursor={"default"}
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
              {jobs &&
                jobs.map((job) => {
                  const salary_range = formatSalary(job.salary_range);

                  return (
                    <MyMarker
                      job={job}
                      handleMarkerClick={handleMarkerClick}
                      setHoveredJobId={setHoveredJobId}
                      hoveredJobId={hoveredJobId}
                      salary_range={salary_range}
                    />
                  );
                })}
            </Map>
          </APIProvider>
        </div>

        {selectedJobId && (
          <div className="job-details-section">
            <MapJobCard
              updateNoteVisibility={updateNoteVisibility}
              jobId={selectedJobId}
              onClose={() => setSelectedJobId(null)}
              noteState={noteState}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default JobMap;

function MyMarker({ job, handleMarkerClick, setHoveredJobId, hoveredJobId, salary_range }: {
  job: JobCardType;
  handleMarkerClick: (jobId: string) => void;
  setHoveredJobId: (jobId: string | null) => void;
  hoveredJobId: string | null;
  salary_range: string;
}) {
  return <AdvancedMarker
  anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
  key={job.id}
  position={{
    lat: Number(job.latitude),
    lng: Number(job.longitude),
  }}
  // render some jobs and some clusters through preprocessing
  // too many jobs ? cluster : job
  clickable={true}
  onClick={() => {
    handleMarkerClick(job.id);
  }}
  onMouseEnter={() => {
    setHoveredJobId(job.id);
    console.log(hoveredJobId);
  }}
  onMouseLeave={() => setHoveredJobId(null)}
  className="info-window "
>
  <div
    className={`info-window-anchor ${
      hoveredJobId === job.id ? "hovered" : ""
    }`}
  >
    <div className="info-window-anchor__marker">
      <span>{salary_range}</span>
    </div>
    {hoveredJobId && hoveredJobId === job.id ? (
      <div className="info-window-anchor hovered--text">
        <p>{job.title}</p>
        <p>{job.company}</p>
      </div>
    ) : (
      ""
    )}
  </div>
  {/* <Pin
  background={"#FFF"}
  borderColor={"#3535350"}
  glyphColor={"#000000"}
/> */}
  {/* Custom marker content */}
  {/* <InfoWindow
position={{
  lat: Number(job.latitude),
  lng: Number(job.longitude),
}}
className="info-window"
> */}

  {/* </InfoWindow> */}
</AdvancedMarker>
}