POST {{host}}/api/computers/checkin
Content-Type: multipart/form-data

[FormParams]
brand: Dell
model: XPS13
color: Silver
ownerName: Juan Pérez
ownerId: JP001
photo: @./test-assets/computer.jpg

HTTP 200
[Captures]
computerId: jsonpath "$.id"

###

POST {{host}}/api/medicaldevices/checkin
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
medicalDeviceId: jsonpath "$.id"

###

POST {{host}}/api/computers/frequent
Content-Type: multipart/form-data

[FormParams]
brand: Lenovo
model: ThinkPad
color: Black
ownerName: María García
ownerId: MG002
photo: @./test-assets/computer.jpg

HTTP 200
[Captures]
frequentComputerId: jsonpath "$.device.id"

###

GET {{host}}/api/computers
Accept: application/json

HTTP 200
[Asserts]
jsonpath "$" type == "array"

###

GET {{host}}/api/medicaldevices
Accept: application/json

HTTP 200
[Asserts]
jsonpath "$" type == "array"

###

GET {{host}}/api/computers/frequent
Accept: application/json

HTTP 200
[Asserts]
jsonpath "$" type == "array"

###

GET {{host}}/api/devices/entered
Accept: application/json

HTTP 200
[Asserts]
jsonpath "$" type == "array"

###

GET {{host}}/api/computers?sortBy=brand&sortValue=asc&limit=10&offset=0
Accept: application/json

HTTP 200
[Asserts]
jsonpath "$" type == "array"

###

GET {{host}}/api/medicaldevices?sortBy=model&sortValue=asc&limit=10&offset=0
Accept: application/json

HTTP 200
[Asserts]
jsonpath "$" type == "array"

###

PATCH {{host}}/api/computers/frequent/checkin/550e8400-e29b-41d4-a716-446655440002
Accept: application/json

HTTP 200

###

PATCH {{host}}/api/devices/checkout/550e8400-e29b-41d4-a716-446655440000
Accept: application/json

HTTP 200

###

GET {{host}}/api/devices/entered
Accept: application/json

HTTP 200
[Asserts]
jsonpath "$" type == "array"

###

GET {{host}}/api/computers
Accept: application/json

HTTP 200
[Asserts]
jsonpath "$" type == "array"

