using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms.DataVisualization.Charting;

namespace Penetration
{
    internal class objChart
    {
        public Chart chart;
        public string type;

        public objChart(List<List<int>> attacks, string type)
        {
            chart = new Chart();
            chart.ChartAreas.Add("Area");
            chart.ChartAreas[0].AxisX.Minimum = 0;
            chart.Titles.Add(type.ToUpper());

            if (type == "score") this.buildChart(attacks, type);
            else this.buildComulativeFrequencyChart(attacks, type);
            this.type = type;
        }

        private void buildChart(List<List<int>> attacks, string type)
        {

            for (int i = 0; i < attacks.Count; i++)
            {
                Series series = new Series("s" + i);
                chart.Series.Add(series);
                var currY = 0;
                chart.Series[series.Name].Points.AddXY(0, currY);


                for (int j = 0; j < attacks[i].Count; j++)
                {
                    
                    switch (type)
                    {
                        case "score":
                            currY = attacks[i][j] == 1 ? currY += 1 : currY -= 1;
                            chart.Series[series.Name].Points.AddXY(j + 1, currY);
                            break;
                        case "frequency":
                            if (attacks[i][j] == -1) currY++;
                            chart.Series[series.Name].Points.AddXY(j + 1, currY);
                            break;
                        case "relative_frequency":
                            if (attacks[i][j] == -1) currY++;
                            chart.Series[series.Name].Points.AddXY(j + 1, (double)currY / (j + 1));
                            break;
                        case "ratio":
                            if (attacks[i][j] == -1) currY++;
                            chart.Series[series.Name].Points.AddXY(j + 1, (double)currY / Math.Sqrt((j + 1)));
                            break;
                        default:
                            break;
                    }
                }

                chart.Series[series.Name].ChartType = SeriesChartType.Line;

            }
        }

        public void buildComulativeFrequencyChart(List<List<int>> attacks, string type)
        {

            Series s = new Series("s");
            this.chart.Series.Add(s);

            var comulative = 0;
            chart.Series[s.Name].Points.AddXY(0, comulative);
            
            chart.Series[s.Name].ChartType = SeriesChartType.Line;

         

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
                        chart.Series[s.Name].Color = System.Drawing.Color.Red;
                        chart.Series[s.Name].Points.AddXY(i + 1, comulative);
                        break;
                    case "comulative_relative_frequency":
                        chart.Series[s.Name].Color = System.Drawing.Color.Green;
                        chart.ChartAreas[0].AxisY.Maximum = 1;
                        chart.Series[s.Name].Points.AddXY(i + 1, (double) comulative / ((i + 1) * attacks.Count));
                        break;
                    case "ratio":
                        chart.Series[s.Name].Color = System.Drawing.Color.Black;
                        chart.Series[s.Name].Points.AddXY(i + 1, (double) comulative / ( Math.Sqrt(((i + 1) * attacks.Count))) );
                        break;
                    case "optional_D":
                        chart.Series[s.Name].Color = System.Drawing.Color.HotPink;
                        chart.Series[s.Name].Points.AddXY(i + 1, comulative);
                        comulative = 0;
                        break;
                    default:
                        break;
                }

            }
        }

        public Chart getChart()
        {
            return this.chart;
        }
    }
}
