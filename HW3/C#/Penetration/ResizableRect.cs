using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Windows.Forms.DataVisualization;
using System.Windows.Forms.DataVisualization.Charting;

namespace Penetration
{
    internal class ResizableRect
    {
        public PictureBox myPictureBox = new PictureBox();
        public Rectangle rect;
        public Color color;

        public Bitmap b;
        public Graphics g;

        int xPos;
        int yPos;

        bool dragging = false;

        public ResizableRect(Rectangle rect, Color color) 
        {
            this.rect = rect;
            this.myPictureBox.Width = rect.Width;
            this.myPictureBox.Height = rect.Height;
            this.xPos = rect.X;
            this.yPos = rect.Y;
            this.myPictureBox.Location = new Point(xPos, yPos);

            this.color = color;

            b = new Bitmap(this.myPictureBox.Width, this.myPictureBox.Height);
            g = Graphics.FromImage(b);

            g.FillRectangle(new SolidBrush(this.color), 0, 0, this.myPictureBox.Width, this.myPictureBox.Height);
            this.myPictureBox.Image = b;

            myPictureBox.MouseDown += new MouseEventHandler(myPictureBox_MouseDown);
            myPictureBox.MouseUp += new MouseEventHandler(myPictureBox_MouseUp);
            myPictureBox.MouseMove += new MouseEventHandler(myPictureBox_MouseMove);
            myPictureBox.MouseWheel += new MouseEventHandler(myPictureBox_MouseWheel);
            myPictureBox.MouseClick += new MouseEventHandler(myPictureBox_MouseClick);
        }

        private void myPictureBox_MouseDown(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                this.dragging = true;
                xPos = e.X; yPos = e.Y;
            }
        }

        private void myPictureBox_MouseUp(object sender, MouseEventArgs e)
        {
            this.dragging = false;
        }

        private void myPictureBox_MouseMove(object sender, MouseEventArgs e)
        {
            Control c = sender as Control;
            if (dragging && c != null)
            {
                c.Top = e.Y + c.Top - yPos;
                c.Left = e.X + c.Left - xPos;
            }
        }

        private void myPictureBox_MouseWheel(object sender, MouseEventArgs e)
        {
            if (e.Delta > 0)
            {
                // The user scrolled up.
                b = new Bitmap(ResizeImage(b, this.myPictureBox.Width / 2, this.myPictureBox.Height / 2));
                this.myPictureBox.Size = new Size(this.myPictureBox.Width / 2, this.myPictureBox.Height / 2);
                this.myPictureBox.Image = b;
            }
            else
            {
                b = new Bitmap(ResizeImage(b, this.myPictureBox.Width * 2, this.myPictureBox.Height * 2));
                this.myPictureBox.Size = new Size(this.myPictureBox.Width * 2, this.myPictureBox.Height * 2);
                this.myPictureBox.Image = b;
            }
            
        }

        public Bitmap ResizeImage(Image image, int width, int height)
        {
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }

        private void myPictureBox_MouseClick(object sender, EventArgs e)
        {
            this.myPictureBox.Focus();
        }


        public void drawChart(objChart chart)
        {
            Chart c = chart.getChart();
            c.Size = this.myPictureBox.Size;

            c.SaveImage(chart.type + "Chart.png", ChartImageFormat.Png);

            b = new Bitmap(chart.type + "Chart.png");
            myPictureBox.Image = b;
        }

        public void drawHistogram(objHistogram histogram)
        {
            Chart c = histogram.getHistogram();
            c.Size = this.myPictureBox.Size;

            c.SaveImage(histogram.type + "Histogram.png", ChartImageFormat.Png);

            b = new Bitmap(histogram.type + "Histogram.png");
            myPictureBox.Image = b;
        }

    }
}
