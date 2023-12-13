import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfWeek = (year, month) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfWeek(year, month);

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const calendar = [];

    calendar.push(
      <View key="weekdays" style={styles.weekdaysContainer}>
        {weekdays.map((day, index) => (
          <Text key={index} style={styles.weekdayText}>{day}</Text>
        ))}
      </View>
    );

    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || day > daysInMonth) {
          week.push(<View key={j} style={styles.emptyDay}></View>);
        } else {
          const isCurrentDay = day === selectedDate;
          week.push(
            <TouchableOpacity
              key={j}
              style={[
                styles.calendarDay,
                isCurrentDay && styles.selectedDay,
              ]}
              onPress={() => setSelectedDate(day)}
            >
              <Text style={isCurrentDay && styles.selectedDayText}>{day}</Text>
            </TouchableOpacity>
          );
          day++;
        }
      }
      calendar.push(
        <View key={i} style={styles.weekContainer}>
          {week}
        </View>
      );
      if (day > daysInMonth) {
        break;
      }
    }

    return calendar;
  };

  const showCurrentMonthButton =
    currentDate.getMonth() !== new Date().getMonth() ||
    currentDate.getFullYear() !== new Date().getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
  
      <View style={styles.calendar}>
        {renderCalendar()}
      </View>
  
      {showCurrentMonthButton && (
        <TouchableOpacity onPress={handleCurrentMonth} style={styles.currentMonthButton}>
          <Text style={styles.currentMonthButtonText}>Go to Current Month</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendar: {
    marginBottom: 20,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekdayText: {
    width: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  calendarDay: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: 'blue',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  currentMonthButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  currentMonthButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyDay: {
    width: 30,
    height: 30,
  },
});

export default CalendarApp;
