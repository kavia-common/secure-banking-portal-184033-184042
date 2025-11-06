#!/bin/bash
cd /home/kavia/workspace/code-generation/secure-banking-portal-184033-184042/online_banking_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

