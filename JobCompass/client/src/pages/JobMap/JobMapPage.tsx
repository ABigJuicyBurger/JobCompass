import { JSX } from "react";
import JobMap from "../../components/JobMap/JobMap";

import MapJobCardNoteType from "../../../types/MapJobCardType.ts";

function JobMapPage({
  noteState,
  updateNoteVisibility,
  jobs,
}: MapJobCardNoteType): JSX.Element {
  return (
    <>
      <JobMap
        noteState={noteState}
        updateNoteVisibility={updateNoteVisibility}
        jobs={jobs}
      />
    </>
  );
}

export default JobMapPage;
