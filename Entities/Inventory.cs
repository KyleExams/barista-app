using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaristaSample
{
    public class Inventory
    {
        public int CoffeeBeansUnits { get; set; }
        public int SugarUnits { get; set; }
        public int MilkUnits { get; set; }

        public Inventory(int coffeeBeansUnits, int sugarUnits, int milkUnits)
        {
            CoffeeBeansUnits = coffeeBeansUnits;
            SugarUnits = sugarUnits;
            MilkUnits = milkUnits;
        }
    }
}
