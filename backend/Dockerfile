# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma

RUN npm ci

