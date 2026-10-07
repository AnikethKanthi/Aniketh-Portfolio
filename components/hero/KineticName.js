export default function KineticName({ name }) {
  const [first, ...rest] = name.split(' ');
  const last = rest.join(' ');

  return (
    <div className="kinetic-name" aria-label={name}>
      <span className="kinetic-name__line" aria-hidden="true">{first}</span>
      <span className="kinetic-name__line kinetic-name__line--last" aria-hidden="true">{last}</span>
    </div>
  );
}
