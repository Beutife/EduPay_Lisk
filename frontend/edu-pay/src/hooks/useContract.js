import { useEffect, useState } from 'react';
import { initWeb3, getContractService } from '../services/web3';

export const useContract = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contractService, setContractService] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');

  useEffect(() => {
    const initialize = async () => {
      try {
        const { success, error } = await initWeb3();
        if (success) {
          setContractService(getContractService());
          const account = await getContractService().getCurrentAccount();
          setCurrentAccount(account);
          setIsInitialized(true);
        } else {
          setError(error || 'Failed to initialize Web3');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return {
    isInitialized,
    isLoading,
    error,
    contractService,
    currentAccount,
  };
};
