using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Penetration
{
    internal class Attack
    {
        public List<List<int>> systems = new List<List<int>>();

        List<double> prob = new List<double>();


        public Attack(int M, int N)
        {
            for (int i = 0; i < M; i++)
            {
                systems.Add(new List<int>());
                for (int j = 0; j < N; j++)
                {
                    systems[i].Add(0);
                }

            }
            this.generateRandomProbability();
        }

        public void generateAttack()
        {
            Random random = new Random();

            for (int i = 0; i < systems[0].Count; i++)
            {
                for (int j = 0; j < systems.Count; j++)
                {
                    var nextRandom = random.NextDouble();
                    this.systems[j][i] = nextRandom <= prob[j] ? -1 : 1;
                }
            }
        }

        public List<List<int>> getSystems()
        {
            return this.systems;
        }

        private void generateRandomProbability()
        {
            Random r = new Random();
            for (int i = 0;i < this.systems.Count;i++)
            {
                var nextRandom = r.NextDouble();
                nextRandom = Math.Round(nextRandom, 2);
                this.prob.Add(nextRandom);
            }
        }
    }
}
