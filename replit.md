# Methadone Dosage Converter

## Overview

This is a Flask-based web application that provides a professional methadone dosage conversion tool for healthcare providers. The application features a clean, dark-themed interface built with Bootstrap and provides real-time form validation for dosage inputs.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Pure HTML/CSS/JavaScript with Bootstrap 5
- **Theme**: Dark theme using Replit's Bootstrap agent theme
- **Styling**: Custom CSS with Bootstrap overrides for enhanced UI/UX
- **Client-side Validation**: JavaScript-based real-time form validation
- **Icons**: Font Awesome integration for visual elements

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Structure**: Simple single-file Flask application with modular design
- **Routing**: Single main route handling both GET and POST requests
- **Error Handling**: Comprehensive error handling with user-friendly flash messages
- **Logging**: Built-in Python logging for debugging and monitoring

## Key Components

### Core Files
1. **app.py**: Main Flask application with conversion logic
2. **main.py**: Entry point for the application
3. **methadone_converter.py**: External conversion logic module (imported but not visible in repo)
4. **templates/index.html**: Single-page application template
5. **static/style.css**: Custom styling and UI enhancements
6. **static/script.js**: Client-side validation and form handling

### UI Components
- Responsive form with input validation
- Flash message system for user feedback
- Loading states and disabled button functionality
- Professional medical interface design

## Data Flow

1. **User Input**: Healthcare provider enters methadone dosage
2. **Client Validation**: JavaScript validates input in real-time
3. **Form Submission**: POST request sent to Flask backend
4. **Server Processing**: Flask validates input and calls MethadoneConverter
5. **Conversion**: External converter module processes the dosage
6. **Response**: Results displayed with appropriate success/error messages

## External Dependencies

### Python Dependencies
- Flask: Web framework
- methadone_converter: Custom conversion logic module

### Frontend Dependencies
- Bootstrap 5: UI framework with dark theme
- Font Awesome 6.4.0: Icon library
- Replit Bootstrap theme: Custom dark theme styling

### Environment Variables
- `SESSION_SECRET`: Flask session secret key (defaults to development key)

## Deployment Strategy

### Development
- Uses Flask's built-in development server
- Environment-based configuration for secret keys
- Debug logging enabled for development

### Production Considerations
- Secret key should be set via environment variable
- Logging level should be adjusted for production
- WSGI server recommended for production deployment
- Static file serving should be handled by web server

### Key Features
- Input validation (client and server-side)
- Error handling with user-friendly messages
- Responsive design for various screen sizes
- Professional healthcare provider interface
- Real-time form validation feedback