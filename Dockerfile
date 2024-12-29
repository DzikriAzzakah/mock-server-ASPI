FROM node:20.15.1-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3003
CMD [ "npm", "run", "dev"]

# 1 . Build docker
# use command bellow to build docker image
# sudo docker build -t ib-service-mock .

# 2. Start docker
# 2.1 check network
# check docker networks associated to by penatausahaan staging app with this command
# sudo docker inspect -f '{{range $key, $value := .NetworkSettings.Networks}}{{$key}}{{"\n"}}{{end}}' <container-id-penatausahaan-staging>
# 
# 2.2 Start docker
# to start docker, run command below:
# sudo docker run --network <network-name> ib-service-mock
# example :
# sudo docker run --network penatausahaan_default ib-service-mock
# check if container is running with command : sudo docker ps -a

# 3. Connect to penatausahaan staging
# run this command to find generated IP of ib-service-mock container
# sudo docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-id-ib-service-mock>
# out put should look like this:
# 
# 172.23.0.2
# 
# use the IP to ENV on penatausahaan stagging app 
# HOST='http://172.23.0.2:3003'