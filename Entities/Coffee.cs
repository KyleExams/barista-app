using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaristaSample
{
    public enum CoffeeType
    {
        NA = 0,
        DoubleAmericano = 1,
        SweetLatte = 2,
        FlatWhite = 3
    }

    public class Coffee
    {
        public string Name
        {
            get
            {
                return Name;
            }
            set
            {
                Name = value;
                switch (Name)
                {
                    case "Double Americano":
                        CoffeeType = CoffeeType.DoubleAmericano;
                        break;
                    case "Sweet Latte":
                        CoffeeType = CoffeeType.SweetLatte;
                        break;
                    case "Flat White":
                        CoffeeType = CoffeeType.FlatWhite;
                        break;
                    default:
                        CoffeeType = CoffeeType.NA;
                        break;
                }
            }
        }
        public int CoffeeBeansUnits { get; set; }
        public int SugarUnits { get; set; }
        public int MilkUnits { get; set; }
        public string ImagePath { get; set; }
        public CoffeeType CoffeeType { get; set; }
    }
}
