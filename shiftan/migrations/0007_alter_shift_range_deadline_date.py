# Generated by Django 3.2.10 on 2022-08-14 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shiftan', '0006_auto_20220505_2011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shift_range',
            name='deadline_date',
            field=models.DateField(blank=True, null=True, verbose_name='締切日'),
        ),
    ]
