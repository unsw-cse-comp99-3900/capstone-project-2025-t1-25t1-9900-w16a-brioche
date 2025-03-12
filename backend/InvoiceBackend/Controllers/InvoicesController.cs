using Microsoft.AspNetCore.Mvc;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/invoices")]
    public class InvoicesController : ControllerBase
    {
        private static List<string> invoices = new List<string> { "Invoice1", "Invoice2" };

        [HttpGet]
        public IActionResult GetInvoices()
        {
            return Ok(invoices);
        }

        [HttpPost]
        public IActionResult AddInvoice([FromBody] string invoice)
        {
            invoices.Add(invoice);
            return Ok(new { message = "Invoice added successfully!" });
        }
    }
}
