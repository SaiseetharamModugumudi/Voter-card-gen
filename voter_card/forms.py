from django import forms
from .models import VoterCard
from django.core.exceptions import ValidationError
from datetime import date

class VoterCardForm(forms.ModelForm):
    """Form for voter card registration"""
    
    date_of_birth = forms.DateField(
        widget=forms.DateInput(attrs={
            'type': 'date',
            'class': 'form-control',
            'required': 'true'
        }),
        help_text="Must be 18 years or older"
    )
    
    photo = forms.ImageField(
        widget=forms.FileInput(attrs={
            'class': 'form-control',
            'accept': 'image/*',
            'required': 'true'
        }),
        help_text="Upload a clear photo (JPG, PNG). Max size: 5MB"
    )
    
    class Meta:
        model = VoterCard
        fields = ['first_name', 'father_name', 'date_of_birth', 'address', 
                  'voter_id_number', 'photo', 'gender', 'state', 'serial_number']
        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your first name',
                'required': 'true'
            }),
            'father_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': "Enter your father's name",
                'required': 'true'
            }),
            'address': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your address',
                'rows': 3,
                'required': 'true'
            }),
            'voter_id_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., ABC1234567890',
                'required': 'true'
            }),
            'gender': forms.Select(attrs={
                'class': 'form-control',
                'required': 'true'
            }),
            'state': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your state',
                'required': 'true'
            }),
            'serial_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter serial number',
                'required': 'true'
            }),
        }
    
    def clean_date_of_birth(self):
        """Validate that user is 18 years old"""
        dob = self.cleaned_data.get('date_of_birth')
        if dob:
            today = date.today()
            age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
            if age < 18:
                raise ValidationError("You must be at least 18 years old to register as a voter.")
            if dob > today:
                raise ValidationError("Date of birth cannot be in the future.")
        return dob
    
    def clean_voter_id_number(self):
        """Validate voter ID number format"""
        voter_id = self.cleaned_data.get('voter_id_number')
        if voter_id:
            if len(voter_id) < 5:
                raise ValidationError("Voter ID number must be at least 5 characters long.")
        return voter_id
    
    def clean_photo(self):
        """Validate photo file size and format"""
        photo = self.cleaned_data.get('photo')
        if photo:
            if photo.size > 5 * 1024 * 1024:  # 5MB
                raise ValidationError("Photo size must not exceed 5MB.")
            if not photo.content_type.startswith('image/'):
                raise ValidationError("File must be an image.")
        return photo
