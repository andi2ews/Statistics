using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization.Charting;

namespace Penetration
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }



        private void Form1_Load(object sender, EventArgs e)
        {

            Rectangle rect = new Rectangle(0, 0, 740, 200);
            Rectangle rect2 = new Rectangle(0, 205, 740, 200);
            Rectangle rect3 = new Rectangle(0, 410, 740, 200);
            Rectangle rect4 = new Rectangle(0, 615, 740, 200);

            Rectangle rect5 = new Rectangle(745, 0, 740, 200);
            Rectangle rect6 = new Rectangle(745, 205, 740, 200);
            Rectangle rect7 = new Rectangle(745, 410, 740, 200);
            Rectangle rect8 = new Rectangle(745, 615, 740, 200);


            //resizable rectangles building
            ResizableRect resizable = new ResizableRect(rect, Color.Brown);
            ResizableRect resizable2 = new ResizableRect(rect2, Color.Green);
            ResizableRect resizable3 = new ResizableRect(rect3, Color.Black);
            ResizableRect resizable4 = new ResizableRect(rect4, Color.DarkBlue);

            ResizableRect resizable5 = new ResizableRect(rect5, Color.DarkViolet);
            ResizableRect resizable6 = new ResizableRect(rect6, Color.Goldenrod);
            ResizableRect resizable7 = new ResizableRect(rect7, Color.IndianRed);
            ResizableRect resizable8 = new ResizableRect(rect8, Color.HotPink);



            panel1.Controls.Add(resizable.myPictureBox);
            panel1.Controls.Add(resizable2.myPictureBox);
            panel1.Controls.Add(resizable3.myPictureBox);
            panel1.Controls.Add(resizable4.myPictureBox);
            panel1.Controls.Add(resizable5.myPictureBox);
            panel1.Controls.Add(resizable6.myPictureBox);
            panel1.Controls.Add(resizable7.myPictureBox);
            panel1.Controls.Add(resizable8.myPictureBox);


            //generation of all attacks 
            Attack attack = new Attack(1000, 3000);

            attack.generateAttack();

            List<List<int>> systems = attack.getSystems();


            //charts building
            objChart objChart1 = new objChart(systems, "score");
            objHistogram objHist1 = new objHistogram(systems, "score");

            objChart objChart2 = new objChart(systems, "comulative");
            objHistogram objHist2 = new objHistogram(systems, "comulative");


            objChart objChart3 = new objChart(systems, "comulative_relative_frequency");
            objHistogram objHist3 = new objHistogram(systems, "comulative_relative_frequency");

            objChart objChart4 = new objChart(systems, "ratio");
            objHistogram objHist4 = new objHistogram(systems, "ratio");

            //charts drawing inside rectangles
            resizable.drawChart(objChart1);
            resizable2.drawChart(objChart2);
            resizable3.drawChart(objChart3);
            resizable4.drawChart(objChart4);
            resizable5.drawHistogram(objHist1);
            resizable6.drawHistogram(objHist2);
            resizable7.drawHistogram(objHist3);
            resizable8.drawHistogram(objHist4);


        }

   
    }

}
