import pymysql
pymysql.install_as_MySQLdb()

# Monkey patch to bypass MariaDB version check for older XAMPP versions
import django.db.backends.base.base as db_base
db_base.BaseDatabaseWrapper.check_database_version_supported = lambda self: True