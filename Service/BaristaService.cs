using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaristaSample
{
	/// <summary>
	/// Fake layer that acts as service and data persistence.
	/// No data will be saved, all will be lost when server restarts.
	/// </summary>
	public class BaristaService : IBaristaService
	{
		public List<Pantry> pantries;
		public List<OrderHistory> orders;

		public BaristaService()
		{
			pantries = new List<Pantry>();
			orders = new List<OrderHistory>();
		}

		public int AddPantry(string name)
		{
			var newPantry = new Pantry
			{
				Id = pantries.Count + 1,
				Name = name,
				Inventory = new Inventory(3, 3, 3) // Assumption that pantries start with 3 bags with 15 units inside each.
			};

			pantries.Add(newPantry);

			return newPantry.Id;
		}

		public IEnumerable<Pantry> GetPantries()
		{
			return pantries;
		}

		public Pantry GetPantry(int id)
		{
			if (!pantries.Any(o => o.Id == id))
			{
				throw new ApplicationException("Pantry not found");
			}

			return pantries.Single(o => o.Id == id);
		}

		public void AddOrder(OrderHistory order)
		{
			var pantry = pantries.Single(o => o.Id == order.PantryId);

			switch (order.CoffeeType)
			{
				case CoffeeType.DoubleAmericano:
					if (pantry.Inventory.CoffeeBeansUnits < 3)
					{
						throw new ApplicationException("Insufficient ingredients to complete request.");
					}
					pantry.Inventory.CoffeeBeansUnits -= 3;
					break;
				case CoffeeType.SweetLatte:
					if (pantry.Inventory.CoffeeBeansUnits < 2 ||
						pantry.Inventory.SugarUnits < 5 ||
						pantry.Inventory.MilkUnits < 3)
					{
						throw new ApplicationException("Insufficient ingredients to complete request.");
					}
					pantry.Inventory.CoffeeBeansUnits -= 2;
					pantry.Inventory.SugarUnits -= 5;
					pantry.Inventory.MilkUnits -= 3;
					break;
				case CoffeeType.FlatWhite:
					if (pantry.Inventory.CoffeeBeansUnits < 2 ||
							pantry.Inventory.SugarUnits < 1 ||
							pantry.Inventory.MilkUnits < 4)
					{
						throw new ApplicationException("Insufficient ingredients to complete request.");
					}
					pantry.Inventory.CoffeeBeansUnits -= 2;
					pantry.Inventory.SugarUnits -= 1;
					pantry.Inventory.MilkUnits -= 4;
					break;
				default:
					throw new ApplicationException("Invalid coffee type");
			}

			orders.Add(order);
		}

		public IEnumerable<OrderHistory> GetOrderHistory(int pantryId)
		{
			var pantry = GetPantry(pantryId);
			return orders.Where(o => o.PantryId == pantry.Id).OrderByDescending(o => o.OrderDate);
		}

		public IEnumerable<ReportGroup> GetRemainingStocksReportData(int pantryId)
		{
			var pantry = GetPantry(pantryId);
			var reportItems = new ReportGroup[]
			{
				new ReportGroup
				{
					Name = "Coffee Bags",
					Series = new ReportItem[]
					{
						new ReportItem
						{
							Name = "Supplied",
							Value = pantry.Inventory.CoffeeBeansBags
						},
						new ReportItem
						{
							Name = "Remaining",
							Value = Math.Round(pantry.Inventory.CoffeeBeansUnits / 15M, 2)
						}
					}
				},
				new ReportGroup
				{
					Name = "Sugar Packs",
					Series = new ReportItem[]
					{
						new ReportItem
						{
							Name = "Supplied",
							Value = pantry.Inventory.SugarPacks
						},
						new ReportItem
						{
							Name = "Remaining",
							Value = Math.Round(pantry.Inventory.SugarUnits / 15M, 2)
						}
					}
				},
				new ReportGroup
				{
					Name = "Milk Cartons",
					Series = new ReportItem[]
					{
						new ReportItem
						{
							Name = "Supplied",
							Value = pantry.Inventory.MilkCartons
						},
						new ReportItem
						{
							Name = "Remaining",
							Value = Math.Round(pantry.Inventory.MilkUnits / 15M, 2)
						}
					}
				}
			};

			return reportItems;
		}
	}
}
