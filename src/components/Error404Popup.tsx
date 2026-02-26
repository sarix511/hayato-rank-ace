const Error404Popup = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-card border-2 border-destructive rounded-xl p-8 max-w-md w-full text-center animate-[fadeInUp_0.5s_ease-out] shadow-[0_0_40px_rgba(255,0,0,0.3)]">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-5xl font-display font-black text-destructive mb-3 tracking-wider">
          404
        </h2>
        <p className="text-lg font-mono text-destructive/90 mb-4">
          PAGE NOT FOUND
        </p>
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-4">
          <p className="text-base font-display font-bold text-foreground mb-1">
            THIS PAGE DOESN'T EXIST
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            Status: HTTP 404 — Not Found
          </p>
        </div>
        <div className="bg-secondary border border-border rounded-lg p-4">
          <p className="text-sm font-body text-foreground">
            🔒 Please use <span className="text-primary font-bold">VPN</span> or try within <span className="text-primary font-bold">48 hours</span>
          </p>
          <p className="text-[10px] font-mono text-muted-foreground mt-2">
            The requested resource could not be located on this server
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error404Popup;
