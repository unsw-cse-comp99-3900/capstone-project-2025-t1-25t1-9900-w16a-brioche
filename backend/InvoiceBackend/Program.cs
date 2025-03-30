using InvoiceBackend.DataAccess;
using InvoiceBackend.DataAccess.ReckonTokenRepository;
using InvoiceBackend.Services.ClerkAuthService;
using InvoiceBackend.Services.ReckonApiService;
using InvoiceBackend.Services.ReckonTokenService;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// EF Core
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IReckonApiService, ReckonApiService>();
builder.Services.AddScoped<IClerkAuthService, ClerkAuthService>();
builder.Services.AddScoped<IReckonTokenRepository, ReckonTokenRepository>();
builder.Services.AddScoped<IReckonTokenService, ReckonTokenService>();

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS to allow any origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
            //policy.WithOrigins("http://localhost:5173")
            //      .AllowAnyHeader()
            //      .AllowAnyMethod()
            //      .AllowCredentials();
        });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS with the "allow all" policy
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

// add a comment to test ci
