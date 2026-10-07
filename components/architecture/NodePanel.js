export default function NodePanel({ node }) {
  return (
    <aside className="node-panel" aria-live="polite">
      <p className="eyebrow">NODE / {node.label}</p>
      <h3>{node.detail}</h3>
      <dl>
        <div><dt>SUPPORTED BY</dt><dd>{node.evidence}</dd></div>
        <div><dt>READ AS</dt><dd>One boundary in a larger system.</dd></div>
      </dl>
    </aside>
  );
}
