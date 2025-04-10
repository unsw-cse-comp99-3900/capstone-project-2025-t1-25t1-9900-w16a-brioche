using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InvoiceBackend.Migrations
{
    /// <inheritdoc />
    public partial class SeedReckonTokenData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ReckonTokens",
                columns: new[] { "Id", "AccessToken", "CreatedAt", "ExpiryTime", "RefreshToken", "SessionId", "TokenType", "UpdatedAt" },
                values: new object[] { 1, "bfdf433c15482b40aa1940d865a999ec", new DateTime(2025, 4, 10, 13, 47, 37, 277, DateTimeKind.Unspecified).AddTicks(1703), new DateTime(2025, 4, 10, 16, 47, 37, 276, DateTimeKind.Unspecified).AddTicks(6302), "32f262f7c1cc60767bc9da0f15c2a3e6", "888", "Bearer", new DateTime(2025, 4, 10, 13, 47, 37, 277, DateTimeKind.Unspecified).AddTicks(1951) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ReckonTokens",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
