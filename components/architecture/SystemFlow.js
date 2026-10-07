const flow = [
  ['01', 'INPUT', 'A request, event, or question enters the system.'],
  ['02', 'TRANSFORM', 'Services shape work into a useful operation.'],
  ['03', 'PERSIST', 'State remains available for the next decision.'],
  ['04', 'DELIVER', 'Automation makes change repeatable.'],
  ['05', 'OBSERVE', 'Signals expose latency, failures, and outcomes.']
];

export default function SystemFlow() {
  return (
    <div className="system-flow">
      {flow.map(([number, label, description]) => (
        <div className="system-flow__item" key={label}>
          <span>{number}</span>
          <strong>{label}</strong>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}
