
'use client'
import React, { useState, useEffect } from 'react';
import { Clock, Users, DollarSign, Ticket, Shield, Eye, EyeOff, Trophy, CheckCircle, AlertCircle, Copy, Calendar } from 'lucide-react';
import Header from '@/components/Headers';
export default function LotterySystem() {
  const [currentView, setCurrentView] = useState('explore'); // explore, lottery, buy, commit, reveal
  const [selectedLottery, setSelectedLottery] = useState(null);
  const [userCommitment, setUserCommitment] = useState('');
  const [userSecret, setUserSecret] = useState('');
  const [hashedCommitment, setHashedCommitment] = useState('');
  const [revealPhaseActive, setRevealPhaseActive] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  // Mock lottery data
  const [lotteries] = useState([
    {
      id: 'lottery_1',
      name: 'Community Gaming Pool',
      description: 'Weekly gaming rewards for our community members',
      category: 'gaming',
      ticketPrice: '0.01',
      maxTickets: 1000,
      ticketsSold: 654,
      duration: 2,
      participants: 234,
      currentPool: '6.54',
      maxPool: '9.30',
      organizerFee: 5,
      status: 'active',
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      phase: 'ticket_sale',
      winners: 3,
      requirements: 'none'
    },
    {
      id: 'lottery_2',
      name: 'NFT Holders Exclusive',
      description: 'Exclusive lottery for premium NFT collection holders',
      category: 'community',
      ticketPrice: '0.05',
      maxTickets: 500,
      ticketsSold: 378,
      duration: 5,
      participants: 189,
      currentPool: '17.91',
      maxPool: '23.25',
      organizerFee: 3,
      status: 'active',
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      phase: 'ticket_sale',
      winners: 1,
      requirements: 'nft'
    },
    {
      id: 'lottery_3',
      name: 'Charity Fundraiser',
      description: 'Supporting local education initiatives',
      category: 'charity',
      ticketPrice: '0.02',
      maxTickets: 2000,
      ticketsSold: 1847,
      duration: 1,
      participants: 892,
      currentPool: '34.29',
      maxPool: '37.20',
      organizerFee: 2,
      status: 'commit_phase',
      endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      phase: 'commit',
      winners: 5,
      requirements: 'none'
    }
  ]);

  const generateRandomSecret = () => {
    const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setUserSecret(secret);
    return secret;
  };

  const generateCommitment = (secret, address = '0x123...abc') => {
    // Simple hash simulation (in real implementation, use proper cryptographic hash)
    const commitment = btoa(secret + address).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
    setHashedCommitment(commitment);
    return commitment;
  };

  const getCategoryColor = (category) => {
    const colors = {
      gaming: 'from-purple-600 to-pink-600',
      community: 'from-blue-600 to-cyan-600',
      charity: 'from-green-600 to-emerald-600',
      investment: 'from-orange-600 to-red-600'
    };
    return colors[category] || 'from-gray-600 to-gray-700';
  };

  const getPhaseDisplay = (phase) => {
    const phases = {
      ticket_sale: { name: 'Ticket Sale', color: 'text-blue-400', icon: <Ticket className="w-4 h-4" /> },
      commit: { name: 'Commit Phase', color: 'text-yellow-400', icon: <Shield className="w-4 h-4" /> },
      reveal: { name: 'Reveal Phase', color: 'text-orange-400', icon: <Eye className="w-4 h-4" /> },
      complete: { name: 'Complete', color: 'text-green-400', icon: <Trophy className="w-4 h-4" /> }
    };
    return phases[phase] || phases.ticket_sale;
  };

  const renderExplorePage = () => (
    <div className="space-y-8">
      <Header/>
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Explore Lotteries
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover active lotteries, join communities, and participate in transparent prize draws
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lotteries.map((lottery) => {
          const phaseInfo = getPhaseDisplay(lottery.phase);
          const progress = (lottery.ticketsSold / lottery.maxTickets) * 100;
          
          return (
            <div key={lottery.id} className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-purple-600 transition-all cursor-pointer"
                 onClick={() => {
                   setSelectedLottery(lottery);
                   setCurrentView('lottery');
                 }}>
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(lottery.category)} text-white`}>
                  {lottery.category.toUpperCase()}
                </div>
                <div className={`flex items-center space-x-1 ${phaseInfo.color}`}>
                  {phaseInfo.icon}
                  <span className="text-sm font-medium">{phaseInfo.name}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{lottery.name}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{lottery.description}</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Prize Pool</span>
                  <span className="text-green-400 font-bold">{lottery.currentPool} ETH</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{lottery.ticketsSold}/{lottery.maxTickets}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                         style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-cyan-400 font-bold">{lottery.participants}</div>
                    <div className="text-xs text-gray-500">Participants</div>
                  </div>
                  <div>
                    <div className="text-green-400 font-bold">{lottery.ticketPrice} ETH</div>
                    <div className="text-xs text-gray-500">Per Ticket</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-bold">{lottery.duration}d</div>
                    <div className="text-xs text-gray-500">Left</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderLotteryDetails = () => {
    if (!selectedLottery) return null;
    
    const phaseInfo = getPhaseDisplay(selectedLottery.phase);
    const progress = (selectedLottery.ticketsSold / selectedLottery.maxTickets) * 100;

    return (
      <div className="space-y-8">
        <Header/>
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentView('explore')}
            className="text-purple-400 hover:text-purple-300 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Explore</span>
          </button>
          <div className={`flex items-center space-x-2 ${phaseInfo.color}`}>
            {phaseInfo.icon}
            <span className="font-semibold">{phaseInfo.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Lottery Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getCategoryColor(selectedLottery.category)} text-white mb-4`}>
                {selectedLottery.category.toUpperCase()}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{selectedLottery.name}</h1>
              <p className="text-gray-300 text-lg mb-6">{selectedLottery.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-green-400 font-bold text-lg">{selectedLottery.currentPool} ETH</div>
                  <div className="text-xs text-gray-500">Current Pool</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <div className="text-cyan-400 font-bold text-lg">{selectedLottery.participants}</div>
                  <div className="text-xs text-gray-500">Participants</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Trophy className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-purple-400 font-bold text-lg">{selectedLottery.winners}</div>
                  <div className="text-xs text-gray-500">Winners</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-orange-400 font-bold text-lg">{selectedLottery.duration}d</div>
                  <div className="text-xs text-gray-500">Time Left</div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Ticket Sales Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tickets Sold</span>
                  <span className="text-white font-medium">{selectedLottery.ticketsSold} / {selectedLottery.maxTickets}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500" 
                       style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-purple-400 font-medium">{progress.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            {selectedLottery.phase === 'ticket_sale' && (
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Buy Tickets</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Ticket Price</label>
                    <div className="text-2xl font-bold text-green-400">{selectedLottery.ticketPrice} ETH</div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={ticketQuantity}
                      onChange={(e) => setTicketQuantity(parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Tickets:</span>
                      <span className="text-white">{ticketQuantity}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-400">Total:</span>
                      <span className="text-green-400 font-bold">{(parseFloat(selectedLottery.ticketPrice) * ticketQuantity).toFixed(3)} ETH</span>
                    </div>
                    <button
                      onClick={() => setCurrentView('buy')}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-semibold"
                    >
                      Purchase Tickets
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedLottery.phase === 'commit' && (
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Commit Phase</h3>
                <div className="space-y-4">
                  <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-yellow-300 mb-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-semibold">Commitment Required</span>
                    </div>
                    <p className="text-yellow-100 text-sm">
                      Submit your secret commitment to participate in the fair draw process.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView('commit')}
                    className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all font-semibold"
                  >
                    Submit Commitment
                  </button>
                </div>
              </div>
            )}

            {selectedLottery.phase === 'reveal' && (
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Reveal Phase</h3>
                <div className="space-y-4">
                  <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-orange-300 mb-2">
                      <Eye className="w-4 h-4" />
                      <span className="font-semibold">Reveal Your Secret</span>
                    </div>
                    <p className="text-orange-100 text-sm">
                      Time to reveal your secret to complete the random selection process.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView('reveal')}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all font-semibold"
                  >
                    Reveal Secret
                  </button>
                </div>
              </div>
            )}

            {/* Prize Breakdown */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Prize Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Prize Pool:</span>
                  <span className="text-green-400 font-semibold">{(100 - selectedLottery.organizerFee - 2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Organizer Fee:</span>
                  <span className="text-purple-400">{selectedLottery.organizerFee}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform Fee:</span>
                  <span className="text-blue-400">2%</span>
                </div>
                <div className="border-t border-gray-700 pt-2">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">Est. Prize Pool:</span>
                    <span className="text-green-400 font-bold">{(parseFloat(selectedLottery.currentPool) * (100 - selectedLottery.organizerFee - 2) / 100).toFixed(2)} ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBuyTickets = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <Header/>
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setCurrentView('lottery')}
          className="text-purple-400 hover:text-purple-300 flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Lottery</span>
        </button>
      </div>

      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-6">Purchase Tickets</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">{selectedLottery?.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Ticket Price:</span>
                <span className="text-green-400 font-semibold ml-2">{selectedLottery?.ticketPrice} ETH</span>
              </div>
              <div>
                <span className="text-gray-400">Quantity:</span>
                <span className="text-white font-semibold ml-2">{ticketQuantity}</span>
              </div>
              <div>
                <span className="text-gray-400">Your Entry Count:</span>
                <span className="text-cyan-400 font-semibold ml-2">{ticketQuantity}</span>
              </div>
              <div>
                <span className="text-gray-400">Total Cost:</span>
                <span className="text-green-400 font-bold ml-2">{(parseFloat(selectedLottery?.ticketPrice || 0) * ticketQuantity).toFixed(3)} ETH</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-blue-300 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="font-semibold">Transaction Details</span>
            </div>
            <div className="text-blue-100 text-sm space-y-1">
              <p>• Funds will be locked in the LotteryCommitReveal contract</p>
              <p>• Each ticket = 1 entry in the lottery</p>
              <p>• Transaction will be recorded on Etherscan</p>
              <p>• You'll receive a confirmation after purchase</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-bold text-lg">
              Buy {ticketQuantity} Ticket{ticketQuantity > 1 ? 's' : ''} - {(parseFloat(selectedLottery?.ticketPrice || 0) * ticketQuantity).toFixed(3)} ETH
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">
                By purchasing tickets, you agree to the lottery terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommitPhase = () => (
    
    <div className="max-w-2xl mx-auto space-y-6">
      <Header/>
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setCurrentView('lottery')}
          className="text-purple-400 hover:text-purple-300 flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Lottery</span>
        </button>
      </div>

      <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
        <div className="text-center mb-6">
          <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Commit Phase</h2>
          <p className="text-gray-300">Submit your secret commitment for fair random selection</p>
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-300 mb-3">How Commit-Reveal Works</h3>
            <div className="text-yellow-100 text-sm space-y-2">
              <p><strong>Step 1:</strong> Generate a random secret (or use our generator)</p>
              <p><strong>Step 2:</strong> Create a hash of your secret + wallet address</p>
              <p><strong>Step 3:</strong> Submit the hash (commitment) to the contract</p>
              <p><strong>Step 4:</strong> In reveal phase, submit your original secret</p>
              <p><strong>Step 5:</strong> Contract verifies and uses all secrets for randomness</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Your Secret</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userSecret}
                  onChange={(e) => setUserSecret(e.target.value)}
                  placeholder="Enter your secret phrase"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:outline-none"
                />
                <button
                  onClick={generateRandomSecret}
                  className="px-4 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors"
                >
                  Generate
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Keep this secret safe! You'll need it for the reveal phase.</p>
            </div>

            {userSecret && (
              <div>
                <label className="block text-gray-300 font-medium mb-2">Your Commitment Hash</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={hashedCommitment}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 font-mono text-sm"
                  />
                  <button
                    onClick={() => generateCommitment(userSecret)}
                    className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                  >
                    Hash
                  </button>
                </div>
              </div>
            )}

            {hashedCommitment && (
              <div className="bg-green-900/30 border border-green-700 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-green-300 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-semibold">Ready to Submit</span>
                </div>
                <p className="text-green-100 text-sm mb-4">
                  Your commitment hash is ready. Make sure to save your secret phrase securely!
                </p>
                <button className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all font-semibold">
                  Submit Commitment Hash
                </button>
              </div>
            )}
          </div>

          <div className="bg-red-900/30 border border-red-700 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-red-300 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span className="font-semibold">Important Warning</span>
            </div>
            <p className="text-red-100 text-sm">
              Save your secret phrase! If you lose it, you cannot participate in the reveal phase and your tickets will be invalid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {currentView === 'explore' && renderExplorePage()}
      {currentView === 'lottery' && renderLotteryDetails()}
      {currentView === 'buy' && renderBuyTickets()}
      {currentView === 'commit' && renderCommitPhase()}
    </div>
  );
}