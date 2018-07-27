using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaristaSample
{
    public class ReportItem
    {
        public string Name { get; set; }
		public decimal Value { get; set; }
    }

	public class ReportGroup
	{
		public string Name { get; set; }
		public ReportItem[] Series { get; set; }
	}
}
