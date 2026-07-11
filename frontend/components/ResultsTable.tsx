import { CRMRecord } from "@/types/crm";

interface ResultsTableProps {
  records: CRMRecord[];
}

export default function ResultsTable({
  records,
}: ResultsTableProps) {
  if (!records.length) return null;

  const columns = Object.keys(records[0]) as Array<
    keyof CRMRecord
  >;

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Imported CRM Records</h2>

          <p>
            CRM records successfully extracted by the AI.
          </p>
        </div>
      </div>

      <div className="table-container result-table">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
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
    </section>
  );
}
