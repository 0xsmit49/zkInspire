import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Star, Users, Shield, Zap, Heart, Globe, Eye } from 'lucide-react';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState(new Set([1])); // First item open by default

  const toggleFAQ = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      id: 1,
      icon: <Shield className="w-5 h-5" />,
      category: "Getting Started",
      question: "How do I participate in a CreatorFUND DAO lottery?",
      answer: "Getting started is simple! Connect your wallet, verify your identity through Civic, and browse active lotteries. Choose your numbers or use quick pick, then confirm your transaction. Your ticket is immediately recorded on-chain for complete transparency."
    },
    {
      id: 2,
      icon: <Eye className="w-5 h-5" />,
      category: "Transparency",
      question: "How can I verify the lottery is fair and transparent?",
      answer: "Every lottery uses ChainLink VRF for provably fair randomness. All smart contracts are audited and open-source. You can verify winner selection, fund distribution, and every transaction on the blockchain. No hidden algorithms, no manipulation - just pure, verifiable fairness."
    },
    {
      id: 3,
      icon: <Zap className="w-5 h-5" />,
      category: "Payouts",
      question: "How quickly do winners receive their prizes?",
      answer: "Winners receive funds instantly through automated smart contracts. No delays, no intermediaries, no bureaucracy. The moment the lottery ends and winners are determined, payouts are automatically distributed to your wallet."
    },
    {
      id: 4,
      icon: <Heart className="w-5 h-5" />,
      category: "Social Impact",
      question: "How does CreatorFUND DAO support social causes?",
      answer: "Every lottery automatically allocates a portion of proceeds to verified NGOs and community projects. You can vote on which causes to support through our DAO governance system. We've already distributed over $5.8M to meaningful social initiatives."
    },
    {
      id: 5,
      icon: <Users className="w-5 h-5" />,
      category: "DAO Governance",
      question: "How does the DAO governance system work?",
      answer: "Token holders can propose and vote on fund allocation, new features, and supported causes. One verified person, one vote ensures democratic decision-making. The community controls the treasury and platform direction through transparent, on-chain governance."
    },
    {
      id: 6,
      icon: <Globe className="w-5 h-5" />,
      category: "Access",
      question: "Can I participate from anywhere in the world?",
      answer: "Yes! CreatorFUND DAO is globally accessible with Civic-verified identity verification. Our system is secure, privacy-preserving, and fraud-resistant. Simply verify your identity once and participate in lotteries from anywhere, anytime."
    }
  ];

  const categories = [...new Set(faqData.map(item => item.category))];

  return (
    <section className="bg-black min-h-screen container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Frequently Asked <span className="bg-gradient-to-r from-blue-400 via-white-500 to-blue-600 bg-clip-text text-transparent">Questions</span>
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Everything you need to know about the world's first transparent, decentralized lottery platform
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category, index) => (
          <div
            key={category}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm font-medium hover:bg-white/20 transition-all duration-300 cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
          >
            <button
              onClick={() => toggleFAQ(item.id)}
              className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex-shrink-0 p-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-lg border border-white/10">
                  <div className="text-pink-400">
                    {item.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-pink-400 font-medium mb-1 uppercase tracking-wider">
                    {item.category}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-pink-300 transition-colors duration-300">
                    {item.question}
                  </h3>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className={`transform transition-transform duration-300 ${openItems.has(item.id) ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-white/60" />
                </div>
              </div>
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openItems.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <div className="pl-14 md:pl-16">
                  <div className="w-full h-px bg-gradient-to-r from-pink-500/30 to-rose-500/30 mb-6"></div>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support Section */}
      <div className="mt-16 text-center">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl border border-white/10 mx-auto flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-white/70 mb-8">
              Our community and support team are here to help you get started with transparent, fair lotteries
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Join Discord
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
              Read Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;