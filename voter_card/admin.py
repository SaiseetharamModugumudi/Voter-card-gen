from django.contrib import admin
from .models import VoterCard

@admin.register(VoterCard)
class VoterCardAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'voter_id_number', 'date_of_birth', 'created_at')
    list_filter = ('created_at', 'gender', 'state')
    search_fields = ('first_name', 'father_name', 'voter_id_number')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Personal Information', {
            'fields': ('first_name', 'father_name', 'date_of_birth', 'gender')
        }),
        ('Address & Contact', {
            'fields': ('address', 'state')
        }),
        ('Voter Information', {
            'fields': ('voter_id_number', 'serial_number', 'photo')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
