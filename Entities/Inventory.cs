using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaristaSample
{
    public class Inventory
    {
		public int CoffeeBeansBags { get; set; }
		public int SugarPacks { get; set; }
		public int MilkCartons { get; set; }
		public int CoffeeBeansUnits { get; set; }
        public int SugarUnits { get; set; }
        public int MilkUnits { get; set; }

        public Inventory(int coffeeBeansBags, int sugarBags, int milkBags)
        {
			CoffeeBeansBags = coffeeBeansBags;
			SugarPacks = sugarBags;
			MilkCartons = milkBags;
			CoffeeBeansUnits = CoffeeBeansBags * 15;
            SugarUnits = SugarPacks * 15;
            MilkUnits = MilkCartons * 15;
        }

		public void AddCoffeeInventory(int bags)
		{
			CoffeeBeansBags += bags;
			CoffeeBeansUnits += (bags * 15);
		}

		public void AddSugarInventory(int bags)
		{
			SugarPacks += bags;
			SugarUnits += (bags * 15);
		}

		public void AddMilkInventory(int bags)
		{
			MilkCartons += bags;
			MilkUnits += (bags * 15);
		}
	}
}
