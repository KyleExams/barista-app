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
				Inventory = new Inventory(45, 45, 45) // Assumption that pantries start with 3 bags with 15 units inside each.
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

		public IEnumerable<OrderHistory> GetOrderHistory()
		{
			return orders;
		}
	}
}
