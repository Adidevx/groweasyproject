"use client";

import { useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";

import FileUpload from "@/components/FileUpload";
import CsvPreview from "@/components/CsvPreview";
import ImportProgress from "@/components/ImportProgress";
import StatsCards from "@/components/StatsCards";
import ResultsTable from "@/components/ResultsTable";

import { parseCSV } from "@/lib/csvParser";
import { importCSV } from "@/lib/api";

import {
  CSVRecord,
  ImportResult,
} from "@/types/crm";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const [records, setRecords] = useState<CSVRecord[]>([]);

  const [result, setResult] =
    useState<ImportResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleFileSelect = async (
    selectedFile: File
  ) => {
    try {
      setError("");
      setResult(null);

      const parsedRecords = await parseCSV(selectedFile);

      if (!parsedRecords.length) {
        throw new Error("The CSV file contains no records.");
      }

      setFile(selectedFile);
      setRecords(parsedRecords);
    } catch (error) {
      setFile(null);
      setRecords([]);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to parse CSV"
      );
    }
  };

  const handleConfirmImport = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await importCSV(records);

      setResult(response);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Import failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setRecords([]);
    setResult(null);
    setError("");
  };

  return (
    <main>
      <header className="navbar">
        <div className="logo">
          Grow<span>Easy</span>
        </div>

        <div className="ai-badge">
          <Sparkles size={16} />

          AI CSV Importer
        </div>
      </header>

      <div className="page-container">
        <section className="hero">
          <div className="hero-badge">
            <Sparkles size={16} />

            AI Powered Data Mapping
          </div>

          <h1>
            Import any CSV into your CRM
          </h1>

          <p>
            Upload leads from any platform. Our AI
            intelligently identifies, maps and transforms
            your data into GrowEasy CRM records.
          </p>
        </section>

        {!result && (
          <section className="card">
            <div className="step-label">
              STEP 1
            </div>

            <h2>Upload CSV</h2>

            <p className="section-description">
              Upload a valid CSV file to preview your lead
              data.
            </p>

            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={file}
            />
          </section>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {records.length > 0 && !result && (
          <>
            <CsvPreview records={records} />

            {!loading && (
              <div className="confirm-section">
                <button
                  className="confirm-button"
                  onClick={handleConfirmImport}
                >
                  <Sparkles size={18} />

                  Confirm & Process with AI
                </button>

                <button
                  className="reset-button"
                  onClick={handleReset}
                >
                  <RotateCcw size={18} />

                  Reset
                </button>
              </div>
            )}
          </>
        )}

        {loading && <ImportProgress />}

        {result && (
          <>
            <StatsCards
              imported={result.totalImported}
              skipped={result.totalSkipped}
            />

            <ResultsTable
              records={result.records}
            />

            <div className="confirm-section">
              <button
                className="primary-button"
                onClick={handleReset}
              >
                Import Another CSV
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
