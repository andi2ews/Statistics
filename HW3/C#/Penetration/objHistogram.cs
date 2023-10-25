using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms.DataVisualization.Charting;

namespace Penetration
{
    internal class objHistogram
    {
        Chart chart;
        public string type;

        public objHistogram(List<List<int>> attacks, string type)
        {
            this.type = type;
            if (type == "score") this.buildScoreHistogram(attacks, type);
            else this.buildComulativeHistogram(attacks, type);

        }

        private void buildScoreHistogram(List<List<int>> attacks, string type)
        {
            chart = new Chart();

            chart.ChartAreas.Add("Area");

            chart.Titles.Add("SCORE HISTOGRAM");

            Series series = new Series("s");
            chart.Series.Add(series);

            chart.Series[series.Name].ChartType = SeriesChartType.Column;

            Dictionary<int, int> scores = new Dictionary<int, int>();

           

            foreach (var att in attacks)
            {
                var score = 0;
                for (int i = 0; i < attacks[0].Count; i++)
                {
                    score += att[i];
                }
                scores[score] = scores.ContainsKey(score) ? scores[score] + 1 : 1;
            }

            foreach (var kvp in scores)
            {
                chart.Series[series.Name].Points.AddXY(kvp.Key, kvp.Value);
            }

        }

        private void buildComulativeHistogram(List<List<int>> attacks, string type)
        {
            chart = new Chart();

            chart.ChartAreas.Add("Area");

            chart.Titles.Add(type.ToUpper() + " HISTOGRAM");

            Series series = new Series("s");
            chart.Series.Add(series);

            chart.Series[series.Name].ChartType = SeriesChartType.Column;

            var comulative = 0;

            for (int i = 0; i < attacks[0].Count; i++)
            {

                for (int j = 0; j < attacks.Count; j++)
                {
                    if (attacks[j][i] == -1)
                    {
                        comulative++;
                    }

                }

                switch (type)
                {
                    case "comulative":
                        chart.Series[series.Name].Color = System.Drawing.Color.Red;
                        chart.Series[series.Name].Points.AddXY(i + 1, comulative);
                        break;
                    case "comulative_relative_frequency":
                        chart.Series[series.Name].Color = System.Drawing.Color.Green;
                        chart.ChartAreas[0].AxisY.Maximum = 1;
                        chart.Series[series.Name].Points.AddXY(i + 1, (double)comulative / ((i + 1) * attacks.Count));
                        break;
                    case "ratio":
                        chart.Series[series.Name].Color = System.Drawing.Color.Black;
                        chart.Series[series.Name].Points.AddXY(i + 1, (double)comulative / (Math.Sqrt(((i + 1) * attacks.Count))));
                        break;
                    case "optional_D":
                        chart.Series[series.Name].Color = System.Drawing.Color.HotPink;
                        chart.Series[series.Name].Points.AddXY(i + 1,comulative);
                        comulative = 0;
                        break;
                    default:
                        break;
                }

            }
        }

        public Chart getHistogram()
        {
            return this.chart;
        }
    }
}
