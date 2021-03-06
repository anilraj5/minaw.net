# Generated by Django 2.0.3 on 2018-03-18 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='numéro')),
                ('name', models.CharField(max_length=64, verbose_name='nom')),
                ('slug', models.SlugField(verbose_name='identifiant')),
            ],
            options={
                'verbose_name': 'catégorie',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Work',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('added', models.DateTimeField(auto_now_add=True, verbose_name='ajouté')),
                ('modif', models.DateTimeField(auto_now=True, verbose_name='modifié')),
                ('slug', models.SlugField(verbose_name='identifiant')),
                ('title', models.CharField(max_length=64, verbose_name='titre')),
                ('subtitle', models.CharField(blank=True, max_length=128, verbose_name='sous-titre')),
                ('cover', models.ImageField(upload_to='', verbose_name='couverture')),
                ('content', models.TextField(blank=True, verbose_name='contenu')),
                ('bck', models.BooleanField(default=False, verbose_name='arrière-plan')),
                ('black_txt', models.BooleanField(default=False, verbose_name='texte noir')),
                ('categ', models.ManyToManyField(blank=True, to='portfolio.Category', verbose_name='catégorie')),
            ],
            options={
                'verbose_name': 'oeuvre',
                'ordering': ['-added'],
            },
        ),
    ]
