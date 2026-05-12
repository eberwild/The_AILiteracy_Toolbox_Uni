# AI Literacy Toolbox

## Overview

The AI Literacy Toolbox is a full-stack web application designed to support learning and understanding of artificial intelligence concepts through interactive educational tools. The platform provides an ecosystem where users can explore, use, and submit learning tools that focus on AI Literacy in a practical and accessible way.

The system combines a React-based frontend, a Node.js and Express backend, and a SQLite database, all containerized using Docker for simplified deployment and portability.

## Project Structure

The project consists of the following components:

Frontend
React application built with Vite, responsible for the user interface, tool interaction, and communication with the backend API.

Backend
Node.js and Express API that handles tool submissions, validation, ratings, email notifications, and database operations.

Database
SQLite database used for storing tools, ratings, and moderation states. The database is persisted using a Docker volume.

## Features

- Interactive AI Literacy learning tools
- Tool overview and browsing system
- Tool submission workflow with automated validation
- Repository structure test for new submitted tools
- Manual review process for submitted tools
- Rating system for tools (star rating 0-5 in 0.5 steps)
- Email notification system for submissions and review updates
- Lightweight and modular full-stack architecture

## Requirements

- Docker
- Docker Compose

## How to Run the Project

To run the application locally, use Docker Compose:

docker-compose up --build

This will start both the frontend and backend services.

## Access

Frontend application:
http://localhost:3000

Backend API:
http://localhost:5000

## Environment Variables

### Backend (.env)

The backend uses the following environment variables:

PORT=3000
DB_PATH=/app/data/mydb.sqlite

SMTP configuration for email functionality:
EMAIL_USER
EMAIL_PASS
EMAIL_COLAPS
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

### Frontend (.env)

VITE_API_URL=http://localhost:5000

This variable defines the connection between the frontend and backend API.

## Deployment Notes

The application is fully containerized using Docker and Docker Compose. The backend and frontend are separated into individual services. Communication between services is handled via environment variables.

The SQLite database is persisted using a Docker volume to ensure data consistency across restarts.

For production deployment, environment variables such as VITE_API_URL must be adjusted to point to the deployed backend URL.

Bachelor Thesis Project

AI Literacy Toolbox
