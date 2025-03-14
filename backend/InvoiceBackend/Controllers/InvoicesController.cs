using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System.Net.Http.Headers;
using InvoiceBackend.Services.ReckonApiService;

namespace InvoiceBackend.Controllers
{
    [ApiController]
    [Route("api/invoices")]
    [EnableCors("AllowAll")]
    public class InvoicesController : ControllerBase
    {
        private static readonly List<object> invoices = new List<object>
        {
            new {
                id = "inv_001",
                invoiceNumber = "INV-2024-001",
                amount = 1250.50,
                date = "2024-03-15T00:00:00Z",
                dueDate = "2024-04-15T00:00:00Z",
                status = "PENDING"
            },
            new {
                id = "inv_002",
                invoiceNumber = "INV-2024-002",
                amount = 2800.75,
                date = "2024-03-16T00:00:00Z",
                dueDate = "2024-04-16T00:00:00Z",
                status = "PAID"
            },
            new {
                id = "inv_003",
                invoiceNumber = "INV-2024-003",
                amount = 950.25,
                date = "2024-03-17T00:00:00Z",
                dueDate = "2024-04-17T00:00:00Z",
                status = "OVERDUE"
            }
        };

        private readonly IReckonApiService _apiService;

        public InvoicesController(IReckonApiService apiService)
        {
            _apiService = apiService;
        }

        [HttpGet("test")]
        public IActionResult GetInvoices()
        {
            var response = new { list = invoices };
            return Ok(response);
        }

        [HttpPost("test")]
        public IActionResult AddInvoice([FromBody] object invoice)
        {
            invoices.Add(invoice);
            return Ok(new { message = "Invoice added successfully!" });
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetInvoices(string bookId)
        {
            HttpResponseMessage response = await _apiService.CallApiAsync(bookId, "invoices", HttpMethod.Get);
            string responseText = await response.Content.ReadAsStringAsync();

            return StatusCode((int)response.StatusCode, responseText);
        }
    }
}
