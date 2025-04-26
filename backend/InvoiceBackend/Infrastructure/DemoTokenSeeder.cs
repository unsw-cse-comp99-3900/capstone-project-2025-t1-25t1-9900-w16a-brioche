using InvoiceBackend.DataAccess;
using InvoiceBackend.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace InvoiceBackend.Infrastructure
{
    public static class DemoTokenSeeder
    {
        public static void Seed(IServiceProvider services)
        {
            var context = services.GetRequiredService<AppDbContext>();
            var config = services.GetRequiredService<IConfiguration>();
            var logger = services.GetRequiredService<ILogger<Program>>();

            logger.LogInformation("[DemoTokenSeeder] Starting demo token seed process.");

            var demoSessionId = config["DemoToken:SessionId"] ?? "888";
            var demoAccessToken = config["DemoToken:AccessToken"];
            var demoRefreshToken = config["DemoToken:RefreshToken"];
            var demoTokenType = config["DemoToken:TokenType"] ?? "Bearer";
            var demoExpiryTimeStr = config["DemoToken:ExpiryTime"];

            logger.LogInformation($"[DemoTokenSeeder] Loaded configuration: SessionId={demoSessionId}, TokenType={demoTokenType}, ExpiryTime={demoExpiryTimeStr}");

            if (!context.ReckonTokens.Any(t => t.SessionId == demoSessionId))
            {
                logger.LogInformation($"[DemoTokenSeeder] No existing demo token found for SessionId={demoSessionId}. Proceeding to seed.");
                if (!string.IsNullOrEmpty(demoAccessToken) && !string.IsNullOrEmpty(demoRefreshToken) && DateTime.TryParse(demoExpiryTimeStr, out var demoExpiryTime))
                {
                    logger.LogInformation("[DemoTokenSeeder] All required configuration values are present. Inserting demo token into database.");
                    context.ReckonTokens.Add(new ReckonToken
                    {
                        SessionId = demoSessionId,
                        AccessToken = demoAccessToken,
                        RefreshToken = demoRefreshToken,
                        TokenType = demoTokenType,
                        ExpiryTime = demoExpiryTime.ToUniversalTime(),
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    });
                    context.SaveChanges();
                    logger.LogInformation($"[DemoTokenSeeder] Successfully seeded demo ReckonToken for SessionId={demoSessionId}.");
                }
                else
                {
                    logger.LogWarning("[DemoTokenSeeder] DemoToken configuration is incomplete (AccessToken, RefreshToken, or ExpiryTime missing or invalid). Demo token not inserted.");
                }
            }
            else
            {
                logger.LogInformation($"[DemoTokenSeeder] Demo token for SessionId={demoSessionId} already exists in the database. No action taken.");
            }

            logger.LogInformation("[DemoTokenSeeder] Demo token seed process completed.");
        }
    }
} 