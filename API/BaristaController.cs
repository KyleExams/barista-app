using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaristaSample
{
    [Route("barista")]
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
            catch(Exception ex)
            {
                return StatusCode((int)HttpStatusCode.NotFound, ex.Message);
            }
        }

        [Route("addpantry/{name}")]
        [HttpPost]
        public IActionResult AddPantry(string name)
        {
            _baristaService.AddPantry(name);

            return Ok();
        }

        //// PUT api/<controller>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
