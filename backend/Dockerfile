FROM node:22
WORKDIR /app
LABEL maintainer="SantiagoComas07"
LABEL version="1.0.0"
LABEL description="backend linkenwin"
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
ENV NODE_ENV=production
VOLUME ["/data"]
EXPOSE 3000
CMD ["nest", "build"]