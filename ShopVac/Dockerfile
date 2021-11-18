FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.sln *.csproj ./
COPY Tests/*.csproj ./Tests/
RUN dotnet restore *.sln

# Copy everything else
COPY . ./

# Build app
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine
WORKDIR /app
COPY --from=build-env /app/out .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet ShopVac.dll
