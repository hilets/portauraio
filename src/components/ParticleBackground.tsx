const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(200,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(200,255,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
    </div>
  );
};

export default ParticleBackground;
