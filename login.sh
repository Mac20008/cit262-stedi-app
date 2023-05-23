echo "logging in"
curl -v -d "@login.json" -X POST -H "content-Type:application/json" https://dev.stedi.me/login