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
        public int CoffeeBeansUnits { get; set; }
        public int SugarUnits { get; set; }
        public int MilkUnits { get; set; }
        public CoffeeType CoffeeType { get; set; }
    }
}
