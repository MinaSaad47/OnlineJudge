FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base

# Install dependencies for Isolate
RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    libcap-dev \
    libsystemd-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/* 

# Clone the Isolate repository and build it
RUN git clone https://github.com/ioi/isolate.git /isolate && \
    cd /isolate && \
    make install
    
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Executor/OnlineJudge.Executor.csproj", "src/Executor/"]
RUN dotnet restore "src/Executor/OnlineJudge.Executor.csproj"
COPY . .
WORKDIR "/src/src/Executor"
RUN dotnet build "OnlineJudge.Executor.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "OnlineJudge.Executor.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OnlineJudge.Executor.dll"]
