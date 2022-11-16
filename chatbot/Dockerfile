#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "YoungCarersAustria.Chatbot.Web/YoungCarersAustria.Chatbot.Web.csproj"
# COPY . .
# WORKDIR "/src/."
RUN dotnet build "YoungCarersAustria.Chatbot.Web/YoungCarersAustria.Chatbot.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "YoungCarersAustria.Chatbot.Web/YoungCarersAustria.Chatbot.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "YoungCarersAustria.Chatbot.Web.dll"]
