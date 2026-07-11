import { LoaderCircle } from "lucide-react";

export default function ImportProgress() {
  return (
    <div className="processing-card">
      <LoaderCircle
        className="spinner"
        size={40}
      />

      <div>
        <h3>AI is processing your leads</h3>

        <p>
          Identifying columns, extracting CRM fields and
          validating records...
        </p>
      </div>
    </div>
  );
}
