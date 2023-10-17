using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Structures
{
    internal class DataStructures
    {
        public void ArrayOperations()
        {
            int[] array = new int[] { 1, 2, 3, 4, 5 };

            array = array.Concat(new int[] { 6 }).ToArray(); //push an element at the end of the array
            array[0] = 0;   //set an element 

            bool isPresent = array.Contains(0);     //check if an element is present inside the array
            int index = Array.IndexOf(array, 0);     //get the index of an element, if present

            Console.WriteLine(array.Length);
            
            for (int i = 0; i < array.Length; i++) {
                Console.WriteLine(array[i]);
            }
        }

        public void ListOperations()
        {
            List<string> list = new List<string>();

            list.Add("Hello World!"); list.Add("Cryptomaniac");

            list.Insert(0, "inserted");   // insert an element at index i 

            Console.WriteLine(list.ToArray());

            list.Remove("inserted");

            Console.WriteLine(list.ToArray());

            string hello = list[0];

            list[0] = "Bye Bye World";

            foreach (var str in list)
            {
                Console.WriteLine($"{str}");
            }

            for (int i = 0; i < list.Count; i++)
            {
                Console.WriteLine(list[i]);
            }

        }

        public void DictionaryOperations()
        {
            Dictionary<int, string> dict = new Dictionary<int, string>();
            dict[1] = "One";
            dict[2] = "Two";
            dict[3] = "Three";

            string three = dict[3];     //get a value

            foreach (var kvp in dict)
                Console.WriteLine("Key: {0}, Value: {1}", kvp.Key, kvp.Value);

            //use ContainsKey() to check for an unknown key
            if (dict.ContainsKey(3))            //check if an element is present
            {
                Console.WriteLine(dict[3]);
                dict.Remove(3);     // remove item from dict
            }
        }

        public void HashSetOperations()
        {
            HashSet<int> set = new HashSet<int>();
            for (var i = 0; i < 10; i++)
            {
                set.Add(i * i);
            }

            bool isPresent = set.Contains(4);
            if (isPresent) set.Remove(4);

        }

        public void SortedSetOperations()
        {
            SortedSet<string> set1 = new SortedSet<string>();
            set1.Add("AA");
            set1.Add("AA");
            set1.Add("AB");
            set1.Add("AC");
            Console.WriteLine("Elements in SortedSet1...");

            bool isPresent = set1.Contains("AB");

            set1.Remove("AC");

            foreach (string str in set1)
            {
                Console.WriteLine(str);
            }
        }

        public void QueueOperations()
        {
            Queue<int> queue = new Queue<int>();
            queue.Enqueue(1);
            queue.Enqueue(2);
            queue.Enqueue(3);

            int extracted = queue.Dequeue();

            Console.WriteLine(extracted);
        }

        public void StackOperations()
        {
            Stack<string> stack = new Stack<string>();
            stack.Push("a");
            stack.Push("b");
            stack.Push("c");

            string extracted = stack.Pop();
        }

        
    }

}
