export default function ProjectDemo({ slug }) {
  if (slug === 'scalable-url-shortener') {
    return (
      <div className="project-demo project-demo--redirects" data-cursor="VIEW" data-cursor-label="FLOW">
        <span className="project-demo__eyebrow">REDIRECT / 302</span>
        <div className="redirect-flow" aria-hidden="true">
          <i>URL</i><b /><i>LAMBDA</i><b /><i>DDB</i><b /><i>EDGE</i>
        </div>
        <div className="redirect-chart"><span /><span /><span /><span /><span /><span /><span /></div>
        <small>regional click signal</small>
      </div>
    );
  }

  if (slug === 'collaboration-platform') {
    return (
      <div className="project-demo project-demo--collaboration" data-cursor="VIEW" data-cursor-label="SYNC">
        <span className="project-demo__eyebrow">LIVE DOCUMENT / 03 CLIENTS</span>
        <div className="collaboration-board" aria-hidden="true">
          <div className="collaboration-copy"><span /><span /><span /><span /></div>
          <div className="collaboration-cursor collaboration-cursor--one" />
          <div className="collaboration-cursor collaboration-cursor--two" />
          <div className="collaboration-cursor collaboration-cursor--three" />
        </div>
        <small>persistent state / low-latency sync</small>
      </div>
    );
  }

  return (
    <div className="project-demo project-demo--insight" data-cursor="VIEW" data-cursor-label="QUERY">
      <span className="project-demo__eyebrow">QUESTION / VALIDATED SQL</span>
      <div className="insight-flow" aria-hidden="true">
        <div><span>How did conversion move?</span></div>
        <b>→</b>
        <div><span>SELECT · GROUP BY · CHECK</span></div>
        <b>→</b>
        <div><span>INSIGHT / WAREHOUSE</span></div>
      </div>
      <small>natural language to trusted query</small>
    </div>
  );
}
