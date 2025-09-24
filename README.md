# Project 1 - EC2 REST Service: Pounds -> Kilograms
**Course:** CS 554 - Cloud Computing (UAH)  
**Author:** Naga Sandeep Gurram

This project provisions an AWS EC2 instance and deploys a small REST web service that converts pounds (lbs) to kilograms (kg). The service is implemented using Node.js and Express.

---

## Setup Instructions

### 1. Clone Repo

https://github.com/nagasandeepg/Cloud_computing.git

### 2. Install Dependencies

npm install

### 3. Run Locally

node server.js

Service runs on: http://34.224.165.230:8080/convert?lbs=150

### 4. Deploy on EC2


- Install Node.js on EC2: sudo yum install -y nodejs npm   # Amazon Linux

- Run service:   node server.js


### Parameters
- lbs -> positive number of pounds to convert.

### Responses
- 200 OK -> returns JSON { "lbs": X, "kg": Y }
- 400 Bad Request -> missing or invalid parameter
- 422 Unprocessable Entity -> negative values not allowed

---

##  Curl Examples

# Success
curl "http://34.224.165.230:8080/convert?lbs=150"
# {"lbs":150,"kg":68.039,"formula":"kg = lbs * 0.45359237"}

# Missing param
curl "http://34.224.165.230:8080/convert"
# Error 400
# {"error":"Query param lbs is required and must be a number"}

# Negative value
curl "http://34.224.165.230:8080/convert?lbs=-5"
# Error 422
# {"error":"lbs must be a non-negative, finite number"}

# Non-numeric
curl "http://34.224.165.230:8080/convert?lbs=NaN"
# Error 400
# {"error":"Query param lbs is required and must be a number"}

---

## Security & Cost Hygiene

- Restricted SSH (22) to my IP in Security Group.  
- Service runs as non-root user.  
- Instance terminated after project completion.  

---

## Cleanup Note
- Stopped and terminated EC2 instance after testing.  
- Deleted project-specific Key Pair ('AWS_EC2_Projects.pem').  
- No Elastic IPs allocated, so no cleanup required.  
