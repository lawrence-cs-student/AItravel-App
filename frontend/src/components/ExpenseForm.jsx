import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit, isEmbedded = false }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'food', label: 'Food' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'activities', label: 'Activities' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'others', label: 'Others' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || formData.amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (!formData.date) {
      setError('Please select a date');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      const expenseData = {
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: new Date(formData.date).toISOString()
      };
      
      await onSubmit(expenseData);
      
      setFormData({
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add expense');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={!isEmbedded ? 'bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6' : ''}>
      {!isEmbedded && (
        <h2 className="text-lg md:text-xl font-semibold mb-4" style={{ color: '#1B1C25' }}>Add New Expense</h2>
      )}
      
      {error && (
        <div className="mb-3 p-2 md:p-3 bg-red-100 text-red-700 rounded-lg text-xs md:text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Amount Field */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#1B1C25' }}>
            Amount ($)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
            style={{ focusRing: '#206A5D' }}
            required
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#1B1C25' }}>
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent capitalize text-sm"
            style={{ focusRing: '#206A5D' }}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Field */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#1B1C25' }}>
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
            style={{ focusRing: '#206A5D' }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2.5 text-white rounded-lg transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          style={{ backgroundColor: '#206A5D' }}
        >
          {submitting ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;