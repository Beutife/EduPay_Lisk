import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [studentId, setStudentId] = useState("");
  const [riskScore, setRiskScore] = useState(null);
  const [activeTab, setActiveTab] = useState("pay"); // pay, scholarship, risk
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const getRiskScoreColor = (score) => {
    if (score >= 0.7) return "text-red-500 bg-red-50";
    if (score >= 0.4) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getRiskText = (score) => {
    if (score >= 0.7) return "High Risk";
    if (score >= 0.4) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduPay</h1>
                <p className="text-sm text-gray-500">Transparent Education Financing</p>
              </div>
            </div>
            
            <button 
              onClick={handleConnect}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                isConnected 
                  ? "bg-green-100 text-green-700 border border-green-200" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              }`}
            >
              {isConnected ? "✓ Connected" : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              
              {/* Tab Navigation */}
              <div className="border-b border-gray-100">
                <nav className="flex">
                  {[
                    { id: "pay", label: "Pay Fees", icon: "💳" },
                    { id: "scholarship", label: "Fund Scholarship", icon: "🎓" },
                    { id: "risk", label: "Risk Assessment", icon: "📊" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === "pay" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Pay School Fees
                      </h3>
                      <p className="text-gray-600 text-sm mb-6">
                        Securely pay school fees with automatic escrow protection
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          School Wallet Address
                        </label>
                        <input
                          type="text"
                          placeholder="0x..."
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student ID
                        </label>
                        <input
                          type="text"
                          placeholder="STU-2024-001"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount (USDC)
                        </label>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                      Pay Fees Securely
                    </button>
                  </div>
                )}

                {activeTab === "scholarship" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Fund Scholarships
                      </h3>
                      <p className="text-gray-600 text-sm mb-6">
                        Support students in need and earn Education NFTs
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student to Support
                        </label>
                        <input
                          type="text"
                          placeholder="STU-2024-002"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Donation Amount (USDC)
                        </label>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                      Fund Scholarship
                    </button>
                  </div>
                )}

                {activeTab === "risk" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Dropout Risk Assessment
                      </h3>
                      <p className="text-gray-600 text-sm mb-6">
                        AI-powered analysis to identify students who need support
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student ID to Analyze
                        </label>
                        <input
                          type="text"
                          placeholder="STU-2024-003"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setRiskScore(Math.random())}
                      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Analyze Risk Score
                    </button>
                    
                    {riskScore !== null && (
                      <div className={`p-6 rounded-xl border-2 ${getRiskScoreColor(riskScore)} transition-all duration-300`}>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2">
                            {(riskScore * 100).toFixed(0)}%
                          </div>
                          <div className="text-lg font-semibold mb-2">
                            {getRiskText(riskScore)}
                          </div>
                          <p className="text-sm opacity-80">
                            {riskScore >= 0.7 
                              ? "This student needs immediate support to continue their education"
                              : riskScore >= 0.4 
                              ? "This student could benefit from additional resources"
                              : "This student is likely to complete their education successfully"
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Platform Stats</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Fees Paid</span>
                  <span className="font-semibold text-green-600">$12,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Scholarships Funded</span>
                  <span className="font-semibold text-purple-600">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Students Supported</span>
                  <span className="font-semibold text-blue-600">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Schools Connected</span>
                  <span className="font-semibold text-orange-600">8</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Fee Payment</p>
                    <p className="text-xs text-gray-500">STU-001 • $150</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Scholarship Funded</p>
                    <p className="text-xs text-gray-500">STU-002 • $75</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">NFT Minted</p>
                    <p className="text-xs text-gray-500">STU-003 • Certificate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;