# Moroccan Recipe API

A RESTful API for managing Moroccan recipes and categories. Built with Node.js, Express, and SQLite.

## Features

- Complete CRUD operations for recipes and categories
- Advanced search functionality with multiple fields
- Pagination support
- Input validation
- Error handling
- Detailed API documentation

## Prerequisites

- Node.js (v18 or later)
- npm (comes with Node.js)

## Project Structure

```
moroccan-recipes-api/
├── src/
│   ├── middleware/
│   │   ├── validate.js        # Input validation
│   │   └── errorHandler.js    # Error handling
│   ├── routes/
│   │   ├── category.js        # Category routes
│   │   └── recipe.js         # Recipe routes
│   ├── db.js                 # Database setup
│   └── server.js             # Main application file
├── index.html               # API documentation
└── README.md               # This file
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd moroccan-recipes-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Categories

- `GET /api/categories` - Get all categories (with pagination)
- `GET /api/categories/:id` - Get a single category
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Recipes

- `GET /api/recipes` - Get all recipes (with pagination)
- `GET /api/recipes/search` - Search recipes
- `GET /api/recipes/:id` - Get a single recipe
- `POST /api/recipes` - Create a new recipe
- `PUT /api/recipes/:id` - Update a recipe
- `DELETE /api/recipes/:id` - Delete a recipe

## Example Requests

### Create a Category
```bash
curl -X POST http://localhost:3000/api/categories \
-H "Content-Type: application/json" \
-d '{
  "name": "Tagines",
  "description": "Traditional Moroccan stews cooked in a cone-shaped earthenware pot"
}'
```

### Create a Recipe
```bash
curl -X POST http://localhost:3000/api/recipes \
-H "Content-Type: application/json" \
-d '{
  "title": "Chicken Tagine with Preserved Lemon",
  "ingredients": [
    "chicken",
    "preserved lemon",
    "olives",
    "saffron"
  ],
  "instructions": "1. Brown chicken...",
  "cooking_time": 60,
  "category_id": 1
}'
```

## Development

To start the development server with hot reload:
```bash
npm run dev
```

## Validation

The API includes validation for:
- Required fields
- String lengths
- Data types
- Relationships between entities

## Error Handling

The API provides detailed error messages for:
- Validation errors
- Database errors
- Not found errors
- Server errors

## Documentation

API documentation is available at the root route (`/`). Visit `http://localhost:3000` after starting the server.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.
