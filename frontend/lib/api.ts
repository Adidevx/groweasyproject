import { CSVRecord, ImportResult } from "@/types/crm";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const importCSV = async (
  records: CSVRecord[]
): Promise<ImportResult> => {
  const response = await fetch(`${API_URL}/api/import`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      records,
    }),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message || "Failed to import CSV"
    );
  }

  return response.json();
};
