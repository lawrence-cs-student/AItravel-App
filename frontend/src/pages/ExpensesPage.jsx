import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseCalendar from '../components/ExpenseCalendar';
import ExpenseForm from '../components/ExpenseForm';
import useUserStore from '../store/userStore';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentDate, setCurrentDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, [currentDate]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { userToken } = useUserStore.getState();
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/expenses/getExpenses`, {
        params: {
          year: currentDate.year,
          month: currentDate.month
        },
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      
      setExpenses(response.data.data);
    } catch (err) {
      setError('Failed to fetch expenses');
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (year, month) => {
    setCurrentDate({ year, month });
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const { userToken } = useUserStore.getState();
      await axios.post(`${import.meta.env.VITE_API_URL}/expenses/addExpense`, {
        expense: expenseData
      }, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      
      await fetchExpenses();
      setShowForm(false);
    } catch (err) {
      console.error('Error adding expense:', err);
      throw err;
    }
  };

  // Calculate category totals for summary
  const getCategoryTotals = () => {
    const totals = {};
    expenses.forEach(expense => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    });
    return totals;
  };

  const categoryTotals = getCategoryTotals();
  const totalMonthExpenses = Object.values(categoryTotals).reduce((sum, total) => sum + total, 0);
  const hasExpenses = expenses.length > 0;

  const allCategories = ['food', 'transportation', 'accommodation', 'activities', 'shopping', 'others'];

  const categoryColors = {
    food: { bg: '#206A5D', text: '#FFFFFF', lightBg: '#D4EDE8' },
    transportation: { bg: '#2E7D6F', text: '#FFFFFF', lightBg: '#DCE8E4' },
    accommodation: { bg: '#1B5C50', text: '#FFFFFF', lightBg: '#CDE0DB' },
    activities: { bg: '#3D8B7C', text: '#FFFFFF', lightBg: '#E0EFEB' },
    shopping: { bg: '#257A6B', text: '#FFFFFF', lightBg: '#D8EBE6' },
    others: { bg: '#4A9A8B', text: '#FFFFFF', lightBg: '#E5F3F0' }
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#EBECF1' }}>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#1B1C25' }}>Travel Expenses</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 md:p-4 bg-red-100 text-red-700 rounded-lg text-sm md:text-base">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          
          <div className="w-full lg:w-[35%] space-y-4 md:space-y-6">
            {/* Add Expense Button & Form */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full px-4 py-3 text-white rounded-lg transition-colors hover:opacity-90 font-medium"
                  style={{ backgroundColor: '#206A5D' }}
                >
                  + Add Expense
                </button>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold" style={{ color: '#1B1C25' }}>Add New Expense</h2>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-sm hover:opacity-70"
                      style={{ color: '#206A5D' }}
                    >
                      ✕ Close
                    </button>
                  </div>
                  <ExpenseForm onSubmit={handleAddExpense} isEmbedded={true} />
                </div>
              )}
            </div>

            {/* Category Summary */}
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#1B1C25' }}>
                Category Summary
              </h2>
              
              {hasExpenses ? (
                <>
                  <div className="space-y-3">
                    {allCategories.map(category => {
                      const total = categoryTotals[category] || 0;
                      const colors = categoryColors[category];
                      return (
                        <div 
                          key={category} 
                          className="flex justify-between items-center p-3 rounded-lg"
                          style={{ 
                            backgroundColor: total > 0 ? colors.lightBg : '#EBECF1',
                          }}
                        >
                          <span 
                            className="text-sm font-medium capitalize"
                            style={{ color: total > 0 ? colors.bg : '#999' }}
                          >
                            {category}
                          </span>
                          <span 
                            className="text-sm font-bold"
                            style={{ color: total > 0 ? colors.bg : '#999' }}
                          >
                            {total > 0 ? `$${total.toFixed(2)}` : '-'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: '#EBECF1' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-base font-semibold" style={{ color: '#1B1C25' }}>Total</span>
                      <span className="text-lg font-bold" style={{ color: '#206A5D' }}>
                        ${totalMonthExpenses.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="mb-3" style={{ color: '#206A5D' }}>
                    <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm" style={{ color: '#1B1C25' }}>No expenses yet</p>
                  <p className="text-xs mt-1" style={{ color: '#999' }}>Add your first expense</p>
                </div>
              )}
            </div>
          </div>

          
          <div className="w-full lg:w-[65%]">
            <ExpenseCalendar
              expenses={expenses}
              currentDate={currentDate}
              onMonthChange={handleMonthChange}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;