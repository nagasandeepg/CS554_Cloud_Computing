# Project 1 - Design Document
**Course:** CS 454/554 - Cloud Computing (UAH)  
**Author:** Naga Sandeep Gurram

---

## 1. Objective
Design and deploy a minimal REST service on AWS EC2 that converts pounds (lbs) to kilograms (kg). The service demonstrates provisioning, securing, and managing a cloud instance.

---

## 2. Architecture
- **Frontend:** None (service-only).  
- **Backend:** Node.js with Express.  
- **Hosting:** AWS EC2 (Amazon Linux 2).  
- **Service Manager:** 'systemctl' to keep service running.  
- **Security:** AWS Security Groups restrict access (SSH limited, HTTP open).  

---

## 3. API Design
### Endpoint

GET /convert?lbs=<value>


### Parameters
- 'lbs' -> numeric input (pounds).

### Responses
- '200 OK' -> '{ "lbs": X, "kg": Y }'
- '400 Bad Request' -> missing/invalid parameter
- '422 Unprocessable Entity' -> negative input not allowed  

---

## 4. Error Handling
- **Missing parameter** -> return '400'.  
- **Invalid input (non-numeric)** -> return '400'.  
- **Negative input** -> return '422'.  

---

## 5. Security & Cost Hygiene
- **Security Groups:**  
  - SSH (22) restricted to developer IP.  
  - HTTP (80) open for testing.  
- **Non-root execution:** Service runs under 'ec2-user'.  
- **Cost Hygiene:** Instance terminated after project completion, key deleted, no orphaned resources left.  

---

## 6. Screenshots (provided in repo)
- Curl outputs (success + error cases).  
- 'systemctl status' showing service running.  
- Security Group inbound rules.  

---

## 7. Cleanup
- EC2 instance terminated.  
- EBS volumes verified.  
- Key pair deleted.  
- No Elastic IP allocated.  

---
