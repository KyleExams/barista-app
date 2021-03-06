﻿using System;
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
		void AddOrder(OrderHistory order);
		IEnumerable<OrderHistory> GetOrderHistory(int pantryId);
		IEnumerable<ReportGroup> GetRemainingStocksReportData(int pantryId);
		IEnumerable<ReportItem> GetDrinksOrderedReportData(int pantryId);
	}
}
