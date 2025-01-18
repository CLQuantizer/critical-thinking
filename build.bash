npm run build
scp -r build myvps:/root/mywords/
ssh myvps 'systemctl restart mywords'