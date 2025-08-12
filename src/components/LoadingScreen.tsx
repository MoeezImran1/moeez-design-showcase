import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="flex justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-primary rounded-full animate-loading-dot-1"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-loading-dot-2"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-loading-dot-3"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-text-muted mt-4 text-sm">
          Loading portfolio...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;