'use client';

export const architectureNodes = [
  { id: 'request', label: 'REQUEST', detail: 'The incoming transaction, event, question, or user action.', evidence: 'REST, WebSockets, React' },
  { id: 'service', label: 'SERVICE', detail: 'A focused unit that turns a request into useful work.', evidence: 'Java, Python, Go, C#, Node.js, .NET' },
  { id: 'cache', label: 'CACHE', detail: 'A short path for repeated reads and lower latency.', evidence: 'Redis, CloudFront' },
  { id: 'data', label: 'DATA', detail: 'Durable state for transactions, documents, and analytics.', evidence: 'PostgreSQL, Cloud SQL, DynamoDB, MongoDB' },
  { id: 'delivery', label: 'DELIVERY', detail: 'Repeatable movement from change to running infrastructure.', evidence: 'GitHub Actions, Terraform, Docker, GKE, Cloud Run' },
  { id: 'signal', label: 'SIGNAL', detail: 'A measurable outcome that makes reliability visible.', evidence: 'Logging, metrics, tracing, testing, anomaly detection' }
];

const route = 'M167 120 H500 H833 V360 H500 H167';

export default function TopologyGraph({ selected, onSelect }) {
  const active = architectureNodes.find((node) => node.id === selected) || architectureNodes[0];

  return (
    <div className="topology-graph" aria-label="Conceptual system architecture">
      <div className="topology-graph__caption">
        <span>LIVE REQUEST PATH</span>
        <small>SELECT A STAGE TO INSPECT IT</small>
      </div>
      <div className="flow-visual" data-active={selected}>
        <svg viewBox="0 0 1000 480" aria-hidden="true" preserveAspectRatio="none">
          <path className="flow-visual__trace" d={route} />
          <path className="flow-visual__signal" d={route} />
          {[0, 1, 2].map((packet) => (
            <circle className="flow-visual__packet" key={packet} r="6">
              <animateMotion dur="7s" begin={`${packet * -2.33}s`} path={route} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
        <div className="flow-visual__status" aria-hidden="true">
          <span>ACTIVE STAGE</span>
          <strong>{active.label}</strong>
        </div>
        {architectureNodes.map((node, index) => (
          <button
            className={`flow-node flow-node--${node.id}${selected === node.id ? ' is-selected' : ''}`}
            key={node.id}
            type="button"
            aria-pressed={selected === node.id}
            aria-label={`${node.label}. ${node.detail}`}
            data-cursor="INSPECT"
            data-cursor-label="STAGE"
            onClick={() => onSelect(node.id)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <i aria-hidden="true" />
            <strong>{node.label}</strong>
          </button>
        ))}
      </div>
    </div>
  );
}
