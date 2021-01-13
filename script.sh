# Stop, run, and clean
result=$(docker ps -q -f name=rlstop-frontend)
if [[ -n "$result" ]]; then
  docker stop rlstop-frontend
  docker rm rlstop-frontend
fi