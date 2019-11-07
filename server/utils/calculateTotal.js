const calculateTotal = async (model, date, id) => {
  date = date.substring(0, date.length - 3);
  let startDate = date += '-01';
  let endDate = date;
  endDate = endDate.substring(0, date.length - 3);
  endDate = endDate += '-31';

  const total = await model.aggregate(
    [
      {
        $match: {
          date : { $gte: startDate, $lte: endDate},
          user : id
        }
      },
      {
        $group: {
          _id: {month: { $month: new Date(date) }},
          total: { "$sum": "$amount" }
        }
      }
    ]
  );

  return total;
};

module.exports = calculateTotal;
