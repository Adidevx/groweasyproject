import { CSVRecord } from "@/types/crm";

interface CsvPreviewProps {
  records: CSVRecord[];
}

export default function CsvPreview({
  records,
}: CsvPreviewProps) {
  if (!records.length) return null;

  const columns = Object.keys(records[0]);

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>CSV Preview</h2>

          <p>
            Review the uploaded data before starting AI
            processing.
          </p>
        </div>

        <span className="record-count">
          {records.length} records
        </span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {records.slice(0, 50).map((record, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column}>
                    {record[column] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {records.length > 50 && (
        <p className="preview-message">
          Showing first 50 of {records.length} records.
        </p>
      )}
    </section>
  );
}
