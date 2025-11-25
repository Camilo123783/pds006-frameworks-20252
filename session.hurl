# ============================================================================
# PDS006 - Device Management System - API Endpoints Test Suite
# ============================================================================
# This file contains all the endpoints to test the device management workflow
# 
# Base URL: http://localhost:8000
# Prerequisites:
#   - Docker container running: pds006-container
#   - hurl installed: https://hurl.dev
#
# Run tests with: hurl --test session.hurl
# ============================================================================

### ============================================================================
### VARIABLES
### ============================================================================

@baseUrl = http://localhost:8000
@api = {{baseUrl}}/api
@timeout = 5000

# UUIDs para uso en pruebas posteriores (se obtendrán de las respuestas reales)
@computerId = 550e8400-e29b-41d4-a716-446655440000
@medicalDeviceId = 550e8400-e29b-41d4-a716-446655440001
@frequentComputerId = 550e8400-e29b-41d4-a716-446655440002

### ============================================================================
### TEST 1: CHECK-IN COMPUTER
### ============================================================================
### POST /api/computers/checkin
### Register a new computer in the system
### Expected: 200 OK with Computer object
POST {{api}}/computers/checkin
Content-Type: multipart/form-data

; Computer 1 - Dell XPS13
-b brand=Dell
-b model=XPS13
-b color=Silver
-b ownerName=Juan Pérez
-b ownerId=JP001
-b photo=@./test-assets/computer.jpg

HTTP 200
[Captures]
computerId: jsonpath("$.id")

### ============================================================================
### TEST 2: CHECK-IN MEDICAL DEVICE
### ============================================================================
### POST /api/medicaldevices/checkin
### Register a new medical device in the system
### Expected: 200 OK with MedicalDevice object
POST {{api}}/medicaldevices/checkin
Content-Type: application/json

{
  "brand": "Siemens",
  "model": "SONOGRAPH",
  "serial": "SN123456789",
  "ownerName": "Hospital Central",
  "ownerId": "HC001",
  "photo": "@./test-assets/medical-device.jpg"
}

HTTP 200
[Captures]
medicalDeviceId: jsonpath("$.id")

### ============================================================================
### TEST 3: REGISTER FREQUENT COMPUTER
### ============================================================================
### POST /api/computers/frequent
### Register a computer that will be used frequently (with auto check-in/out URLs)
### Expected: 200 OK with FrequentComputer object
POST {{api}}/computers/frequent
Content-Type: multipart/form-data

; Computer 2 - Lenovo ThinkPad (Frequent)
-b brand=Lenovo
-b model=ThinkPad
-b color=Black
-b ownerName=María García
-b ownerId=MG002
-b photo=@./test-assets/computer.jpg

HTTP 200
[Captures]
frequentComputerId: jsonpath("$.device.id")

### ============================================================================
### TEST 4: GET ALL COMPUTERS
### ============================================================================
### GET /api/computers
### Retrieve all registered computers
### Expected: 200 OK with array of Computer objects
GET {{api}}/computers
Accept: application/json

HTTP 200
[Asserts]
jsonpath("$") isArray


### ============================================================================
### TEST 5: GET ALL MEDICAL DEVICES
### ============================================================================
### GET /api/medicaldevices
### Retrieve all registered medical devices
### Expected: 200 OK with array of MedicalDevice objects
GET {{api}}/medicaldevices
Accept: application/json

HTTP 200
[Asserts]
jsonpath("$") isArray


### ============================================================================
### TEST 6: GET FREQUENT COMPUTERS
### ============================================================================
### GET /api/computers/frequent
### Retrieve all computers registered as frequent
### Expected: 200 OK with array of FrequentComputer objects
GET {{api}}/computers/frequent
Accept: application/json

HTTP 200
[Asserts]
jsonpath("$") isArray


### ============================================================================
### TEST 7: GET ENTERED DEVICES
### ============================================================================
### GET /api/devices/entered
### Retrieve all devices that are currently checked in (entered)
### Expected: 200 OK with array of EnteredDevice objects
GET {{api}}/devices/entered
Accept: application/json

HTTP 200
[Asserts]
jsonpath("$") isArray


### ============================================================================
### TEST 8: GET COMPUTERS WITH SORTING AND PAGINATION
### ============================================================================
### GET /api/computers?sortBy=brand&sortValue=asc&limit=10&offset=0
### Get computers with sorting and pagination options
### Expected: 200 OK with sorted array of Computer objects
GET {{api}}/computers?sortBy=brand&sortValue=asc&limit=10&offset=0
Accept: application/json

HTTP 200
[Asserts]
jsonpath("$") isArray


### ============================================================================
### TEST 9: GET MEDICAL DEVICES WITH SORTING AND PAGINATION
### ============================================================================
### GET /api/medicaldevices?sortBy=model&sortValue=asc&limit=10&offset=0
### Get medical devices with sorting and pagination options
### Expected: 200 OK with sorted array of MedicalDevice objects
GET {{api}}/medicaldevices?sortBy=model&sortValue=asc&limit=10&offset=0
Accept: application/json

HTTP 200
[Asserts]
jsonpath("$") isArray


### ============================================================================
### TEST 10: CHECK-IN FREQUENT COMPUTER
### ============================================================================
### PATCH /api/computers/frequent/checkin/:id
### Use the frequent computer check-in endpoint (marks computer as entered)
### Expected: 200 OK with FrequentComputer object
PATCH {{api}}/computers/frequent/checkin/{{frequentComputerId}}
Accept: application/json

HTTP 200


### ============================================================================
### TEST 11: CHECKOUT DEVICE
### ============================================================================
### PATCH /api/devices/checkout/:id
### Check out a device (mark as exited)
### Expected: 200 OK
PATCH {{api}}/devices/checkout/{{computerId}}
Accept: application/json

HTTP 200


### ============================================================================
### TEST 12: GET ENTERED DEVICES (VERIFY AFTER CHECKOUT)
### ============================================================================
### GET /api/devices/entered
### Verify the list of entered devices has been updated after checkout
### Expected: 200 OK with updated array of EnteredDevice objects
GET {{api}}/devices/entered
Accept: application/json

HTTP 200
[Asserts]
jsonpath("$") isArray


### ============================================================================
### TEST 13: GET COMPUTERS (VERIFY STATE AFTER OPERATIONS)
### ============================================================================
### GET /api/computers
### Verify computers list after checkout operation
### Expected: 200 OK with updated array of Computer objects
GET {{api}}/computers
Accept: application/json

HTTP 200
[Asserts]
jsonpath("$") isArray

### ============================================================================
### END OF TEST SUITE
### ============================================================================

