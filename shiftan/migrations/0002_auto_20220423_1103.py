# Generated by Django 3.1 on 2022-04-23 02:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shiftan', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='group_FK',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='shiftan.group'),
        ),
        migrations.AlterField(
            model_name='user',
            name='store_FK',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='shiftan.store'),
        ),
    ]
