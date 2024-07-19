# Caboo_backend/__init__.py

from __future__ import absolute_import, unicode_literals

# Import Celery app
import User_app.tasks
from .celery import app as celery_app

__all__ = ("celery_app",)
