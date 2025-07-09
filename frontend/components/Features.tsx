import React, { useState } from 'react';

const FeaturesSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard(id);
    setTimeout(() => setActiveCard(null), 2000); // Animation lasts 2 seconds
  };

  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m0 0a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: "from-blue-500 to-white-500",
      title: "IP-Backed Funding",
      description: "Secure funding for your creative work by linking verifiable IP directly to transparent, on-chain lottery mechanisms."
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 1.343 3 3v5a3 3 0 11-6 0v-5c0-1.657 1.343-3 3-3z" />
        </svg>
      ),
      gradient: "from-blue-500 to-white-500",
      title: "On-Chain Proof of Ownership",
      description: "Register creative work hashes on-chain for immutable, censorship-resistant proof of authorship and originality."
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      gradient: "from-blue-500 to-white-500",
      title: "Fair, Transparent Lotteries",
      description: "Run fully transparent, decentralized lotteries powered by smart contracts with provable randomness for fair outcomes."
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 118 0 4 4 0 01-8 0zM21 15a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: "from-blue-500 to-white-500",
      title: "Creator-Owned DAOs",
      description: "Launch and manage creator DAOs for collective decision-making, funding allocation, and community governance."
    },
    {
      id: 5,
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm4 4h8v8H8V8z" />
        </svg>
      ),
      gradient: "from-blue-500 to-white-500",
      title: "Monetize Your Creativity",
      description: "Turn your intellectual property into active revenue streams through royalties, licensing, and DAO-powered earnings."
    },
    {
      id: 6,
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "from-blue-500 to-white-500",
      title: "Built on Open Protocols",
      description: "Leveraging Story for IP registration, Tomo Wallet for transactions, and EVM-compatible smart contracts for interoperability."
    }
  ];
  

  return (
    <div className="bg-gradient-to-br from-black-900 via-white-900 to-black-900 min-h-screen font-inter">
      <style>{`
        @keyframes border-glow {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
          50% { box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.3); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-border-glow {
          animation: border-glow 2s ease-in-out;
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear;
        }
      `}</style>
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
            Why Choose <span className="text-blue-200">CreatorFund DAO</span>?
          </h2>
          <p className="text-xl text-white/85 max-w-3xl mx-auto drop-shadow-md font-medium">
          The most advanced platform for creators to protect, fund, and monetize their intellectual property.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              onClick={() => handleCardClick(feature.id)}
              className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group cursor-pointer overflow-hidden ${
                activeCard === feature.id ? 'animate-pulse' : ''
              }`}
            >
              {activeCard === feature.id && (
                <div className="absolute inset-0 rounded-2xl">
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-white via-transparent to-white bg-clip-border animate-spin-slow opacity-80"></div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-border-glow"></div>
                </div>
              )}
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md tracking-tight relative z-10">{feature.title}</h3>
              <p className="text-white/85 drop-shadow-sm font-medium leading-relaxed relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;