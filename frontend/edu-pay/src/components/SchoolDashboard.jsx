import { useState, useEffect } from 'react';

const SchoolDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [payments, setPayments] = useState([
    // Mock data - in a real app, this would come from the blockchain
    {
      id: 1,
      payer: '0x1234...5678',
      studentId: 'STU-2024-001',
      amount: '500',
      timestamp: '2024-08-29T10:30:00Z',
      status: 'pending',
      isScholarship: false
    },
    {
      id: 2,
      payer: '0x5678...9012',
      studentId: 'STU-2024-002',
      amount: '300',
      timestamp: '2024-08-29T11:15:00Z',
      status: 'pending',
      isScholarship: true
    },
    {
      id: 3,
      payer: '0x9012...3456',
      studentId: 'STU-2024-003',
      amount: '200',
      timestamp: '2024-08-28T09:45:00Z',
      status: 'completed',
      isScholarship: false
    }
  ]);

  const handleConfirmPayment = (paymentId) => {
    // In a real app, this would call the smart contract's confirmPayment function
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: 'completed' } 
        : payment
    ));
  };

  const filteredPayments = payments.filter(payment => 
    activeTab === 'all' || payment.status === activeTab
  );

  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const totalReceived = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">School Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-sm font-medium text-blue-700">Total Received</p>
            <p className="text-2xl font-bold text-blue-900">{totalReceived} USDC</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl">
            <p className="text-sm font-medium text-yellow-700">Pending Payments</p>
            <p className="text-2xl font-bold text-yellow-900">{pendingCount}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <p className="text-sm font-medium text-purple-700">Total Students</p>
            <p className="text-2xl font-bold text-purple-900">
              {new Set(payments.map(p => p.studentId)).size}
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-6">
            {[
              { id: 'pending', label: 'Pending' },
              { id: 'completed', label: 'Completed' },
              { id: 'all', label: 'All Payments' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.id === 'pending' && pendingCount > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount (USDC)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.isScholarship 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {payment.isScholarship ? 'Scholarship' : 'School Fees'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {payment.amount} USDC
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {payment.status === 'pending' ? (
                      <button
                        onClick={() => handleConfirmPayment(payment.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Confirm
                      </button>
                    ) : (
                      <span className="text-gray-400">Confirmed</span>
                    )}
                    <button className="text-gray-600 hover:text-gray-900">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;
