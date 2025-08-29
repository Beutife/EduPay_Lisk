import { useState } from "react";
import "./App.css";
import SchoolDashboard from "./components/SchoolDashboard";

function App() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [studentId, setStudentId] = useState("");
  const [riskScore, setRiskScore] = useState(null);
  const [activeTab, setActiveTab] = useState("pay");
  const [isConnected, setIsConnected] = useState(false);
  const [userRole, setUserRole] = useState('parent');

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const toggleRole = () => {
    setUserRole(userRole === 'parent' ? 'school' : 'parent');
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

  const tabs = [
    { id: "pay", label: "Pay Fees", icon: "💳" },
    { id: "scholarship", label: "Fund Scholarship", icon: "🎓" },
    { id: "risk", label: "Risk Assessment", icon: "📊" }
  ];

  const tabContent = {
    pay: (
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
    ),
    scholarship: (
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
    ),
    risk: (
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
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">EduPay</h1>
                  <p className="text-sm text-gray-500">
                    {userRole === 'parent' ? 'Transparent Education Financing' : 'School Payment Portal'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleRole}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Switch to {userRole === 'parent' ? 'School' : 'Parent'} View
              </button>
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        {userRole === 'parent' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Parent View */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-gray-100">
                  <nav className="flex">
                    {tabs.map((tab) => (
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
                  {tabContent[activeTab]}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Balance Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your Balance</h3>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">0.00</span>
                  <span className="text-gray-500">USDC</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">≈ $0.00 USD</p>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Add Funds
                </button>
              </div>
              
              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item, index) => (
                    <div key={item} className={`flex items-center justify-between pb-3 border-b border-gray-100 ${index === 2 ? 'last:border-0 last:pb-0' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-blue-600">
                            {item % 2 === 0 ? '🎓' : '🏫'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item % 2 === 0 ? 'Scholarship Fund' : 'School Fees'}
                          </p>
                          <p className="text-xs text-gray-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">-{item * 100} USDC</p>
                        <p className="text-xs text-gray-500">Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SchoolDashboard />
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; 2024 EduPay. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Help Center</a>
            </div>
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
      </div>
    </div>
  );
}

export default App;