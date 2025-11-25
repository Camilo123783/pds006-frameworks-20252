#!/usr/bin/env pwsh

# Script para ejecutar hurl con variable de host

param(
    [string]$Host = "http://localhost:8000",
    [switch]$Verbose
)

Write-Host "🚀 Ejecutando tests de API..." -ForegroundColor Green
Write-Host "Host: $Host`n" -ForegroundColor Cyan

$hurlCmd = "hurl session.hurl --variable host=$Host"

if ($Verbose) {
    $hurlCmd += " --verbose"
}

Write-Host "Comando: $hurlCmd`n" -ForegroundColor Yellow

Invoke-Expression $hurlCmd

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Tests completados exitosamente!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Tests fallaron" -ForegroundColor Red
    exit 1
}
