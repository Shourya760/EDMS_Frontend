const StatCard = ({ title, value, note }) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>

      <p className="mt-2 text-3xl font-bold text-slate-950">
        {value}
      </p>

      {note && <p className="mt-3 text-sm text-slate-500">{note}</p>}
    </div>
  );
};

export default StatCard;
