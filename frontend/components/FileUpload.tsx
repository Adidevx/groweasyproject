"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileSpreadsheet } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export default function FileUpload({
  onFileSelect,
  selectedFile,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    onFileSelect(file);
  };

  return (
    <div
      className={`upload-box ${
        isDragging ? "upload-box-active" : ""
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();

        setIsDragging(false);

        handleFile(event.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        hidden
        onChange={(event) =>
          handleFile(event.target.files?.[0])
        }
      />

      {selectedFile ? (
        <>
          <FileSpreadsheet size={45} />

          <h3>{selectedFile.name}</h3>

          <p>
            {(selectedFile.size / 1024).toFixed(2)} KB
          </p>

          <button
            onClick={() => inputRef.current?.click()}
            className="secondary-button"
          >
            Choose another file
          </button>
        </>
      ) : (
        <>
          <UploadCloud size={50} />

          <h3>Upload your CSV file</h3>

          <p>
            Drag and drop your CSV here, or select a file
            from your computer.
          </p>

          <button
            onClick={() => inputRef.current?.click()}
            className="primary-button"
          >
            Browse Files
          </button>
        </>
      )}
    </div>
  );
}
