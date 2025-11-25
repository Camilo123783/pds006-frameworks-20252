### Test Session para Device Management API

# 1. GET all computers
GET {{host}}/api/computers
Accept: application/json

HTTP 200

###

# 2. GET all medical devices
GET {{host}}/api/medicaldevices
Accept: application/json

HTTP 200

###

# 3. GET all frequent computers
GET {{host}}/api/computers/frequent
Accept: application/json

HTTP 200

###

# 4. GET entered devices
GET {{host}}/api/devices/entered
Accept: application/json

HTTP 200

###

# 5. GET computers with sorting
GET {{host}}/api/computers?sort=brand:asc&limit=10&offset=0
Accept: application/json

HTTP 200

###

# 6. GET medical devices with sorting
GET {{host}}/api/medicaldevices?sort=model:asc&limit=10&offset=0
Accept: application/json

HTTP 200

###

# 7. Final verification - GET entered devices
GET {{host}}/api/devices/entered
Accept: application/json

HTTP 200

###

# 8. Final verification - GET all computers
GET {{host}}/api/computers
Accept: application/json

HTTP 200

