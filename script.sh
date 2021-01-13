# Stop, run, and clean
result=$(docker container ls -a -f name=rlstop-frontend)
if [[ -n "$result" ]]; then
  docker stop rlstop-frontend
  docker rm rlstop-frontend
fi