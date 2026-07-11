interface StatsCardsProps {
  imported: number;
  skipped: number;
}

export default function StatsCards({
  imported,
  skipped,
}: StatsCardsProps) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span>Total Processed</span>

        <strong>{imported + skipped}</strong>
      </div>

      <div className="stat-card success-stat">
        <span>Successfully Imported</span>

        <strong>{imported}</strong>
      </div>

      <div className="stat-card error-stat">
        <span>Skipped Records</span>

        <strong>{skipped}</strong>
      </div>
    </div>
  );
}
