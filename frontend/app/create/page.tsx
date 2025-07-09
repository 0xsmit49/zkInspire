'use client';

import React, { useState } from 'react';






import { X, Clock, CheckCircle, AlertCircle, Copy, Trophy, Users, DollarSign, Calendar, Ticket } from 'lucide-react';
import Header from '@/components/Headers';


// Lottery Creation Component
export default function LotteryCreationSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDeployed, setIsDeployed] = useState(false);
  const [deploymentDetails, setDeploymentDetails] = useState(null);
  
  const [lotteryData, setLotteryData] = useState({
    name: '',
    description: '',
    category: '',
    ticketPrice: '0.01',
    maxTickets: '1000',
    duration: '7',
    winnerCount: '1',
    organizerFee: '5',
    platformFee: '2',
    prizeFee: '93',
    drawType: 'automatic',
    requirements: 'none',
    customRequirement: ''
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: '' },
    { id: 2, title: 'Ticket Settings', icon: '' },
    { id: 3, title: 'Prize Structure', icon: '' },
    { id: 4, title: 'Rules & Access', icon: '' },
    { id: 5, title: 'Deploy & Launch', icon: '' }
  ];

  const categories = [
    { id: 'gaming', name: 'Gaming & NFTs', description: 'Game rewards and NFT prizes' },
    { id: 'community', name: 'Community Events', description: 'Community-driven lotteries' },
    { id: 'charity', name: 'Charity & Fundraising', description: 'Charitable causes and donations' },
    { id: 'investment', name: 'Investment Pools', description: 'Shared investment opportunities' }
  ];

  const drawTypes = [
    { id: 'automatic', name: 'Automatic Draw', description: 'Drawn automatically when time expires' },
    { id: 'manual', name: 'Manual Draw', description: 'You trigger the draw manually' },
    { id: 'threshold', name: 'Threshold Draw', description: 'Auto-draw when ticket limit reached' }
  ];

  const handleInputChange = (field, value) => {
    setLotteryData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const deployLottery = () => {
    const details = {
      lotteryId: `lottery_${Math.random().toString(36).substr(2, 9)}`,
      contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      lotteryUrl: `https://lotterystore.com/lottery/${Math.random().toString(36).substr(2, 9)}`,
      apiEndpoint: `https://api.lotterystore.com/v1/lotteries/${Math.random().toString(36).substr(2, 9)}`,
      deploymentTime: new Date().toISOString(),
      status: 'Active',
      endTime: new Date(Date.now() + parseInt(lotteryData.duration) * 24 * 60 * 60 * 1000).toISOString()
    };
    
    setDeploymentDetails(details);
    setIsDeployed(true);
  };

  return (
    <OnchainKitProvider apiKey="HtKBr6ZPPcdHN6plf9qm4G3TAuQtV7Kf" chain={base}>
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
      <Header/>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
          Create New IP 
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Launch your IP on the blockchain. Set prices and create engaging experiences for your community.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-4 bg-gray-900/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-800">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                currentStep === step.id
                  ? 'bg-purple-600 text-white'
                  : currentStep > step.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              <span className="text-lg">{step.icon}</span>
              <span className="font-medium hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-800 p-8 mb-8">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6"> Basic Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Asset Name</label>
                <input
                  type="text"
                  value={lotteryData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your asset name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Description</label>
                <textarea
                  value={lotteryData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your asset..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Category</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleInputChange('category', category.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        lotteryData.category === category.id
                          ? 'border-purple-500 bg-purple-900/30'
                          : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                      }`}
                    >
                      <h4 className="font-bold text-white">{category.name}</h4>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Ticket Settings */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6"> Ticket Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-2xl p-6">
                <label className="block text-gray-300 font-medium mb-4">Ticket Price</label>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl text-green-400">ETH</span>
                  <input
                    type="number"
                    step="0.001"
                    value={lotteryData.ticketPrice}
                    onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <span className="text-gray-400">per ticket</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Recommended: 0.01 - 0.1 ETH per ticket</p>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-6">
                <label className="block text-gray-300 font-medium mb-4">Maximum Tickets</label>
                <input
                  type="number"
                  value={lotteryData.maxTickets}
                  onChange={(e) => handleInputChange('maxTickets', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
                <p className="text-sm text-gray-500 mt-2">Total tickets available for sale</p>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-6">
                <label className="block text-gray-300 font-medium mb-4">Duration (Days)</label>
                <input
                  type="number"
                  value={lotteryData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
                <p className="text-sm text-gray-500 mt-2">How long the lottery will run</p>
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-6">
                <label className="block text-gray-300 font-medium mb-4">Number of Winners</label>
                <input
                  type="number"
                  min="1"
                  value={lotteryData.winnerCount}
                  onChange={(e) => handleInputChange('winnerCount', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
                <p className="text-sm text-gray-500 mt-2">How many winners will be selected</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Prize Structure */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Prize Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-900/30 rounded-2xl p-6 border border-green-700">
                <label className="block text-green-300 font-medium mb-2">Prize Pool</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={lotteryData.prizeFee}
                    onChange={(e) => handleInputChange('prizeFee', e.target.value)}
                    className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  />
                  <span className="text-green-300 ml-2">%</span>
                </div>
                <p className="text-sm text-green-200 mt-2">Goes to winners</p>
              </div>
              <div className="bg-purple-900/30 rounded-2xl p-6 border border-purple-700">
                <label className="block text-purple-300 font-medium mb-2">Your Fee</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={lotteryData.organizerFee}
                    onChange={(e) => handleInputChange('organizerFee', e.target.value)}
                    className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  />
                  <span className="text-purple-300 ml-2">%</span>
                </div>
                <p className="text-sm text-purple-200 mt-2">Organizer reward</p>
              </div>
              <div className="bg-blue-900/30 rounded-2xl p-6 border border-blue-700">
                <label className="block text-blue-300 font-medium mb-2">Platform Fee</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={lotteryData.platformFee}
                    onChange={(e) => handleInputChange('platformFee', e.target.value)}
                    className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                  <span className="text-blue-300 ml-2">%</span>
                </div>
                <p className="text-sm text-blue-200 mt-2">Platform maintenance</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400">
                Total: {parseInt(lotteryData.prizeFee) + parseInt(lotteryData.organizerFee) + parseInt(lotteryData.platformFee)}%
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Estimated prize pool: {((parseFloat(lotteryData.ticketPrice) * parseInt(lotteryData.maxTickets)) * (parseInt(lotteryData.prizeFee) / 100)).toFixed(3)} ETH
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Rules & Access */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6"> Rules & Access</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-4">Draw Type</label>
                <div className="grid grid-cols-1 gap-4">
                  {drawTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleInputChange('drawType', type.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        lotteryData.drawType === type.id
                          ? 'border-purple-500 bg-purple-900/30'
                          : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                      }`}
                    >
                      <h4 className="font-bold text-white">{type.name}</h4>
                      <p className="text-sm text-gray-400">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-4">Access Requirements</label>
                <div className="space-y-3">
                  <button
                    onClick={() => handleInputChange('requirements', 'none')}
                    className={`w-full p-3 rounded-xl border transition-all text-left ${
                      lotteryData.requirements === 'none'
                        ? 'border-purple-500 bg-purple-900/30'
                        : 'border-gray-700 bg-gray-800/30'
                    }`}
                  >
                    <span className="font-medium text-white"> Open to Everyone</span>
                    <p className="text-sm text-gray-400">No restrictions</p>
                  </button>
                  <button
                    onClick={() => handleInputChange('requirements', 'nft')}
                    className={`w-full p-3 rounded-xl border transition-all text-left ${
                      lotteryData.requirements === 'nft'
                        ? 'border-purple-500 bg-purple-900/30'
                        : 'border-gray-700 bg-gray-800/30'
                    }`}
                  >
                    <span className="font-medium text-white"> NFT Holders Only</span>
                    <p className="text-sm text-gray-400">Require specific NFT ownership</p>
                  </button>
                  <button
                    onClick={() => handleInputChange('requirements', 'token')}
                    className={`w-full p-3 rounded-xl border transition-all text-left ${
                      lotteryData.requirements === 'token'
                        ? 'border-purple-500 bg-purple-900/30'
                        : 'border-gray-700 bg-gray-800/30'
                    }`}
                  >
                    <span className="font-medium text-white"> Token Holders Only</span>
                    <p className="text-sm text-gray-400">Require minimum token balance</p>
                  </button>
                  <button
                    onClick={() => handleInputChange('requirements', 'custom')}
                    className={`w-full p-3 rounded-xl border transition-all text-left ${
                      lotteryData.requirements === 'custom'
                        ? 'border-purple-500 bg-purple-900/30'
                        : 'border-gray-700 bg-gray-800/30'
                    }`}
                  >
                    <span className="font-medium text-white"> Custom Requirements</span>
                    <p className="text-sm text-gray-400">Set custom eligibility criteria</p>
                  </button>
                </div>

                {lotteryData.requirements === 'custom' && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={lotteryData.customRequirement}
                      onChange={(e) => handleInputChange('customRequirement', e.target.value)}
                      placeholder="Enter custom requirement details"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Deploy & Launch */}
        {currentStep === 5 && !isDeployed && (
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6"> Ready to Launch</h2>
            <div className="bg-gray-800/50 rounded-2xl p-8 space-y-4">
              <div className="text-left space-y-2">
                <p><span className="text-gray-400">Name:</span> <span className="text-white">{lotteryData.name}</span></p>
                <p><span className="text-gray-400">Ticket Price:</span> <span className="text-green-400">{lotteryData.ticketPrice} ETH</span></p>
                <p><span className="text-gray-400">Max Tickets:</span> <span className="text-blue-400">{lotteryData.maxTickets}</span></p>
                <p><span className="text-gray-400">Duration:</span> <span className="text-purple-400">{lotteryData.duration} days</span></p>
                <p><span className="text-gray-400">Winners:</span> <span className="text-cyan-400">{lotteryData.winnerCount}</span></p>
                <p><span className="text-gray-400">Your Fee:</span> <span className="text-purple-400">{lotteryData.organizerFee}%</span></p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">Deployment Process</h3>
              <div className="text-left space-y-2 text-purple-100">
                <p> Smart contract deployment on Base network</p>
                <p>Ticket sale system activation</p>
                <p>Secure random number generation setup</p>
                <p>Real-time analytics dashboard</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Deployed */}
        {currentStep === 5 && isDeployed && deploymentDetails && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4"></div>
              <h2 className="text-3xl font-bold text-white mb-2"> IP Asset  Successfully Deployed!</h2>
              <p className="text-gray-300">Your  IP Asset  is now live and ready for participants</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="text-blue-400 mr-2"></span>
                  IP Asset Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400"> IP Asset  ID:</span>
                    <span className="text-white font-mono">{deploymentDetails.lotteryId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400 font-semibold">{deploymentDetails.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ends:</span>
                    <span className="text-white">{new Date(deploymentDetails.endTime).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="text-purple-400 mr-2"></span>
                  Blockchain Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract:</span>
                    <span className="text-white font-mono text-xs">{deploymentDetails.contractAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network:</span>
                    <span className="text-blue-400">Base Mainnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transaction:</span>
                    <span className="text-white font-mono text-xs">{deploymentDetails.transactionHash.substring(0, 10)}...</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="text-green-400 mr-2"></span>
                  Prize Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ticket Price:</span>
                    <span className="text-green-400 font-semibold">{lotteryData.ticketPrice} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Prize Pool:</span>
                    <span className="text-green-400">{((parseFloat(lotteryData.ticketPrice) * parseInt(lotteryData.maxTickets)) * (parseInt(lotteryData.prizeFee) / 100)).toFixed(3)} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Fee:</span>
                    <span className="text-purple-400">{lotteryData.organizerFee}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="text-cyan-400 mr-2"></span>
                  Current Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tickets Sold:</span>
                    <span className="text-white">0 / {lotteryData.maxTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Participants:</span>
                    <span className="text-cyan-400">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Pool:</span>
                    <span className="text-white">0 ETH</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4"> Access Your Lottery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-100 mb-2"><strong>Public URL:</strong></p>
                  <a href={deploymentDetails.lotteryUrl} className="text-white underline hover:text-green-200 break-all">
                    {deploymentDetails.lotteryUrl}
                  </a>
                </div>
                <div>
                  <p className="text-green-100 mb-2"><strong>Management API:</strong></p>
                  <code className="text-white bg-black/20 px-2 py-1 rounded text-xs block break-all">
                    {deploymentDetails.apiEndpoint}
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-yellow-300 mb-2 flex items-center">
                <span className="mr-2">⚡</span>
                Next Steps
              </h3>
              <ul className="text-yellow-100 space-y-1 text-sm">
                <li>• Share your lottery URL to attract participants</li>
                <li>• Monitor ticket sales and prize pool growth</li>
                <li>• Manage draw settings and participant requirements</li>
                <li>• Withdraw your organizer fees after the draw</li>
                <li>• Join our community for lottery creator tips</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        {currentStep < 5 ? (
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
          >
            Next Step
          </button>
        ) : !isDeployed ? (
          <button
            onClick={deployLottery}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-bold text-lg"
          >
             Deploy Lottery
          </button>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={() => window.open(deploymentDetails.lotteryUrl, '_blank')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all font-medium"
            >
              View Lottery
            </button>
            <button
              onClick={() => {
                setCurrentStep(1);
                setIsDeployed(false);
                setDeploymentDetails(null);
                setLotteryData({
                  name: '',
                  description: '',
                  category: '',
                  ticketPrice: '0.01',
                  maxTickets: '1000',
                  duration: '7',
                  winnerCount: '1',
                  organizerFee: '5',
                  platformFee: '2',
                  prizeFee: '93',
                  drawType: 'automatic',
                  requirements: 'none',
                  customRequirement: ''
                });
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
            >
              Create Another
            </button>
          </div>
        )}

      </div>
    </div>
    </OnchainKitProvider>
  );
}