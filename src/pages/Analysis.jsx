import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import { EnvelopesContext } from "../context/EnvelopesContext";

function Analysis() {
  const [envelopesArray, setEnvelopesArray] = useState([]);
  const { envelopes } = useContext(EnvelopesContext);
  useEffect(() => {
    if (envelopes) {
      setEnvelopesArray(Object.values(envelopes));
    }
  }, [envelopes]);
  console.log({
    name: "Expenses",
    data: envelopesArray.map((envelope) => ({
      x: envelope.title,
      y: envelope?.expenses?.reduce((accum, data) => accum + data.amount, 0),
      goals: [
        {
          name: "Budget",
          value: envelope.budget,
          strokeWidth: 5,
          strokeHeight: 10,
          strokeColor: "#775DD0",
        },
      ],
    })),
  });
  return (
    <div className="my-8 sm:mx-auto sm:w-full sm:max-w-4xl">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h1 className="font-semibold text-center text-green-500">
          Graphs & Charts
        </h1>
        <div className="w-full flex justify-start items-center">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="pt-3">
            <h2 className="text-xl font-semibold font-mono text-center">
              Expense Distribution
            </h2>
            <ReactApexChart
              options={{
                labels: envelopesArray.map((envelope) => envelope.title),

                tooltip: {
                  y: {
                    formatter: function (val) {
                      return val + ".00" + " Rs";
                    },
                  },
                },
              }}
              series={envelopesArray.map((envelope) =>
                envelope?.expenses?.reduce(
                  (accum, data) => accum + data.amount,
                  0
                )
              )}
              type="pie"
              width="360"
            />
          </div>
          <div className="pt-3">
            <h2 className="text-xl font-semibold font-mono text-center">
              Expense Overflow
            </h2>
            <ReactApexChart
              series={[
                {
                  name: "Expenses",
                  data: envelopesArray.map((envelope) => ({
                    x: envelope.title,
                    y: envelope?.expenses?.reduce(
                      (accum, data) => accum + data.amount,
                      0
                    ),
                    goals: [
                      {
                        name: "Budget",
                        value: envelope.budget,
                        strokeWidth: 5,
                        strokeHeight: 17,
                        strokeColor: "#775DD0",
                      },
                    ],
                  })),
                },
              ]}
              options={{
                chart: {
                  height: 350,
                  type: "bar",
                },
                plotOptions: {
                  bar: {
                    horizontal: true,
                  },
                },
                colors: ["#00E396"],
                dataLabels: {
                  formatter: function (val, opt) {
                    const goals =
                      opt.w.config.series[opt.seriesIndex].data[
                        opt.dataPointIndex
                      ].goals;

                    if (goals && goals.length) {
                      return `${val} / ${goals[0].value} Rs`;
                    }
                    return val;
                  },
                },
                legend: {
                  show: true,
                  showForSingleSeries: true,
                  customLegendItems: ["Expenses", "Budget"],
                  markers: {
                    fillColors: ["#00E396", "#775DD0"],
                  },
                },
              }}
              type="bar"
              width="360"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
