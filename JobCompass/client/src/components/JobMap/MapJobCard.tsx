import JobCard from "../../components/JobCard/JobCard";
import MapJobCardNoteType from "../../../types/MapJobCardType";

const MapJobCard = ({
  noteState,
  updateNoteVisibility,
  jobId,
  onClose,
}: MapJobCardNoteType) => {
  return (
    <div className="map-job-card">
      <JobCard
        noteState={noteState}
        updateNoteVisibility={updateNoteVisibility}
        jobId={jobId}
        onClose={onClose}
      />
    </div>
  );
};

export default MapJobCard;
