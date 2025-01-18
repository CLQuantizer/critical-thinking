# windows sets the environment variables like this
# $env:AWS_ACCESS_KEY_ID="asdfsdf"
# $env:AWS_SECRET_ACCESS_KEY="sdfdfd"
aws s3 rm s3://audios --recursive --endpoint-url https://{cloudfalreid}.r2.cloudflarestorage.com