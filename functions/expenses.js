const expenseData = {
  balance: 921.48,
  spending: {
    thisMonth: 478.33,
    lastMonthDelta: 2.4,
    thisWeek: [
      {
        day: "Monday",
        amount: 17.45,
      },
      {
        day: "Tuesday",
        amount: 34.91,
      },
      {
        day: "Wednesday",
        amount: 52.36,
      },
      {
        day: "Thursday",
        amount: 31.07,
      },
      {
        day: "Friday",
        amount: 23.39,
      },
      {
        day: "Saturday",
        amount: 43.28,
      },
      {
        day: "Sunday",
        amount: 25.48,
      },
    ],
  },
};

export async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  };
}
