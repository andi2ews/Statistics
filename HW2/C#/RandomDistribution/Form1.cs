using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace RandomDistribution
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            richTextBox1.Clear();
            int N = (int) numericUpDown1.Value;
            int K = (int)numericUpDown2.Value;

            Random random = new Random();
            

            Dictionary<string, int> frequencies = new Dictionary<string, int>();

            
            // initialize frequency dictionary with ranges 
            for (var i = 1; i <= K; i++)
            {
                var interval = (1.0 / K);
                string range = "" + interval * (i - 1) + "-" + interval * i;
                frequencies[range] = 0;
            }

            for (var i = 0; i < N; i++)
            {
                var nextRandom = random.NextDouble();
                for (var j = 1; j <= K; j++)
                {
                    var interval = (1.0 / K);
                    var start = interval * (j - 1);
                    var end = interval * (j);
                    if (nextRandom >= start && nextRandom <= end)
                    {
                        var str = "" + start + "-" + end;
                        frequencies[str] += 1;
                    }
                }
            }
            foreach (var kv in frequencies)
            {
                richTextBox1.AppendText(kv.Key + " :   " + kv.Value + Environment.NewLine);
            }

        }
    }
}
