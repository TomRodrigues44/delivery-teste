# Tech Stack

- **Vanilla HTML/CSS/JavaScript** - No frameworks; use plain HTML5, CSS3, and ES6+ JavaScript
- **Supabase** - Backend-as-a-Service for authentication, database, and real-time features
- **Docker** - Containerization for deployment (see docker-compose.yml and stack_aparecida.yml)
- **Custom CSS** - All styling uses custom CSS in assets/css/style.css
- **JSON Data** - Product data stored in produtos.json
- **Responsive Design** - Mobile-first approach with desktop and mobile views

# Library Usage Rules

## Authentication & Database
- **Supabase** - Use for all authentication (login/logout) and database operations
  - Import via CDN: `https://unpkg.com/@supabase/supabase-js@2`
  - Use Supabase Auth for user authentication
  - Use Supabase Database for storing orders, products, and user data

## Styling
- **Custom CSS only** - Do not use CSS frameworks (Bootstrap, Tailwind, etc.)
- All styles go in `assets/css/style.css`
- Use CSS classes for reusable components
- Follow existing naming conventions (kebab-case for classes)

## JavaScript
- **Vanilla JS only** - No frameworks (React, Vue, jQuery, etc.)
- Use ES6+ features (arrow functions, async/await, const/let)
- Organize code by feature in separate JS files (e.g., login.js, admin.js, carrinho.js)
- Use event listeners for interactivity

## Data Management
- **produtos.json** - Static product catalog data
- **Supabase** - Dynamic data (orders, user sessions, product updates)
- Use localStorage for client-side cart persistence

## File Structure
- HTML pages in root directory (index.html, login.html, admin.html, carrinho.html)
- JavaScript files in `js/` directory
- CSS in `assets/css/`
- Images in `assets/img/`
- Configuration files (docker-compose.yml, stack_aparecida.yml) in root

## Deployment
- Use Docker Compose for local development and production
- Follow the stack configuration in stack_aparecida.yml
