# Backend for Recommendation System

## Setup

1. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and set your MongoDB URI if needed.
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## API Endpoints
- `GET /` — Health check
- `POST /register` — Register a new user

Extend with more endpoints as needed!
