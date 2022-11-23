# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '_300nmtp7zbq-!k)l+r_ag(ntrs^=c_%qx@eo43ugfl4$qsqfn'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['localhost', '127.0.0.1','[::1]' , 'shiftan.nineteen.page']

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django-db',
        'USER': 'django',
        'PASSWORD': 'django',
        'HOST': 'db',
        'PORT': '3306'
    }
}
EMAIL_HOST_PASSWORD = 'konzkjbvzpccrupz'
DEFAULT_AUTO_FIELD='django.db.models.AutoField'