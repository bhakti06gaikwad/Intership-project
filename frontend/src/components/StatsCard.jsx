function StatsCard({ title, value }) {
  return (
    <div className="stats-card">

      <h1>{value}</h1>

      <p>{title}</p>

    </div>
  );
}

export default StatsCard;
