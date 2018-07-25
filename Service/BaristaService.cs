using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaristaSample
{
    /// <summary>
    /// Fake layer that acts as service and data
    /// </summary>
    public class BaristaService : IBaristaService
    {
        public List<Pantry> pantries;

        public BaristaService()
        {
            pantries = new List<Pantry>();
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
                throw new KeyNotFoundException("Pantry not found");
            }

            return pantries.Single(o => o.Id == id);
        }
    }
}
