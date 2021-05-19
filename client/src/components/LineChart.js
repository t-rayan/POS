import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import moment from "moment";

const LineChart = () => {
  const orderState = useSelector((state) => state.orderState);
  const { orders } = orderState;

  const newOrder = orders?.map((obj) => {
    if (obj?.orderDate) {
      return { ...obj, orderDate: moment(obj.orderDate).format("MMM Do YY") };
    }
    return obj;
  });

  const withTotalPrice = Object.values(
    newOrder?.reduce((obj, item) => {
      let key = item.orderDate;
      if (!obj[key]) {
        obj[key] = Object.assign(item);
      } else {
        obj[key].totalPrice += item.totalPrice;
      }
      return obj;
    }, {})
  );

  const reversed = withTotalPrice?.reverse();
  const sliced = reversed?.slice(0, 7).reverse();

  const labels = sliced?.map((x) => x.orderDate);

  const lineData = sliced?.map((x) => x.totalPrice);

  return (
    <div>
      <Line
        width={800}
        height={450}
        data={{
          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  usePointStyle: true,
                },
              },
              title: {
                display: true,
                text: "Title",
              },
            },
            scales: {
              x: {
                ticks: {
                  callback: function (val, index) {
                    // Hide the label of every 2nd dataset
                    return index % 2 === 0 ? this.getLabelForValue(val) : "";
                  },
                  color: "blue",
                  align: "end",
                },
              },
            },
          },

          labels: labels,
          datasets: [
            {
              label: "Total Sales",
              data: lineData,
              fill: false,
              borderColor: "#2C7BE5",
              backgroundColor: "#2C7BE5",
              borderRadius: "100",
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChart;
