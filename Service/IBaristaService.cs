using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaristaSample
{
    public interface IBaristaService
    {
        int AddPantry(string name);
        IEnumerable<Pantry> GetPantries();
        Pantry GetPantry(int id);
    }
}
