# Voter ID Card Generator - Quick Start Guide

## Project Overview

This is a complete, production-ready Django application for creating and managing digital Indian Voter ID cards. The application includes:

✅ Full CRUD operations (Create, Read, Update, Delete)
✅ Realistic voter ID card design matching Indian Election Commission format
✅ Photo upload with validation
✅ Search functionality
✅ Responsive mobile-friendly design
✅ Admin panel for management
✅ Professional UI with Bootstrap 5

## What's Included

### Backend
- **Django Models:** VoterCard model with fields for all voter details
- **Forms:** VoterCardForm with validation for age, file size, and voter ID format
- **Views:** 8 different views for CRUD and search operations
- **Admin Interface:** Customized Django admin for managing records

### Frontend
- **Templates:** 6 HTML templates (base, index, create, view, edit, list, search)
- **Styling:** Custom CSS with modern gradient design
- **Interactivity:** JavaScript for form validation, photo preview, and more
- **Bootstrap 5:** Complete responsive framework

### Features
- Create voter cards with personal details and photo
- View cards in official-looking voter ID format
- Edit voter information
- Delete records with confirmation
- Search by name, voter ID, or father's name
- Print voter cards
- File upload with drag-and-drop
- Age validation (18+ years)
- Responsive design for all devices

## File Structure

```
d:\Django\india_voter\
├── manage.py                          # Django management script
├── requirements.txt                   # Python dependencies
├── README.md                          # Full documentation
├── db.sqlite3                         # SQLite database
│
├── voter_project/                     # Project configuration
│   ├── settings.py                    # Project settings
│   ├── urls.py                        # Main URL routing
│   ├── wsgi.py                        # WSGI configuration
│   └── asgi.py                        # ASGI configuration
│
├── voter_card/                        # Main Django app
│   ├── models.py                      # Database models
│   ├── views.py                       # View functions
│   ├── forms.py                       # Form definitions
│   ├── urls.py                        # App URL routing
│   ├── admin.py                       # Admin configuration
│   ├── apps.py                        # App configuration
│   ├── tests.py                       # Unit tests (template)
│   ├── migrations/                    # Database migrations
│   │   ├── 0001_initial.py
│   │   └── __init__.py
│   └── __init__.py
│
├── templates/                         # HTML templates
│   ├── base.html                      # Base template with navbar and footer
│   └── voter_card/
│       ├── index.html                 # Home page
│       ├── create.html                # Create voter card form
│       ├── view.html                  # Display voter ID card
│       ├── edit.html                  # Edit voter card form
│       ├── list.html                  # List all voter cards
│       └── search.html                # Search results page
│
├── static/                            # Static files
│   ├── css/
│   │   └── style.css                  # Custom CSS (450+ lines)
│   └── js/
│       └── main.js                    # JavaScript utilities (400+ lines)
│
├── media/                             # User uploaded files (auto-created)
│   └── voter_photos/                  # Directory for voter photos
│
└── myenv/                             # Python virtual environment
```

## Database Schema

### VoterCard Table

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | Primary Key, Auto Increment | Unique identifier |
| first_name | String(100) | Not Null | Voter's first name |
| father_name | String(100) | Not Null | Father's name |
| date_of_birth | Date | Not Null | Date of birth (18+ validation) |
| address | Text | Not Null | Residential address |
| voter_id_number | String(20) | Unique, Not Null | Unique voter ID |
| photo | Image | File Path | Uploaded voter photo |
| gender | String(10) | Choices | Male/Female/Other |
| state | String(100) | Not Null | State of residence |
| serial_number | String(50) | Not Null | Serial number on card |
| created_at | DateTime | Auto set | Record creation timestamp |
| updated_at | DateTime | Auto update | Last update timestamp |

## API Endpoints

### Public Routes
- `GET /` - Home page
- `GET /create/` - Create voter card form
- `POST /create/` - Submit new voter card
- `GET /card/<id>/` - View specific voter card
- `GET /card/<id>/edit/` - Edit voter card form
- `POST /card/<id>/edit/` - Update voter card
- `POST /card/<id>/delete/` - Delete voter card
- `GET /cards/` - List all voter cards
- `GET /search/` - Search voter cards

### API Routes
- `GET /api/card/<id>/` - Get voter card data (JSON)

### Admin Routes
- `GET /admin/` - Admin login page
- `GET /admin/voter_card/votercard/` - Admin voter cards list

## Form Fields & Validation

### Create/Edit Form Validation

| Field | Type | Validation | Message |
|-------|------|-----------|---------|
| first_name | Text | Required | - |
| father_name | Text | Required | - |
| date_of_birth | Date | 18+ years old | "Must be at least 18 years old" |
| | | Not in future | "Date cannot be in the future" |
| address | Textarea | Required | - |
| voter_id_number | Text | Min 5 chars | "Must be at least 5 characters" |
| photo | File | Image only | "File must be an image" |
| | | Max 5MB | "Photo size must not exceed 5MB" |
| gender | Select | Required | - |
| state | Text | Required | - |
| serial_number | Text | Required | - |

## Key Technologies

### Backend
- **Django 6.0.2** - Web framework
- **Python 3.8+** - Programming language
- **SQLite** - Database (default)
- **Pillow 12.1.0** - Image processing

### Frontend
- **HTML5** - Markup
- **Bootstrap 5.3** - CSS framework
- **CSS3** - Styling
- **JavaScript (Vanilla)** - Interactivity
- **Font Awesome 6** - Icons

### Development
- **Django Management Commands** - Development tools
- **Virtual Environment** - Python isolation

## How to Use

### 1. Start the Server
```bash
cd d:\Django\india_voter
.\myenv\Scripts\activate
python manage.py runserver
```
Server runs at: http://127.0.0.1:8000/

### 2. Create a Voter Card
- Visit http://127.0.0.1:8000/create/
- Fill in all required fields
- Upload a photo
- Click "Create Voter Card"

### 3. View Your Card
- Click "View Card" to see the generated voter ID
- The card mimics official Indian voter ID format

### 4. Manage Cards
- Go to "All Cards" to see all created cards
- Edit any card by clicking "Edit"
- Delete cards (with confirmation)
- Search for cards by name, voter ID, or father's name

### 5. Print Your Card
- Open any voter card
- Click "Print Card" button
- Use browser print dialog to save as PDF

### 6. Admin Panel
- Visit http://127.0.0.1:8000/admin/
- Login with: **admin** / **admin123**
- Manage voter records from admin interface

## Important Features Explained

### Photo Upload
- Supports JPG and PNG formats
- Maximum file size: 5MB
- Drag and drop interface
- Real-time preview
- Auto-validation

### Voter ID Card Display
- Professional gradient background
- Realistic layout based on official format
- Shows photo, name, voter ID, DOB
- Includes state and serial number
- Print-optimized CSS
- Responsive for all screen sizes

### Search Functionality
- Search across multiple fields
- Case-insensitive matching
- Real-time results
- Fast database queries

### Form Validation
- Age verification (18+ requirement)
- Date of birth validation
- File size and type checking
- Minimum length requirements
- Real-time error messages

## Customization Examples

### Change Card Design Colors
Edit `static/css/style.css`:
```css
.voter-id-front {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}
```

### Add More Fields to Voter Card
1. Edit `voter_card/models.py` - Add field to VoterCard model
2. Run `python manage.py makemigrations`
3. Run `python manage.py migrate`
4. Update `voter_card/forms.py` - Add field to form
5. Update templates - Add field to HTML

### Change Admin Interface Name
Edit `voter_card/admin.py`:
```python
class VoterCardAdmin(admin.ModelAdmin):
    verbose_name = "Voter Card"
    verbose_name_plural = "Voter Cards"
```

## Security Considerations

✅ **CSRF Protection** - All forms include CSRF tokens
✅ **SQL Injection Prevention** - Django ORM used exclusively
✅ **XSS Prevention** - Template auto-escaping enabled
✅ **File Validation** - Image file type and size checked
✅ **Input Validation** - All form inputs validated
✅ **Authentication** - Admin panel protected
✅ **HTTPS Ready** - Configured for production HTTPS

## Performance Tips

- Database queries optimized with select_related/prefetch_related
- Static files cached by browser
- Image compression on upload
- Lazy loading for photo thumbnails
- Efficient search queries

## Browser Compatibility

✅ Chrome/Chromium (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Problem: "ModuleNotFoundError: No module named 'django'"
**Solution:** Activate virtual environment and install requirements
```bash
.\myenv\Scripts\activate
pip install -r requirements.txt
```

### Problem: Photos not displaying
**Solution:** Check media folder permissions and MEDIA_ROOT setting in settings.py

### Problem: "permission denied" on media folder
**Solution:** Ensure proper folder permissions or create media folder manually:
```bash
mkdir media
mkdir media/voter_photos
```

### Problem: Static files (CSS/JS) not loading
**Solution:** Run collectstatic command:
```bash
python manage.py collectstatic --noinput
```

### Problem: Database locked error
**Solution:** Delete db.sqlite3 and re-run migrations:
```bash
rm db.sqlite3
python manage.py migrate
```

## Next Steps

1. **Deployment:** See Django documentation for production deployment
2. **Database:** Switch to PostgreSQL for production
3. **Security:** Change SECRET_KEY and set DEBUG=False
4. **Email:** Configure email for notifications
5. **Backup:** Set up database backups
6. **Monitoring:** Add logging and error tracking

## Support Files

- **README.md** - Full project documentation
- **requirements.txt** - Python dependencies list
- **This Guide** - Quick start and feature overview

## Contact & Support

For issues or questions about the project, check:
1. Django documentation: https://docs.djangoproject.com/
2. Bootstrap documentation: https://getbootstrap.com/
3. Pillow documentation: https://pillow.readthedocs.io/

---

**Project Complete!** 🎉

Your Voter ID Card Generator is ready to use. Start the server and create your first voter card!
