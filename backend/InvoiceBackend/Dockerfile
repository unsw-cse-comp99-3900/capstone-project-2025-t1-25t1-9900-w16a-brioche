# Use the .NET 8 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy the project file first
COPY *.csproj .

# Copy the rest of the application code (respecting .dockerignore)
# This should happen BEFORE restore to ensure restore runs on the container's code state
COPY . .

# Restore dependencies for the specific project *after* copying all source
RUN dotnet restore "InvoiceBackend.csproj"

# Publish the specific project
# WORKDIR /source # Already in /source from the initial WORKDIR command
RUN dotnet publish "InvoiceBackend.csproj" -c Release -o /app --no-restore

# Use the .NET 8 SDK image for the final stage as well, to include EF tools
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS final
WORKDIR /app

# Install dotnet-ef tool explicitly
RUN dotnet tool install --global dotnet-ef --version 8.0.*
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy the entire source directory from the build stage
# This includes .csproj, obj/project.assets.json, and published output (which lands in /app/bin/Release/net8.0/publish in build stage, but we copy source)
# We also need the published output, so let's adjust the COPY strategy.

# Strategy: Copy source first, then overlay published output.
# Copy source required for 'dotnet ef' (including .csproj and potentially obj if restore happened)
COPY --from=build /source .

# Copy the actual published output over the source files where necessary.
# The publish command put output in /app, so we copy from /app in the build stage.
COPY --from=build /app .

# Remove potentially problematic .csproj copy from previous attempts
# COPY --from=build /source/InvoiceBackend.csproj .

# Copy the entrypoint script
COPY entrypoint.sh .

# Make the entrypoint script executable
RUN chmod +x ./entrypoint.sh

# Expose the port the app runs on
EXPOSE 5080

# Set the entrypoint script as the command to run
CMD ["./entrypoint.sh"]

# Remove the ENTRYPOINT, it will be handled by the command in docker-compose.yml
# ENTRYPOINT ["dotnet", "InvoiceBackend.dll"] 