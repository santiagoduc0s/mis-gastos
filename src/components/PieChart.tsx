import { useAppSelector } from "@/store";
import { getSumExpenses } from "@/store/slices";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  Chart,
  TooltipModel,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: React.FC = () => {
  const { board } = useAppSelector((state) => state.board);

  const valueExp = getSumExpenses(board);

  const dataPie = {
    labels: Object.keys(valueExp).map((id) => board.columns[id].title),
    datasets: [
      {
        label: "$",
        data: Object.values(valueExp),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 129, 102, 0.2)",
          "rgba(54, 132, 205, 0.2)",
          "rgba(255, 226, 76, 0.2)",
          "rgba(95, 182, 182, 0.2)",
          "rgba(133, 92, 245, 0.2)",
          "rgba(179, 219, 91, 0.2)",
          "rgba(210, 85, 85, 0.2)",
          "rgba(52, 73, 94, 0.2)",
          "rgba(241, 196, 15, 0.2)",
          "rgba(231, 76, 60, 0.2)",
          "rgba(26, 188, 156, 0.2)",
          "rgba(46, 204, 113, 0.2)",
          "rgba(230, 126, 34, 0.2)",
          "rgba(155, 89, 182, 0.2)",
          "rgba(52, 152, 219, 0.2)",
          "rgba(127, 140, 141, 0.2)",
          "rgba(3, 169, 244, 0.2)",
          "rgba(0, 150, 136, 0.2)",
          "rgba(156, 39, 176, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 129, 102, 1)",
          "rgba(54, 132, 205, 1)",
          "rgba(255, 226, 76, 1)",
          "rgba(95, 182, 182, 1)",
          "rgba(133, 92, 245, 1)",
          "rgba(179, 219, 91, 1)",
          "rgba(210, 85, 85, 1)",
          "rgba(52, 73, 94, 1)",
          "rgba(241, 196, 15, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(26, 188, 156, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(230, 126, 34, 1)",
          "rgba(155, 89, 182, 1)",
          "rgba(52, 152, 219, 1)",
          "rgba(127, 140, 141, 1)",
          "rgba(3, 169, 244, 1)",
          "rgba(0, 150, 136, 1)",
          "rgba(156, 39, 176, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsPie = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== undefined) {
              label +=
                "$" + new Intl.NumberFormat("de-DE").format(context.parsed);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div>
      <Pie
        data={dataPie}
        options={optionsPie}
      />
    </div>
  );
};
