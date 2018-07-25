using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaristaSample
{
    public class Pantry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Inventory Inventory { get; set; }
    }
}
