from lib2to3.pytree import Base
from django.contrib.auth.tokens import default_token_generator
from djoser import utils
from templated_mail.mail import BaseEmailMessage
from django.conf import settings

class EmailManager(BaseEmailMessage):
    def send(self, to, *args, **kwags):
        self.render()
        self.to = to
        self.cc = kwags.pop('cc', [])
        self.bcc = kwags.pop('bcc', [])
        self.reply_to = kwags.pop('reply_to', [])
        self.from_email = kwags.pop(
            'from_email',
            'しふたん<' + settings.DEFAULT_FROM_EMAIL + '>'
            )
        super(BaseEmailMessage, self).send(*args, **kwags)

class ActivationEmail(EmailManager):
    template_name = 'accounts/activation.html'
    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.last_name
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER["ACTIVATION_URL"].format(**context)
        return context

class ConfirmationEmail(EmailManager):
    template_name = 'accounts/confirmation.html'
    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.last_name
        return context

class PasswordResetEmail(EmailManager):
    template_name = 'accounts/password_reset.html'
    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.last_name
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER["PASSWORD_RESET_CONFIRM_URL"].format(**context)
        return context

class PasswordChangedConfirmationEmail(EmailManager):
    template_name = 'accounts/password_changed_confirmation.html'
    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.last_name
        return context

class UsernameResetEmail(EmailManager):
    template_name = 'accounts/username_reset.html'
    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.last_name
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.DJOSER["USERNAME_RESET_CONFIRM_URL"].format(**context)
        return context

class UsernameChangedConfirmationEmail(EmailManager):
    template_name = 'accounts/username_changed_confirmation.html'
    def get_context_data(self):
        context = super().get_context_data()
        user = context.get("user")
        context["name"] = user.last_name
        return context