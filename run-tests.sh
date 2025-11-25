#!/bin/bash

# Script para ejecutar pruebas de endpoints con hurl
# Requisito: Tener hurl instalado (https://hurl.dev)

echo "🚀 Iniciando pruebas de endpoints..."
echo ""

# Verificar si hurl está instalado
if ! command -v hurl &> /dev/null; then
    echo "❌ hurl no está instalado"
    echo "Instálalo con: cargo install hurl"
    echo "O descárgalo desde: https://hurl.dev"
    exit 1
fi

# Verificar si Docker está corriendo
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está disponible"
    exit 1
fi

# Verificar si el contenedor está corriendo
if ! docker ps | grep -q "pds006-container"; then
    echo "⚠️  El contenedor pds006-container no está corriendo"
    echo "Inicia el contenedor con: docker start pds006-container"
    exit 1
fi

echo "✅ Contenedor Docker está corriendo"
echo ""

# Ejecutar las pruebas
echo "📋 Ejecutando pruebas desde session.hurl..."
echo ""

hurl --test ./session.hurl

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Todas las pruebas pasaron correctamente!"
else
    echo ""
    echo "❌ Algunas pruebas fallaron"
    exit 1
fi
