# EC2 Docker Deployment Guide

## Prerequisites
- AWS EC2 instance running (Ubuntu/Amazon Linux recommended)
- SSH access to EC2 instance
- Security group configured to allow:
  - Port 22 (SSH)
  - Port 3001 (Application)
  - Port 80/443 (if using reverse proxy)

## Step 1: Connect to EC2 Instance
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

## Step 2: Install Docker on EC2

### For Amazon Linux 2:
```bash
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user
```

### For Ubuntu:
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```

**Important:** Log out and log back in for group changes to take effect.

## Step 3: Install Docker Compose (if not installed)
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

## Step 4: Transfer Files to EC2

### Option A: Using Git (Recommended)
```bash
# On EC2
git clone your-repository-url
cd project1-BackEnd
```

### Option B: Using SCP
```bash
# From your local machine
scp -i your-key.pem -r . ec2-user@your-ec2-ip:~/project1-BackEnd
```

## Step 5: Configure Environment Variables
```bash
# On EC2
cd project1-BackEnd
nano .env
```

Add your environment variables:
```
MONGODB_URI=mongodb+srv://miyuru2001:ashi%40678@miyuru.qz4gnar.mongodb.net/?retryWrites=true&w=majority
PORT=3001
HOST=0.0.0.0
```

## Step 6: Build and Run Docker Container

### Using Docker Compose (Recommended):
```bash
docker-compose up -d
```

### Using Docker directly:
```bash
# Build the image
docker build -t project1-backend .

# Run the container
docker run -d \
  --name project1-backend \
  -p 3001:3001 \
  --env-file .env \
  --restart unless-stopped \
  project1-backend
```

## Step 7: Verify Deployment
```bash
# Check if container is running
docker ps

# View logs
docker-compose logs -f
# OR
docker logs -f project1-backend

# Test the API
curl http://localhost:3001/api
```

## Step 8: Configure EC2 Security Group
1. Go to AWS Console → EC2 → Security Groups
2. Select your instance's security group
3. Add inbound rule:
   - Type: Custom TCP
   - Port: 3001
   - Source: 0.0.0.0/0 (or your specific IP)

## Useful Docker Commands

### View running containers:
```bash
docker ps
```

### Stop the application:
```bash
docker-compose down
# OR
docker stop project1-backend
```

### Restart the application:
```bash
docker-compose restart
# OR
docker restart project1-backend
```

### View logs:
```bash
docker-compose logs -f
# OR
docker logs -f project1-backend
```

### Update and redeploy:
```bash
git pull
docker-compose down
docker-compose up -d --build
```

### Remove container and image:
```bash
docker-compose down --rmi all
# OR
docker stop project1-backend
docker rm project1-backend
docker rmi project1-backend
```

## Access Your Application
- From EC2: `http://localhost:3001`
- From external: `http://your-ec2-public-ip:3001`

## Optional: Setup Nginx Reverse Proxy
```bash
sudo apt install nginx -y

# Create nginx config
sudo nano /etc/nginx/sites-available/backend
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Troubleshooting

### Container won't start:
```bash
docker logs project1-backend
```

### Port already in use:
```bash
sudo lsof -i :3001
sudo kill -9 <PID>
```

### MongoDB connection issues:
- Verify MongoDB Atlas IP whitelist includes EC2 public IP or allow all (0.0.0.0/0)
- Check MONGODB_URI is correctly encoded in .env file

### Permission denied:
```bash
sudo chmod 666 /var/run/docker.sock
```
