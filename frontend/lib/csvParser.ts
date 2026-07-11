import Papa from "papaparse";
import { CSVRecord } from "@/types/crm";

export const parseCSV = (file: File): Promise<CSVRecord[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRecord>(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        if (results.errors.length > 0) {
          reject(
            new Error(results.errors[0].message)
          );
          return;
        }

        resolve(results.data);
      },

      error: (error) => {
        reject(error);
      },
    });
  });
};
