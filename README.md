# Project 1 - EC2 REST Service: Pounds -> Kilograms
**Course:** CS 554 - Cloud Computing (UAH)  
**Author:** Naga Sandeep Gurram

This project provisions an AWS EC2 instance and deploys a small REST web service that converts pounds (lbs) to kilograms (kg). The service is implemented using Node.js and Express.

**Repo Structure**

├─ server.js
├─ package.json
├─ README.md
├─ DESIGN.md
├─ screenshots/
│  ├─ Happy Path Lbs-0.png
│  ├─ Typical Lbs-150.png
│  ├─ Edge Lbs-0.1.png
│  ├─ Error Missing Parameter_Error 400.png
│  ├─ Error Negative Number_Error 422.png
│  ├─ Error Lbs-NaN.png
│  ├─ Systemctl Status.png
│  └─ Security Group.png
└─ .gitignore


## Setup Instructions

### 1. Clone Repo

https://github.com/nagasandeepg/CS554_Cloud_Computing.git

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

## EC2 Deployment (Amazon Linux 2 or Ubuntu)

### A) Provision (console quick-start)
- AMI: Amazon Linux 2
- Type: t2.micro
- Key pair: create or reuse (PEM)
- **Security Group (SG) inbound:**
  - TCP - 22 from 98.54.60.203/32
  - TCP 8080 from 0.0.0.0/0
- Launch; copy Public IPv4 or DNS.

### B) Connect & Install Runtime
Amazon Linux:

sudo yum update -y
sudo yum install -y nodejs npm

### C) Deploy the app

# Copy repo or git clone
mkdir -p ~/p1 && cd ~/p1
git clone <your-repo-url> .
npm install
node server.js    # quick smoke test


## Run as a Service (systemd)

# Create systemd unit
sudo bash -c 'cat >/etc/systemd/system/p1.service << "UNIT"

**[Unit]**
Description=CS454 Project 1 - Lbs to Kg REST service
After=network.target

**[Service]**
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/p1
ExecStart=/usr/bin/node /home/ec2-user/p1/server.js
Restart=always
RestartSec=3
Environment=PORT=8080

**[Install]**
WantedBy=multi-user.target


sudo systemctl daemon-reload
sudo systemctl enable --now p1
sudo systemctl status p1 --no-pager
journalctl -u p1 -n 50 --no-pager


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
