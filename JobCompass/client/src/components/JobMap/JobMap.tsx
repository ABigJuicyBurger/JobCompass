import {
  APIProvider,
  Map,
  Pin,
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useMap,
  // InfoWindow, maybe needed for custom marker styling
} from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {MyMarker} from "./MyMarker.tsx";

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
  const [currentZoom, setCurrentZoom] = useState<number>(10.8); // Default zoom level

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

  // Function to handle zoom changes
  const handleZoomChanged = (zoom: number) => {
    setCurrentZoom(zoom);
  };

  // Calculate which markers should show text based on zoom and density
  const jobsWithVisibility = useMemo(() => {
    if (!jobs) return [];
 
    // If few jobs, we can show more of them with text
    const jobCount = jobs.length;
    const lowDensity = jobCount < 10;
    const mediumDensity = jobCount >= 10 && jobCount < 30;
    
    // At high zoom levels (>13), show all markers with text
    // At medium zoom (11-13), show some markers with text based on criteria
    // At low zoom (<11), show mini markers only
    
    return jobs.map(job => {
      // Calculate if this marker should show text based on zoom level and density
      let showText = false;
      
      if (currentZoom >= 13) {
        // Zoomed in enough to show all markers with text
        showText = true;
      } else if (currentZoom >= 11 && currentZoom < 13) {
        if (lowDensity) {
          // If there are few markers, show them all with text
          showText = true;
        } else if (mediumDensity) {
          // For medium density, only show text for markers with certain properties
          // For example, show text for markers with higher salaries
          const salaryValue = parseInt(job.salary_range.replace(/[^0-9]/g, ''));
          showText = salaryValue > 100000; // Show text for high-paying jobs
        }
        // For high density at medium zoom, keep most as mini markers
      }
      
      // Always show text for hovered markers
      if (hoveredJobId === job.id) {
        showText = true;
      }
      
      return { ...job, showText };
    });
  }, [jobs, currentZoom, hoveredJobId]);

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
              onZoomChanged={(e) => handleZoomChanged(e.detail.zoom)}
            >
              {/*Job Markers logic*/}
              {jobsWithVisibility &&
                jobsWithVisibility.map((job) => {
                  const salary_range = formatSalary(job.salary_range);

                  return (
                    <MyMarker
                      key={job.id}
                      job={job}
                      handleMarkerClick={handleMarkerClick}
                      setHoveredJobId={setHoveredJobId}
                      hoveredJobId={hoveredJobId}
                      salary_range={salary_range}
                      miniMarker={!job.showText}
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
