using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Survey
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private List<Dictionary<string, string>> CSVReader(string filename)
        {
            List<Dictionary<string, string>> table = new List<Dictionary<string, string>>();

            var path = Path.Combine(Directory.GetCurrentDirectory(), filename);
            using (var reader = new StreamReader(@path))
            {

                var headers = Regex.Split(reader.ReadLine(), ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                while (!reader.EndOfStream)
                {
                    var rowData = Regex.Split(reader.ReadLine(), ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

                    Dictionary<string, string> row = new Dictionary<string, string>();

                    for (int i = 0; i < rowData.Length; i++)
                    {
                        row[headers[i]] = rowData[i];
                    }
                    
                    table.Add(row);
                }
            }
            return table;
        }


        private void getVariableFrequency(List<Dictionary<string, string>> survey, string variable)
        {
            Dictionary<string, int> frequencies = new Dictionary<string, int>();

            for (int i = 0; i < survey.Count; i++)
            {
                var value = survey[i][variable];
                frequencies[value] = frequencies.ContainsKey(value) ? frequencies[value] + 1 : 1;
            }

            DataTable table = new DataTable();
            table.TableName = "Table";
            table.Clear();
            table.Columns.Add("Value");
            table.Columns.Add("Frequency");
            table.Columns.Add("Relative frequency");
            table.Columns.Add("Percentage frequency");

            foreach (var kvp in frequencies)
            {
                DataRow row = table.NewRow();
                row["Value"] = kvp.Key;
                row["Frequency"] = kvp.Value;
                row["Relative frequency"] = kvp.Value / ( (float) (survey.Count) );
                row["Percentage frequency"] = ( kvp.Value / ( (float)(survey.Count) ) ) * 100 + "%";
                table.Rows.Add(row);
                richTextBox1.AppendText("value : " + kvp.Key);
                richTextBox1.AppendText("        frequency : " + kvp.Value);
                richTextBox1.AppendText(Environment.NewLine);
            }

            table.WriteXml("FrequencyTable.xml");
        }

        private void getBivariateDistribution(List<Dictionary<string, string>> survey, string var1, string var2)
        {
            Dictionary<string, int> frequencies = new Dictionary<string, int>();

            for (int i = 0; i < survey.Count; i++)
            {
                var value1 = survey[i][var1]; 
                var value2 = survey[i][var2];
                var str = "" + value1 + " : " + value2;
                frequencies[str] = frequencies.ContainsKey(str) ? frequencies[str] + 1 : 1;
            }

            DataTable table = new DataTable();
            table.TableName = "Table";
            table.Clear();
            table.Columns.Add("" + var1 + " | " + var2);
            table.Columns.Add("Joint requency");
            table.Columns.Add("Joint relative frequency");
            table.Columns.Add("Joint percentage frequency");

            foreach (var kvp in frequencies)
            {
                DataRow row = table.NewRow();
                row["" + var1 + " | " + var2] = kvp.Key;
                row["Joint requency"] = kvp.Value;
                row["Joint relative frequency"] = kvp.Value / ((float)(survey.Count));
                row["Joint percentage frequency"] = (kvp.Value / ((float)(survey.Count))) * 100 + "%";
                table.Rows.Add(row);
                richTextBox1.AppendText(kvp.Key);
                richTextBox1.AppendText("        frequency : " + kvp.Value);
                richTextBox1.AppendText(Environment.NewLine);
            }

            table.WriteXml("BivariateTable.xml");

        }


        private void button1_Click(object sender, EventArgs e)
        {
            List<Dictionary<string, string>> table = CSVReader("survey.csv");
            getVariableFrequency(table, "Enterpreneurial attitude (0-5)");
            getBivariateDistribution(table, "Age", "Sex");

        }

    }
}
