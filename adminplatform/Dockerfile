# ใช้ Official PHP Image ที่มาพร้อม Apache
FROM php:8.1-apache

# คัดลอกไฟล์ทั้งหมดในโปรเจกต์ไปยังเซิร์ฟเวอร์ใน Docker
COPY . /var/www/html/

# เปิดใช้งาน mod_rewrite ของ Apache (ถ้าจำเป็น)
RUN a2enmod rewrite

# ติดตั้งส่วนเสริม PHP (ถ้าคุณใช้ MySQL ให้เพิ่ม mysqli)
RUN docker-php-ext-install mysqli