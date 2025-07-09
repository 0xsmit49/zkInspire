import React from 'react';



const Header = ({ 

  
}) => {
    
  // Default navigation fallback
  const DefaultNavigation = () => (
    <nav className="hidden md:flex items-center space-x-6">
      <a href="#marketplace" className="text-white/70 hover:text-white transition-colors">Marketplace</a>
      <a href="#agents" className="text-white/70 hover:text-white transition-colors">AI Agents</a>
      <a href="#builder" className="text-white/70 hover:text-white transition-colors">Builder</a>
      <a href="#docs" className="text-white/70 hover:text-white transition-colors">Docs</a>
    </nav>
  );

  // Default wallet connect fallback
  const DefaultWallet = () => (
    <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
      Connect Wallet
    </button>
  );


  return (
    <header className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center space-x-4">
        <h1 className="text-5xl lg:text-6xl xl:text-5xl 2xl:text-5xl font-black leading-[1.1] tracking-tight text-blue-200"> 
        zkInspire
          </h1>
        </div>
      
       
      </div>
    </header>
  );
};

export default Header;