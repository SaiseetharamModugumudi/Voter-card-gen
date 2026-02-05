# Voter ID Card Generator - Django Project

A complete Django application to create, manage, and display digital Indian Voter ID cards with a professional design that mimics the original Indian Election Commission voter ID format.

## Features

- ✅ **Create Voter Cards** - Register with personal details and photo
- ✅ **View Cards** - Display voter ID cards in a realistic format
- ✅ **Edit Cards** - Update voter information anytime
- ✅ **Delete Cards** - Remove voter records
- ✅ **Search** - Search voter cards by name, voter ID, or father's name
- ✅ **Photo Upload** - Upload and display voter photos with validation
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
- ✅ **Print Support** - Print voter cards directly from the browser
- ✅ **Admin Panel** - Full Django admin interface for management
- ✅ **Modern UI** - Bootstrap 5 with custom styling

## Requirements

- Python 3.8+
- Django 6.0+
- Pillow (for image handling)
- Bootstrap 5 (CDN)
- Font Awesome 6 (CDN)

## Installation

### 1. Setup Virtual Environment

```bash
python -m venv myenv
```

### 2. Activate Virtual Environment

**On Windows:**
```bash
myenv\Scripts\activate
```

**On macOS/Linux:**
```bash
source myenv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Superuser

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin account.

### 6. Run Development Server

```bash
python manage.py runserver
```

The application will be available at `http://127.0.0.1:8000/`

## Default Admin Credentials

**Username:** admin  
**Password:** admin123

*Note: Change these credentials in production!*

## Usage

### Access Points

- **Home Page:** `http://localhost:8000/`
- **Create Card:** `http://localhost:8000/create/`
- **View All Cards:** `http://localhost:8000/cards/`
- **Search Cards:** `http://localhost:8000/search/`
- **Admin Panel:** `http://localhost:8000/admin/`

### Creating a Voter Card

1. Click "Create New Card" from the navigation menu
2. Fill in the voter details:
   - First Name
   - Father's Name
   - Date of Birth (must be 18+ years old)
   - Gender
   - Address
   - State
   - Voter ID Number
   - Serial Number
   - Photo (JPG/PNG, max 5MB)
3. Click "Create Voter Card"
4. View your generated voter ID card

### Viewing a Card

1. Click on any voter card from the list
2. See the voter ID displayed in official-looking format
3. View complete details in the information panel
4. Options to:
   - Print the card
   - Edit the information
   - Delete the card

### Searching

1. Go to "All Cards" page
2. Use the search bar to find cards by:
   - Voter's name
   - Voter ID number
   - Father's name

## Project Structure

```
voter_project/
├── manage.py
├── requirements.txt
├── README.md
├── db.sqlite3
├── voter_project/          # Project settings
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── voter_card/             # Main app
│   ├── models.py           # VoterCard model
│   ├── views.py            # View functions
│   ├── forms.py            # VoterCardForm
│   ├── urls.py             # App URL patterns
│   ├── admin.py            # Admin configuration
│   └── migrations/
├── templates/              # HTML templates
│   ├── base.html           # Base template
│   └── voter_card/
│       ├── index.html      # Home page
│       ├── create.html     # Create form
│       ├── view.html       # Display card
│       ├── edit.html       # Edit form
│       ├── list.html       # List all cards
│       └── search.html     # Search results
├── static/                 # Static files
│   ├── css/
│   │   └── style.css       # Custom styles
│   └── js/
│       └── main.js         # JavaScript functions
└── media/                  # User uploads (auto-created)
    └── voter_photos/       # Voter photos
```

## Database Models

### VoterCard Model

```python
class VoterCard(models.Model):
    first_name          # CharField: Voter's first name
    father_name         # CharField: Father's name
    date_of_birth       # DateField: DOB (18+ validation)
    address             # TextField: Voter's address
    voter_id_number     # CharField: Unique voter ID (validation)
    photo               # ImageField: Voter's photo
    gender              # CharField: Male/Female/Other
    state               # CharField: State of residence
    serial_number       # CharField: Serial number on card
    created_at          # DateTimeField: Auto timestamp
    updated_at          # DateTimeField: Auto update timestamp
```

## Form Validations

- **Age Validation:** Must be 18 years or older
- **Photo Validation:** Max 5MB, image formats only
- **Voter ID:** Minimum 5 characters
- **Date of Birth:** Cannot be in the future
- **Required Fields:** All fields are mandatory

## API Endpoints

### Get Voter Card Data (JSON)

**Endpoint:** `/api/card/<id>/`  
**Method:** GET  
**Response:**
```json
{
    "id": 1,
    "first_name": "John",
    "father_name": "Mr. Smith",
    "date_of_birth": "01/01/1995",
    "address": "123 Main Street",
    "voter_id_number": "ABC1234567890",
    "gender": "Male",
    "state": "Maharashtra",
    "serial_number": "SN123456",
    "age": 29,
    "photo_url": "/media/voter_photos/photo.jpg"
}
```

## Features in Detail

### Voter ID Card Design
- Mimics official Indian Election Commission voter ID format
- Displays photo, name, voter ID, and DOB prominently
- Includes state and serial number information
- Professional gradient background
- Print-friendly layout

### Photo Upload
- Drag and drop support
- Click to browse
- Real-time preview
- File size validation
- Image format validation

### Search Functionality
- Real-time search results
- Search by multiple fields
- Case-insensitive matching
- Results pagination ready

### Responsive Design
- Mobile-first approach
- Tablet-optimized layout
- Desktop-enhanced experience
- Print-friendly CSS
- Touch-friendly buttons

## Security Features

- CSRF protection on all forms
- SQL injection protection (Django ORM)
- XSS protection (template escaping)
- File upload validation
- Input validation on all forms
- Admin authentication required

## Customization

### Changing Colors

Edit `/static/css/style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... other colors ... */
}
```

### Modifying Card Design

Edit `/templates/voter_card/view.html` and customize the `.voter-id-card` styling.

### Adding Fields

1. Add field to `VoterCard` model in `models.py`
2. Create migration: `python manage.py makemigrations`
3. Apply migration: `python manage.py migrate`
4. Update form in `forms.py`
5. Update templates

## Troubleshooting

### Photo not uploading
- Check file size (max 5MB)
- Ensure file is an image (JPG/PNG)
- Check `MEDIA_ROOT` directory permissions

### Static files not loading
- Run: `python manage.py collectstatic`
- Check `STATIC_ROOT` and `STATICFILES_DIRS` in settings.py

### Database errors
- Delete `db.sqlite3` and migrate again
- Check migrations folder for conflicts

### Admin panel not accessible
- Create new superuser: `python manage.py createsuperuser`
- Check Django admin is in `INSTALLED_APPS`

## Production Deployment

Before deploying to production:

1. Change `DEBUG = False` in settings.py
2. Set a strong `SECRET_KEY`
3. Configure `ALLOWED_HOSTS`
4. Set up a production database (PostgreSQL recommended)
5. Configure proper static and media file serving
6. Use environment variables for sensitive data
7. Set up HTTPS
8. Configure proper logging

## License

This project is open source and available for educational purposes.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

---

**Made with ❤️ using Django, Bootstrap, and JavaScript**
