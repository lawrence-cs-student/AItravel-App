import React from 'react';

const ExpenseCalendar = ({ expenses, currentDate, onMonthChange, loading }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const getExpensesForDate = (date) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === date.getFullYear() &&
        expenseDate.getMonth() === date.getMonth() &&
        expenseDate.getDate() === date.getDate()
      );
    });
  };

  const calculateDayTotal = (expenses) => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const handlePrevMonth = () => {
    let newYear = currentDate.year;
    let newMonth = currentDate.month - 1;
    
    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    
    onMonthChange(newYear, newMonth);
  };

  const handleNextMonth = () => {
    let newYear = currentDate.year;
    let newMonth = currentDate.month + 1;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    
    onMonthChange(newYear, newMonth);
  };

  const daysInMonth = getDaysInMonth(currentDate.year, currentDate.month);
  const firstDay = getFirstDayOfMonth(currentDate.year, currentDate.month);

  const categoryColors = {
    food: { bg: '#206A5D', lightBg: '#D4EDE8' },
    transportation: { bg: '#2E7D6F', lightBg: '#DCE8E4' },
    accommodation: { bg: '#1B5C50', lightBg: '#CDE0DB' },
    activities: { bg: '#3D8B7C', lightBg: '#E0EFEB' },
    shopping: { bg: '#257A6B', lightBg: '#D8EBE6' },
    others: { bg: '#4A9A8B', lightBg: '#E5F3F0' }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-2 border-t-transparent" style={{ borderColor: '#206A5D' }}></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 md:p-6" style={{ backgroundColor: '#206A5D' }}>
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg transition-colors hover:bg-white/20 text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg md:text-xl font-semibold text-white">
          {monthNames[currentDate.month - 1]} {currentDate.year}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg transition-colors hover:bg-white/20 text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7" style={{ backgroundColor: '#EBECF1' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div 
            key={day} 
            className="py-3 text-center text-xs md:text-sm font-semibold tracking-wide"
            style={{ 
              backgroundColor: index === 0 || index === 6 ? '#F5F5F5' : '#EBECF1',
              color: '#1B1C25'
            }}
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div 
            key={`empty-${index}`} 
            className="min-h-[70px] md:min-h-[90px] border-b border-r"
            style={{ borderColor: '#EBECF1' }}
          ></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = new Date(currentDate.year, currentDate.month - 1, day);
          const dayExpenses = getExpensesForDate(date);
          const dayTotal = calculateDayTotal(dayExpenses);
          const isToday = new Date().toDateString() === date.toDateString();
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          return (
            <div 
              key={day} 
              className="relative min-h-[70px] md:min-h-[90px] p-1.5 md:p-2 border-b border-r transition-all duration-200 hover:shadow-lg hover:z-10"
              style={{ 
                borderColor: '#EBECF1',
                backgroundColor: isToday ? '#206A5D' : (isWeekend ? '#FAFAFA' : '#FFFFFF')
              }}
            >
              {/* Day Number */}
              <div className="flex items-center justify-center mb-1">
                <span 
                  className={`inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-xs md:text-sm font-semibold
                    ${isToday ? 'bg-white text-[#206A5D]' : ''}`}
                  style={{ color: isToday ? '#206A5D' : '#1B1C25' }}
                >
                  {day}
                </span>
              </div>

              {/* Expenses */}
              {dayExpenses.length > 0 ? (
                <div className="space-y-0.5">
                  {dayExpenses.slice(0, 2).map(expense => {
                    const colors = categoryColors[expense.category];
                    return (
                      <div
                        key={expense._id}
                        className="text-[10px] md:text-xs px-1.5 py-0.5 rounded-md truncate font-medium"
                        style={{ 
                          backgroundColor: isToday ? 'rgba(255,255,255,0.2)' : colors.lightBg,
                          color: isToday ? '#FFFFFF' : colors.bg
                        }}
                      >
                        <span className="hidden md:inline capitalize">{expense.category}: </span>
                        ${expense.amount.toFixed(2)}
                      </div>
                    );
                  })}
                  {dayExpenses.length > 2 && (
                    <div 
                      className="text-[10px] md:text-xs px-1.5 font-medium"
                      style={{ color: isToday ? 'rgba(255,255,255,0.7)' : '#999' }}
                    >
                      +{dayExpenses.length - 2} more
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center mt-1">
                  <span 
                    className="text-[10px] md:text-xs"
                    style={{ color: isToday ? 'rgba(255,255,255,0.3)' : '#EBECF1' }}
                  >
                    -
                  </span>
                </div>
              )}

              {/* Day Total */}
              {dayTotal > 0 && (
                <div className="absolute bottom-1.5 right-2">
                  <span 
                    className="text-[10px] md:text-xs font-bold"
                    style={{ color: isToday ? '#FFFFFF' : '#206A5D' }}
                  >
                    ${dayTotal.toFixed(0)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseCalendar;