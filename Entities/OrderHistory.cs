using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaristaSample
{
    public class OrderHistory
    {
        public CoffeeType CoffeeType { get; set; }
        public DateTime OrderDate { get; set; }
        public int PantryId { get; set; }
    }
}
