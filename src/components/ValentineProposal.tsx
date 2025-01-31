import { useState, useRef, useEffect } from "react";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ValentineProposal = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  const handleNoButtonHover = () => {
    if (!noButtonRef.current) return;

    const newX = Math.random() * (window.innerWidth - noButtonRef.current.offsetWidth);
    const newY = Math.random() * (window.innerHeight - noButtonRef.current.offsetHeight);

    setNoButtonPosition({
      x: Math.min(Math.max(0, newX), window.innerWidth - noButtonRef.current.offsetWidth),
      y: Math.min(Math.max(0, newY), window.innerHeight - noButtonRef.current.offsetHeight),
    });
  };

  const handleYesClick = () => {
    setShowCelebration(true);
    toast({
      title: "Yay! Happy Valentine's Day!",
      description: "Thank you for saying yes! ❤️",
      duration: 5000,
    });
  };

  useEffect(() => {
    if (showCelebration) {
      const timeout = setTimeout(() => setShowCelebration(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [showCelebration]);

  return (
    <div className="min-h-screen bg-valentine-primary flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="max-w-2xl w-full bg-white rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-opacity-90 relative z-10">
        <div className="text-sm uppercase tracking-wider text-valentine-accent mb-2 animate-float">
          Important Question
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-valentine-text mb-8 animate-float">
          Will You Be My Valentine?
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={handleYesClick}
            className={`px-8 py-3 bg-valentine-secondary text-white rounded-full font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              showCelebration ? "animate-celebrate" : ""
            }`}
          >
            Yes! <Heart className="inline ml-2" size={20} />
          </button>
          
          <button
            ref={noButtonRef}
            onMouseEnter={handleNoButtonHover}
            onClick={handleNoButtonHover}
            style={{
              position: noButtonPosition.x !== 0 ? "fixed" : "relative",
              left: noButtonPosition.x,
              top: noButtonPosition.y,
              transition: "all 0.3s ease-out",
            }}
            className="px-8 py-3 bg-gray-200 text-gray-600 rounded-full font-semibold hover:bg-gray-300"
          >
            No
          </button>
        </div>
      </div>

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-valentine-accent opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-valentine-secondary opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  );
};

export default ValentineProposal;