#!/usr/bin/env pwsh

# Script para ejecutar pruebas de endpoints con hurl
# Requisito: Tener hurl instalado (https://hurl.dev)

Write-Host "🚀 Iniciando pruebas de endpoints..." -ForegroundColor Green
Write-Host ""

# Verificar si hurl está instalado
$hurl = Get-Command hurl -ErrorAction SilentlyContinue
if (-not $hurl) {
    Write-Host "❌ hurl no está instalado" -ForegroundColor Red
    Write-Host "Instálalo con: cargo install hurl" -ForegroundColor Yellow
    Write-Host "O descárgalo desde: https://hurl.dev" -ForegroundColor Yellow
    exit 1
}

# Verificar si Docker está corriendo
$docker = Get-Command docker -ErrorAction SilentlyContinue
if (-not $docker) {
    Write-Host "❌ Docker no está disponible" -ForegroundColor Red
    exit 1
}

# Verificar si el contenedor está corriendo
$container = docker ps | Select-String "pds006-container"
if (-not $container) {
    Write-Host "⚠️  El contenedor pds006-container no está corriendo" -ForegroundColor Yellow
    Write-Host "Inicia el contenedor con: docker start pds006-container" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Contenedor Docker está corriendo" -ForegroundColor Green
Write-Host ""

# Ejecutar las pruebas
Write-Host "📋 Ejecutando pruebas desde session.hurl..." -ForegroundColor Cyan
Write-Host ""

hurl --test .\session.hurl

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Todas las pruebas pasaron correctamente!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Algunas pruebas fallaron" -ForegroundColor Red
    exit 1
}
