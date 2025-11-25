#!/bin/bash

# Script para ejecutar hurl con variable de host

HOST="${1:-http://localhost:8000}"
VERBOSE="${2:-}"

echo "🚀 Ejecutando tests de API..."
echo "Host: $HOST"
echo ""

HURL_CMD="hurl session.hurl --variable host=$HOST"

if [ "$VERBOSE" = "--verbose" ]; then
    HURL_CMD="$HURL_CMD --verbose"
fi

echo "Comando: $HURL_CMD"
echo ""

eval "$HURL_CMD"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Tests completados exitosamente!"
else
    echo ""
    echo "❌ Tests fallaron"
    exit 1
fi
