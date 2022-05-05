# Generated by Django 3.2.10 on 2022-05-05 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shiftan', '0005_rename_store_fk_group_store_fk'),
    ]

    operations = [
        migrations.AddField(
            model_name='shift_range',
            name='deadline_date',
            field=models.DateField(default='2022-05-01', verbose_name='締切日'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='shift_range',
            name='start_date',
            field=models.DateField(verbose_name='開始日'),
        ),
        migrations.AlterField(
            model_name='shift_range',
            name='stop_date',
            field=models.DateField(verbose_name='終了日'),
        ),
    ]
