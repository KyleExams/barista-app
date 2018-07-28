using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaristaSample
{
	[Route("api/barista")]
	public class BaristaController : Controller
	{
		private readonly IBaristaService _baristaService;

		public BaristaController(IBaristaService baristaService)
		{
			_baristaService = baristaService;
		}

		[Route("getpantries")]
		[HttpGet]
		public IActionResult GetPantries()
		{
			var result = _baristaService.GetPantries();

			return Ok(result);
		}

		[Route("getpantry/{id}")]
		[HttpGet]
		public IActionResult GetPantry(int id)
		{
			try
			{
				var result = _baristaService.GetPantry(id);

				return Ok(result);
			}
			catch (Exception ex)
			{
				return StatusCode((int)HttpStatusCode.NotFound, ex.Message);
			}
		}

		[Route("addpantry")]
		[HttpPost]
		public IActionResult AddPantry([FromBody]AddPantryRequest request)
		{
			var result = _baristaService.AddPantry(request.name.Trim());

			return Ok(result);
		}

		[Route("getorderhistory/{pantryId}")]
		[HttpGet]
		public IActionResult GetOrders(int pantryId)
		{
			var result = _baristaService.GetOrderHistory(pantryId);

			return Ok(result);
		}

		[Route("addorder")]
		[HttpPost]
		public IActionResult AddOrder([FromBody]AddOrderRequest request)
		{
			var order = new OrderHistory
			{
				CoffeeType = (CoffeeType)request.coffeeType,
				OrderDate = DateTime.UtcNow,
				PantryId = request.pantryId
			};

			try
			{
				_baristaService.AddOrder(order);

				return Ok(0);
			}
			catch (Exception ex)
			{
				return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
			}
		}

		[Route("getremainingstocks/{pantryId}")]
		[HttpGet]
		public IActionResult GetRemainingStocksReportData(int pantryId)
		{
			var result = _baristaService.GetRemainingStocksReportData(pantryId);

			return Ok(result);
		}

		[Route("getdrinksordered/{pantryId}")]
		[HttpGet]
		public IActionResult GetDrinksOrderedReportData(int pantryId)
		{
			var result = _baristaService.GetDrinksOrderedReportData(pantryId);

			return Ok(result);
		}
	}
}

public class AddPantryRequest
{
	public string name { get; set; }
}

public class AddOrderRequest
{
	public int coffeeType { get; set; }
	public int pantryId { get; set; }
}
