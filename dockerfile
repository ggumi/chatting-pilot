# Step 1: Build the React app
# Node.js를 이용하여 애플리케이션을 빌드
FROM node:18-alpine as build

# 애플리케이션 코드를 컨테이너의 작업 디렉토리로 복사
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 전체를 복사하고 애플리케이션을 빌드
COPY . .


RUN npm run build

CMD ["npm", "start"]
